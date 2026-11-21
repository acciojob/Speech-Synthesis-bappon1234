
const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');


// Populate voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    const previousVoice = voicesDropdown.value;

    voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;

        voicesDropdown.appendChild(option);
    });

    if (voices.some(voice => voice.name === previousVoice)) {
        voicesDropdown.value = previousVoice;
    }
}

populateVoices();

window.speechSynthesis.onvoiceschanged = populateVoices;


// Set speech settings
function setSpeech() {
    msg.text = document.querySelector('[name="text"]').value;
    msg.rate = Number(document.querySelector('[name="rate"]').value);
    msg.pitch = Number(document.querySelector('[name="pitch"]').value);

    const selectedVoice = voices.find(
        voice => voice.name === voicesDropdown.value
    );

    if (selectedVoice) {
        msg.voice = selectedVoice;
    }
}


// Speak
function toggle() {
    setSpeech();

    if (!msg.text.trim()) return;

    if (voices.length === 0) {
        alert("No voices available");
        return;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}


// Stop
function stop() {
    window.speechSynthesis.cancel();
}


// Button events
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', stop);


// Input events
options.forEach(option => {
    option.addEventListener('input', setSpeech);
});


// Voice change
voicesDropdown.addEventListener('change', () => {
    const wasSpeaking = window.speechSynthesis.speaking;

    setSpeech();

    if (wasSpeaking) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
    }
});
