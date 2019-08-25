let nameEl = document.getElementById('name').value;
let storyEl = document.getElementById('story').value;
let anonEl = document.getElementById('anonymous').value;
let publishedEl = document.getElementById('published').value;
let notesEl = document.getElementById('notes').value;


function newName(val) {
	let newValue = val;
	nameEl.value = newValue;
	console.log(nameEl);
}
function newNotes(val) {
	let newValue = val;
	notesEl.value = newValue;
	console.log(notesEl);
}
function newStory(val) {
	let newValue = val;
	storyEl.value = newValue;
	console.log(storyEl);
}
function newAnonymous(check) {
	let newValue = check;
	anonEl.value = newValue;
	console.log(anonEl);	
}

function newPublished(val) {
	let newValue = val;
	publishedEl.value = newValue;
	console.log(publishedEl);
}

function getQueryVariable(variable) {
	var urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(variable)
}

var storyid = getQueryVariable('id');

var storyidInput = document.getElementById('storyid');
storyidInput.value = storyid;

// IMAGE CHange SECTION
let firstImageButton = document.getElementById('changeImage');
let imageDecision = document.getElementById('imageDecision');
let uploadButton = document.getElementById('upload');
let changeButton = document.getElementById('change');
let uploadNewImageSection = document.getElementById('uploadNewImage');
let changeToDefaultSection = document.getElementById('changeToDefault');
document.addEventListener("DOMContentLoaded", (event) => {
	document.getElementById('changeImage').onclick = (() => {
		firstImageButton.style.visibility = 'hidden';
		firstImageButton.style.height = '0px';
		imageDecision.style.visibility = 'visible';
		imageDecision.style.height = 'auto';
		uploadButton.style.visibility = 'visible';
		uploadButton.style.height = 'auto';
		changeButton.style.visibility = 'visible';
		changeButton.style.height = 'auto';
		uploadButton.onclick = (() => {
		    uploadNewImageSection.style.visibility = 'visible';
			uploadNewImageSection.style.height = 'auto';
		    changeToDefaultSection.style.visibility = 'hidden';
		    changeToDefaultSection.style.height = '0px';

		});
	    // Button Default
	    changeButton.onclick = (() => {
	    	uploadNewImageSection.style.display = 'hidden';
	    	uploadNewImageSection.style.height = '0px';
		    changeToDefaultSection.style.visibility = 'visible';
		    changeToDefaultSection.style.height = 'auto';
	    });
	});
});