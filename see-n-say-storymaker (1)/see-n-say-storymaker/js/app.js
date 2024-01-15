// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
var synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
var textToSpeak = 'This is the text string that you will generate with your script';
var speakButton = document.getElementById('speakButton');
var storyOutput = ''; // Variable to store the generated story
var storyButton = document.getElementById('storyButton');
var resetStoryButton = document.getElementById('resetStoryButton');

// Arrays of words
var nouns = ["the turkey", "mom", "dad", "the dog", "my teacher", "the elephant", "the cat", "goat", "monkey", "fish","cow","frog","bug","worm"];
var verbs = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
var adjectives = ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"];
var places = ["on the moon","on the chair","in my spagheti","in my soup","on the grass","in my shoes"]

/* Functions
-------------------------------------------------- */
function speakNow(string) {
	synth.cancel();
	// Create a new speech object, attaching the string of text to speak
	var utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text
	synth.speak(utterThis);
}

// Function to generate a random word from the specified category and update the textToSpeak variable
function generateRandomPhrase(category) {
    let randomWord = '';
    switch (category) {
        case 'nouns':
            randomWord = nouns[Math.floor(Math.random() * nouns.length)];
            break;
        case 'verbs':
            randomWord = verbs[Math.floor(Math.random() * verbs.length)];
            break;
		case 'adjectives':
            randomWord = adjectives[Math.floor(Math.random() * adjectives.length)];
            break;
        case 'places':
            randomWord = places[Math.floor(Math.random() * places.length)];
            break;
    }

    textToSpeak += randomWord + ' ';
}

function generateRandomStory() {
    textToSpeak = ''; // Reset the existing text
    storyOutput = ''; // Reset the story
    generateRandomPhrase('nouns');
    generateRandomPhrase('verbs');
    generateRandomPhrase('adjectives');
    generateRandomPhrase('places');
    generateRandomPhrase('nouns');
    
    // Update both audio and text outputs
    updateOutput();
    updateStoryOutput();
}


/* Event Listeners
-------------------------------------------------- */
// Onclick handler for the button that speaks the text contained in the above var textToSpeak
speakButton.onclick = function() {
	speakNow(textToSpeak);
}

// Event listeners for the random phrase buttons
document.getElementById('nounButton').onclick = function () {
    generateRandomPhrase('nouns');
    updateOutput();
};

document.getElementById('verbButton').onclick = function () {
    generateRandomPhrase('verbs');
    updateOutput();
};

document.getElementById('adjectiveButton').onclick = function () {
    generateRandomPhrase('adjectives');
    updateOutput();
};

document.getElementById('placeButton').onclick = function () {
    generateRandomPhrase('places');
    updateOutput();
};

document.getElementById('resetButton').onclick = function () {
    textToSpeak = '';
    updateOutput();
};

storyButton.onclick = function () {
    generateRandomStory();
};

resetStoryButton.onclick = function () {
    storyOutput = '';
    updateStoryOutput();
    document.getElementById('storyOutput').innerText = ''; // Clear the content in the HTML
};

/* Helper function to update the displayed output */
function updateOutput() {
    document.getElementById('output').innerText = textToSpeak;
	speakNow(textToSpeak); // Automatically speak the generated text when updated
}

/* Helper function to update the displayed story */
function updateStoryOutput() {
    storyOutput = `Once upon a time, there was a ${textToSpeak}.`;
    document.getElementById('storyOutput').innerText = storyOutput;
}