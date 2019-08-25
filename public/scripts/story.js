window.addEventListener("load", function splitParagraphs(event) {
  var longPara = document.getElementById('storyPara');
  var words = longPara.innerHTML.trim().split(' ');
  var paragraphs = [[]];
  var currentLength = 0;

  words.forEach(text => {
    paragraphs[paragraphs.length - 1 ].push(text);
    currentLength ++;
    if (currentLength >= 200 && text[text.length - 1] === '.') {
      paragraphs.push([]);
      currentLength = 0;
    }
  });

  paragraphs.forEach(text => {
    let contentContainer = document.getElementById('contentContainer');
    var paragraph = document.createElement("p");
    var textNode = document.createTextNode(text.join(' '));
    paragraph.appendChild(textNode);
    paragraph.className += 'newParagraph';
    contentContainer.appendChild(paragraph);
  });

  contentContainer.removeChild(longPara);
});
