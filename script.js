
function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

    if (voices.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'No voices available';
        voicesDropdown.appendChild(option);
        return;
    }

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voicesDropdown.appendChild(option);
    });
}


// Load voices
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


// Speak function
function toggle() {
    const text = document.querySelector('[name="text"]').value;

    if (!text.trim()) {
        alert("Please enter some text");
        return;
    }

    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        alert("No voices available");
        return;
    }

    setSpeech();

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}


// Stop function
function stop() {
    window.speechSynthesis.cancel();
}


// Button events
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', stop);


// Rate and Pitch events
options.forEach(option => {
    option.addEventListener('input', setSpeech);
    option.addEventListener('change', setSpeech);
});


// Voice change event
voicesDropdown.addEventListener('change', () => {
    const wasSpeaking = window.speechSynthesis.speaking ||
                        window.speechSynthesis.pending;

    setSpeech();

    if (wasSpeaking) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
    }
});
