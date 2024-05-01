import React, { useState, useRef, useEffect, memo } from 'react';
import Quill from 'quill';
import './PostContent.css'

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

  const PostContent = memo(function PostContent({content}) {
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
            highlights.forEach(highlight => {
                const { start, end } = highlight;
                const length = end - start;
                quill.formatText(start, length, { background: '#B7CFFF' });
            });
        }
    }

    useEffect(() => {
        function fetchHighlights() {
            return [{ start: 10, end: 50, text: `ing man I often wonder,\nAs a hopeful man`}];
        }

        setHighlights(fetchHighlights())
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
                        const clickOnHighlight = highlightsRef.current.some((item) => {
                            return item.start <= range.index && range.index < item.end
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

    const handleHighlightIcon = () =>{
        const selectedText = quill.getText(rangeSelected.index, rangeSelected.length)
        const start = rangeSelected.index
        const end = rangeSelected.index + rangeSelected.length;

        const newSelection = {
            text: selectedText,
            start: start,
            end: end,
        }
        let sortedSelections = [...highlights, newSelection].sort((a, b) => a.start - b.start);
        let mergedSelections = [];
        let last = sortedSelections[0];

        for (let i = 1; i < sortedSelections.length; i++) {
            const current = sortedSelections[i];
            if (current.start <= last.end) { 
                const newStart = Math.min(current.start, last.start);
                const newEnd = Math.max(current.end, last.end);

                let mergedText = last.text;
                if (last.end >= current.start) {
                    mergedText += current.text.substring(last.end - current.start );
                } else {
                    mergedText += current.text;
                }

                last = { start: newStart, end: newEnd, text: mergedText };
            } else {
                mergedSelections.push(last);
                last = current;
            }
        }
        mergedSelections.push(last);
        console.log(mergedSelections)
        highlightsRef.current = mergedSelections;
        quill.setSelection(null);
        setShowPopover(false);
        setHighlights([...mergedSelections]);
    }

    const handleRemoveIcon = () => {
        const newSelections = highlights.filter((item) => {
            return !(item.start <= rangeSelected.index && rangeSelected.index < item.end)
        })
        console.log(newSelections)
        highlightsRef.current = newSelections;
        quill.setSelection(null);
        setShowPopover(false);
        setHighlights([...newSelections]);
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
