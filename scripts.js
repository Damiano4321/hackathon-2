// GLOBAL VARIABLES
const playBut = document.getElementById('play_btn');
const pulseCircle = document.getElementById('pulse_circle');

const kickDrum = new Tone.MembraneSynth().toDestination();

const clapNoise = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
}).toDestination();

const arpSynth = new Tone.Synth().toDestination();

const kickLoop = new Tone.Loop((time) => {
    kickDrum.triggerAttackRelease("C2", "8n", time);
}, "4n");

const clapLoop = new Tone.Loop((time) => {
    clapNoise.triggerAttackRelease("4n", time);
}, "2n");

const arp1 = ["C4", "D4", "F4"];
const arp2 = ["C4", "D4", "G4"];
const arp3 = ["C4", "D4", "B4", "C5"];
const arp4 = ["C4", "D4", "B4"];

const arpFull = [
    ...Array(2).fill(arp1).flat(), ...arp2,
    ...Array(4).fill(arp1).flat(), ...arp2,
    ...Array(5).fill(arp1).flat(), ...arp2,
    ...Array(2).fill(arp1).flat(), ...arp2,
    ...arp3, ...arp2, ...arp4, ...arp1
];

// FUNCTIONS
function startPulse() {
    playBut.style.display = 'none';
    pulseCircle.style.display = 'block';
}

function initDrumLoop() {
    kickLoop.start(0); // Start immediately
    clapLoop.start("4n");
    clapLoop.stop(60)
}

function initArpeggio() {
    const arpeggi = new Tone.Pattern((time, note) => {
        arpSynth.triggerAttackRelease(note, "32n", time);
    }, arpFull, "up");
    arpeggi.interval = "16n";
    arpeggi.start(60);
}

function pjanoo() {
    Tone.Transport.start();
    initDrumLoop()
    initArpeggio()
}

// HTML CONTROL
playBut.addEventListener("click", startPulse);
playBut.addEventListener("click", pjanoo);