import React, { useState, useRef, useEffect, memo } from 'react';
import {useSelector} from 'react-redux';
import Quill from 'quill';
import './PostContent.css'
import { postService } from '../services/PostService';
import {formartToSQLDatetime} from '../util/formatDate';

const Popover = ({ position, isHighlighted, handleHighlightIcon, handleRemoveIcon }) => {
    const content = (!isHighlighted) ? (
        <button className="btn text-white bg-black" onClick={handleHighlightIcon}>
             <i className="fa-solid fa-highlighter"></i> Highlight the text
        </button>
    ) :(
        <button className="btn text-white bg-black" onClick={handleRemoveIcon}>
             <i className="fa-solid fa-trash"></i> Remove the highlight
        </button>
    )
    return (
      <div className="popover p-0" style={{ top: position.y, left: position.x }}>
          {content}
      </div>
    );
  };

const PostContent = memo(function PostContent({content, id_post}) {
    const {user_login} = useSelector(state => state.UserReducer)
    const [showPopover, setShowPopover] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({x: 0, y: 0});
    const [isHighlighted, setIsHighlighted] = useState(false);

    const [highlights, setHighlights] = useState([]);
    const highlightsRef = useRef([]);

    const [rangeSelected, setRangeSelected] = useState(null);
    const quillRef = useRef(null);
    const [quill, setQuill] = useState(null);

    function applyHighlights(highlights, quill) {
        const lengthOfDocument = quill.getLength();
        quill.removeFormat(0, lengthOfDocument);

        if ( quill != null){
            // console.log(highlights)
            highlights?.forEach(highlight => {
                const { start_index, end_index } = highlight;
                const length = end_index - start_index;
                quill.formatText(start_index, length, { background: '#B7CFFF' });
            });
        }
    }

    useEffect(() => {
        async function fetchHighlights() {
            try{
                const result = await postService.getHighlight(id_post, user_login.id_user);
                // console.log(result.data.content)
                highlightsRef.current = result.data.content
                setHighlights(result.data.content) ;
            } catch(e){
                console.log(e);
            }
            // return [{ start: 10, end: 50, text: `ing man I often wonder,\nAs a hopeful man`}];
        }

        fetchHighlights()
    }, [])

    useEffect(() => {
        if (quillRef.current) { // Ensure the ref is attached
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                readOnly: true,
                modules: {
                    toolbar: false
                }
            });

            quill.clipboard.dangerouslyPasteHTML(0, content);
            
            setQuill(quill)
            applyHighlights(highlights, quill);

            window.scrollTo(0, 100);

            function getPositionPopOver(range){
                const bounds = quill.getBounds(range.index, range.length);
                        
                const popoverWidth = 150;
                const popoverHeight = 25; 

                const editorContainer = quillRef.current;
                const editorRect = editorContainer.getBoundingClientRect();
                const editorScrollY = editorRect.top + window.scrollY;
                const editorScrollX = editorRect.left + window.scrollX;

                let popoverY = bounds.top + editorScrollY + bounds.height + 10 - popoverHeight * 3;
                const availableSpaceBelow = window.innerHeight + window.scrollY - popoverY;
                if (availableSpaceBelow < popoverHeight) {
                    popoverY = Math.max(
                        bounds.top + editorScrollY - popoverHeight - 10, 
                        0 
                    );
                }

                const popoverX = Math.min(
                    bounds.left + editorScrollX + (bounds.width / 2) - (popoverWidth / 2),
                    window.innerWidth + window.scrollX - popoverWidth - 10
                );

                setPopoverPosition({
                    x: popoverX,
                    y: popoverY
                });
            }

            quill.on('selection-change', (range) => {
                if (!range) {
                    setShowPopover(false);
                } else{
                    setRangeSelected(range);

                    if ( range.length === 0){
                        console.log(highlightsRef.current)
                        const clickOnHighlight = highlightsRef.current.some((item) => {
                            return item.start_index <= range.index && range.index < item.end_index
                        })

                        if (clickOnHighlight)
                            getPositionPopOver(range)
                        setIsHighlighted(clickOnHighlight);
                        setShowPopover(clickOnHighlight);
                    } else {
                        getPositionPopOver(range)
                        setIsHighlighted(false);
                        setShowPopover(true);
                    }
                }
            });
        }
        
    }, [content]);

    useEffect(() => {
        if (quill) {
            applyHighlights(highlights, quill);
        }
    }, [highlights, quill]);

    const handleHighlightIcon = async () =>{
        const selectedText = quill.getText(rangeSelected.index, rangeSelected.length)
        const start_index = rangeSelected.index
        const end_index = rangeSelected.index + rangeSelected.length;

        const newSelection = {
            content: selectedText,
            start_index: start_index,
            end_index: end_index,
            highlight_time: formartToSQLDatetime(new Date())
        }
        let sortedSelections = [...highlights, newSelection].sort((a, b) => a.start_index - b.start_index);
        let mergedSelections = [];
        let last = sortedSelections[0];

        for (let i = 1; i < sortedSelections.length; i++) {
            const current = sortedSelections[i];
            if (current.start_index <= last.end_index) { 
                const newStart = Math.min(current.start_index, last.start_index);
                const newEnd = Math.max(current.end_index, last.end_index);

                let mergedText = last.content;
                if (last.end_index >= current.start_index) {
                    mergedText += current.content.substring(last.end_index - current.start_index );
                } else {
                    mergedText += current.content;
                }

                last = { start_index: newStart, end_index: newEnd, content: mergedText, highlight_time: formartToSQLDatetime(new Date()) };
            } else {
                mergedSelections.push(last);
                last = current;
            }
        }
        mergedSelections.push(last);
        console.log(mergedSelections);

        highlightsRef.current = mergedSelections;
        quill.setSelection(null);
        setShowPopover(false);
        setHighlights([...mergedSelections]);

        try {
            const result = await postService.createHighlight({
                updatedHighlights: mergedSelections,
                id_post: id_post,
                id_user: user_login.id_user,
            })
        } catch (e){
            console.log(e)
        }
    }

    const handleRemoveIcon = async () => {
        let removeHighlight;
        const newSelections = highlights.filter((item) => {
            if (item.start_index <= rangeSelected.index && rangeSelected.index < item.end_index)
                removeHighlight = item
            else
                return true
            return false
        })
        console.log(newSelections)
        highlightsRef.current = newSelections;
        quill.setSelection(null);
        setShowPopover(false);
        setHighlights([...newSelections]);

        try {
            const result = await postService.deleteHighlight({
                ...removeHighlight,
                id_user: user_login.id_user,
                id_post: id_post,
            })
        } catch (e){
            console.log(e)
        }
    }

    return (
        <div>
            <div id="editor-container" ref={quillRef} />
            {showPopover && <Popover 
                isHighlighted={isHighlighted}
                position={popoverPosition}
                handleHighlightIcon={handleHighlightIcon}
                handleRemoveIcon={handleRemoveIcon} />}
        </div>
    );
})

export default PostContent;
