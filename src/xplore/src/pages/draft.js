// const draft = ({content}) => {
//     const [visible, setVisible] = useState(false);
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const [tooltipType, setTooltipType] = useState('highlight'); // 'highlight' or 'remove'
//     const [selectedTexts, setSelectedTexts] = useState([]);

//     const handleSelection = () => {
//         const selection = window.getSelection();
//         if (selection.rangeCount > 0 && !selection.isCollapsed && selection.toString().trim() !== '') {
//             const range = selection.getRangeAt(0);
//             const rect = range.getBoundingClientRect();

//             setPosition({
//                 x: rect.left + rect.width / 2,
//                 y: rect.top - 10
//             });
//             setTooltipType('highlight'); 
//             setVisible(true);
//         } else {
//             setVisible(false);
//         }
//     };

//     const handleClick = (event) => {
//         if (event.target.classList.contains('highlight')) {
//             const rect = event.target.getBoundingClientRect();
//             setPosition({
//                 x: rect.left + rect.width / 2,
//                 y: rect.top - 10
//             });
//             setTooltipType('remove');
//             setVisible(true);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mouseup', handleSelection);
//         document.addEventListener('click', handleClick);
//         return () => {
//             document.removeEventListener('mouseup', handleSelection);
//             document.removeEventListener('click', handleClick);
//         };
//     }, []);
    
//     const contentRef = useRef(null);

//     useEffect(() => {
//         if (!contentRef.current) return;

//         // Clear previous highlights and reset HTML
//         contentRef.current.innerHTML = content;

//         // Apply new highlights
//         selectedTexts.forEach(({ start, end, text }) => {
//             applyHighlight(contentRef.current, start, end);
//         });

//     }, [selectedTexts]);

// const applyHighlight = (container, start, end) => {
//         const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
//         let node;
//         let currentOffset = 0;

//         while (node = walker.nextNode()) {
//             const nodeStart = currentOffset;
//             const nodeEnd = currentOffset + node.textContent.length;

//             // Check if node contains or is within the range to be highlighted
//             if (nodeEnd < start) {
//                 currentOffset = nodeEnd;
//                 continue; // Skip nodes before the start of the range
//             }

//             if (nodeStart > end) break; // Stop if passed the end of the range

//             const highlightSpan = document.createElement('span');
//             highlightSpan.className = 'highlight';

//             // Calculate start and end points within the node
//             const relativeStart = Math.max(start - nodeStart, 0);
//             const relativeEnd = Math.min(end - nodeStart, node.textContent.length);

//             // Handle partial overlap with the node
//             if (relativeStart > 0) {
//                 const firstPart = node.splitText(relativeStart);
//                 if (relativeEnd < firstPart.textContent.length) {
//                     const highlightText = firstPart.splitText(relativeEnd);
//                     highlightSpan.appendChild(firstPart.cloneNode(true));
//                     firstPart.parentNode.replaceChild(highlightSpan, firstPart);
//                 } else {
//                     highlightSpan.appendChild(firstPart.cloneNode(true));
//                     firstPart.parentNode.replaceChild(highlightSpan, firstPart);
//                 }
//             } else {
//                 if (relativeEnd < node.textContent.length) {
//                     const highlightText = node.splitText(relativeEnd);
//                     highlightSpan.appendChild(node.cloneNode(true));
//                     node.parentNode.replaceChild(highlightSpan, node);
//                 } else {
//                     highlightSpan.appendChild(node.cloneNode(true));
//                     node.parentNode.replaceChild(highlightSpan, node);
//                 }
//             }

//             currentOffset = nodeEnd; // Update current offset
//         }
//     };

//     const handleHighlightAction = (newSelection) => {
//         let sortedSelections = [...selectedTexts, newSelection].sort((a, b) => a.start - b.start);
//         let mergedSelections = [];
//         let last = sortedSelections[0];

//         // console.log(newSelection)
//         for (let i = 1; i < sortedSelections.length; i++) {
//             const current = sortedSelections[i];
//             if (current.start <= last.end) { 
//                 const newStart = Math.min(current.start, last.start);
//                 const newEnd = Math.max(current.end, last.end);

//                 let mergedText = last.text;
//                 if (last.end >= current.start) {
//                     mergedText += current.text.substring(last.end - current.start );
//                 } else {
//                     mergedText += current.text;
//                 }

//                 last = { start: newStart, end: newEnd, text: mergedText };
//             } else {
//                 mergedSelections.push(last);
//                 last = current;
//             }
//         }
//         mergedSelections.push(last);
//         console.log(mergedSelections);
//         setSelectedTexts(mergedSelections);
//     }

//     const handleHighlightIconClick = () => {
//         const selection = window.getSelection();
//         if (tooltipType == "highlight" && selection.rangeCount > 0 && selection.toString().trim() !== '') {
//             const range = selection.getRangeAt(0);
//             const startOffset = calculateAbsoluteOffset(range.startContainer, range.startOffset, '.content-container');
//             const endOffset = calculateAbsoluteOffset(range.endContainer, range.endOffset, '.content-container');
//             const highlightedText = selection.toString();
    
//             console.log({
//                 text: highlightedText,
//                 startOffset,
//                 endOffset,
//             });

//             handleHighlightAction({text: highlightedText, start: startOffset, end: endOffset}, content);
    
//             // const span = document.createElement('span');
//             // span.classList.add('highlight');
//             // span.appendChild(range.extractContents());
//             // range.insertNode(span);
//             // selection.removeAllRanges();
//         }
//         setVisible(false);
//     };
    
//     function calculateAbsoluteOffset(node, offset, containerSelector) {
//         let totalOffset = 0;
//         let currentNode = node;
    
//         // Traverse up from the current node to the container, adding up offsets
//         while (currentNode && currentNode !== document.querySelector(containerSelector)) {
//             if (currentNode.previousSibling) {
//                 let sibling = currentNode.previousSibling;
//                 while (sibling) {
//                     if (sibling.nodeType === Node.TEXT_NODE) {
//                         totalOffset += sibling.textContent.length;
//                     } else {
//                         totalOffset += sibling.innerText.length;
//                     }
//                     sibling = sibling.previousSibling;
//                 }
//             }
//             currentNode = currentNode.parentNode;
//         }
    
//         totalOffset += offset;
    
//         return totalOffset;
//     }
    
//     const tooltipContent = tooltipType === 'highlight' ? (
//         <button className="btn text-white" onClick={handleHighlightIconClick}>
//             <i className="fa-solid fa-highlighter"></i> Highlight the text
//         </button>
//     ) : (
//         <button className="btn text-white" onClick={handleHighlightIconClick}>
//             <i className="fa-solid fa-trash"></i> Remove the highlight
//         </button>
//     );

//     return (
//         <Tippy
//             content={tooltipContent}
//             visible={visible}
//             interactive={true}
//             onClickOutside={() => setVisible(false)}
//             placement="top"
//             getReferenceClientRect={() => ({
//                 width: 0,
//                 height: 0,
//                 top: position.y,
//                 bottom: position.y,
//                 left: position.x,
//                 right: position.x
//             })}
//         >
//             <div ref={contentRef} style={{ padding: '20px' }} className="content-container"
//                 dangerouslySetInnerHTML={{ __html: content }}></div>
//         </Tippy>
//     );
// };

quillRef.current = new Quill('#editor-container', {
    theme: 'snow',
    readOnly: true,
    modules: {
        toolbar: false
    }
});

// Assume content is set here for demonstration; normally set via API or props
quillRef.current.root.innerHTML = content;

const highlights = fetchHighlights();
applyHighlights(highlights);