import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styles

import "../styles/commons.css";
import "./PostDetail.css";
import "./SearchResult.css"

import {postService} from '../services/PostService';


const PostContent = ({content}) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [tooltipType, setTooltipType] = useState('highlight'); // 'highlight' or 'remove'
    const [selectedTexts, setSelectedTexts] = useState([]);

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && !selection.isCollapsed && selection.toString().trim() !== '') {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            setPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 10
            });
            setTooltipType('highlight'); 
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const handleClick = (event) => {
        if (event.target.classList.contains('highlight')) {
            const rect = event.target.getBoundingClientRect();
            setPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 10
            });
            setTooltipType('remove');
            setVisible(true);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const handleHighlightAction = (newSelection, content) => {
        // let sortedSelections = [...selectedTexts, newSelection].sort((a, b) => a.start - b.start);
        // let mergedSelections = [];
        // let last = sortedSelections[0];

        console.log(newSelection)
        // for (let i = 1; i < sortedSelections.length; i++) {
        //     const current = sortedSelections[i];
        //     if (current.start <= last.end + 1) { 
        //         const end = Math.max(last.end, current.end)
        //         last = { ...last, 
        //             end: end, 
        //             text: content.substring(current.start, end)};
        //     } else {
        //         mergedSelections.push(last);
        //         last = current;
        //     }
        // }
        // mergedSelections.push(last);
        // console.log(mergedSelections);
        // setSelectedTexts(mergedSelections);
    }

    // const handleHighlightIconClick = () => {
    //     const selection = window.getSelection();
    //     if (tooltipType === 'highlight' && selection.rangeCount > 0 && selection.toString().trim() !== '') {
    //         const range = selection.getRangeAt(0);
    //         const selectedText = selection.toString();
    //         const startOffset = calculateAbsoluteOffset(range.startContainer, range.startOffset);
    //         const endOffset = calculateAbsoluteOffset(range.endContainer, range.endOffset);

    //         handleHighlightAction({text: selectedText, start: startOffset, end: endOffset});

    //         const span = document.createElement('span');
    //         span.classList.add('highlight');
    //         span.appendChild(range.extractContents());
    //         range.insertNode(span);
    //         selection.removeAllRanges();

    //     } else if (tooltipType === 'remove') {
    //         const element = selection.anchorNode.parentNode;
    //         setSelectedTexts(selectedTexts.filter(t => t.start !== element.dataset.start)); // Assuming start is unique enough for identification
    //         const parent = element.parentNode;
    //         while (element.firstChild) {
    //             parent.insertBefore(element.firstChild, element);
    //         }
    //         parent.removeChild(element);
    //         selection.removeAllRanges();
    //     }
    //     setVisible(false);
    // };

    const handleHighlightIconClick = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && selection.toString().trim() !== '') {
            const range = selection.getRangeAt(0);
            const startOffset = calculateAbsoluteOffset(range.startContainer, range.startOffset, '.content-container');
            const endOffset = calculateAbsoluteOffset(range.endContainer, range.endOffset, '.content-container');
            const highlightedText = selection.toString();
    
            // Call a function to save this data to your database
            console.log({
                // contentId: currentContentId, // You need to have this from your content management context
                // userId: currentUser.id, // Assuming you have user context
                startOffset,
                endOffset,
                text: highlightedText,
                // createdAt: new Date().toISOString() // Handle date formatting as needed
            });
    
            // Visual highlighting
            const span = document.createElement('span');
            span.classList.add('highlight');
            span.appendChild(range.extractContents());
            range.insertNode(span);
            selection.removeAllRanges();
        }
        setVisible(false);
    };
    
    function calculateAbsoluteOffset(node, offset, containerSelector) {
        let totalOffset = 0;
        let currentNode = node;
    
        // Traverse up from the current node to the container, adding up offsets
        while (currentNode && currentNode !== document.querySelector(containerSelector)) {
            if (currentNode.previousSibling) {
                let sibling = currentNode.previousSibling;
                // Add the entire length of all preceding siblings to the total offset
                while (sibling) {
                    if (sibling.nodeType === Node.TEXT_NODE) {
                        totalOffset += sibling.textContent.length;
                    } else {
                        totalOffset += sibling.innerText.length;
                    }
                    sibling = sibling.previousSibling;
                }
            }
            currentNode = currentNode.parentNode;
        }
    
        // Add the offset within the final text node
        totalOffset += offset;
    
        return totalOffset;
    }
    

    const tooltipContent = tooltipType === 'highlight' ? (
        <button className="btn text-white" onClick={handleHighlightIconClick}>
            <i className="fa-solid fa-highlighter"></i> Highlight the text
        </button>
    ) : (
        <button className="btn text-white" onClick={handleHighlightIconClick}>
            <i className="fa-solid fa-times"></i> Remove the highlight
        </button>
    );

    return (
        <Tippy
            content={tooltipContent}
            visible={visible}
            interactive={true}
            onClickOutside={() => setVisible(false)}
            placement="top"
            getReferenceClientRect={() => ({
                width: 0,
                height: 0,
                top: position.y,
                bottom: position.y,
                left: position.x,
                right: position.x
            })}
        >
            <div style={{ padding: '20px' }} className="content-container"
                dangerouslySetInnerHTML={{ __html: content }}></div>
        </Tippy>
    );
};

export default PostContent;