export const formatCapitalCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, function(letter) {
        return letter.toUpperCase();
    });
}

export const sanitizeContent = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Convert all heading tags to p tags
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6','a'].forEach((tag) => {
        const headings = doc.querySelectorAll(tag);
        headings.forEach((heading) => {
          const p = doc.createElement('p');
          p.innerHTML = heading.textContent;
          heading.parentNode.replaceChild(p, heading);
        });
    });

    let mergedContent = '';
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach((p) => {
      mergedContent += p.textContent + ' ';
    });

    doc.body.innerHTML = '';

    // Create a new <p> tag with merged content
    const newP = doc.createElement('p');
    newP.innerHTML = mergedContent.trim();
  
    // Append the new <p> tag to the body
    doc.body.appendChild(newP);

    return doc.body.innerHTML;
  };