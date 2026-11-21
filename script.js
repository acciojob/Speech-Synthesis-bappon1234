// Your script here.

function populateVoices() {
    voices = speechSynthesis.getVoices();

    voicesDropdown.innerHTML = "";

    if (voices.length === 0) {
        let option = document.createElement("option");
        option.textContent = "No voices available";
        voicesDropdown.appendChild(option);
        return;
    }

    voices.forEach(function(voice) {
        let option = document.createElement("option");

        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;

        voicesDropdown.appendChild(option);
    });
}

// Load available voices
populateVoices();

speechSynthesis.onvoiceschanged = populateVoices;


// Set speech settings
function setSpeech() {
    msg.text = document.querySelector('[name="text"]').value;
    msg.rate = document.querySelector('[name="rate"]').value;
    msg.pitch = document.querySelector('[name="pitch"]').value;

    let selectedVoice = voices.find(function(voice) {
        return voice.name === voicesDropdown.value;
    });

    if (selectedVoice) {
        msg.voice = selectedVoice;
    }
}


// Speak function
function toggle() {
    if (!msg.text.trim()) {
        return;
    }

    setSpeech();

    if (voices.length === 0) {
        alert("No voices available");
        return;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
}


// Stop function
function stop() {
    speechSynthesis.cancel();
}


// Event listeners
speakButton.addEventListener("click", toggle);

stopButton.addEventListener("click", stop);


// Update rate and pitch dynamically
options.forEach(function(option) {
    option.addEventListener("change", setSpeech);
});


// Restart speech when voice changes
voicesDropdown.addEventListener("change", function() {
    if (speechSynthesis.speaking) {
        toggle();
    } else {
        setSpeech();
    }
});
