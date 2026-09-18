/**
 * Web Audio API Synthesized Club Ambient Beat Player
 * Generates an elegant deep-house / melodic groove loop completely in-browser!
 */
class DJAudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.audioCtx = null;
    this.timerId = null;
    this.step = 0;
    this.tempo = 122; // Classic Deep/Tech House BPM
    
    this.playBtn = document.getElementById('play-demo-btn');
    this.playBtnIcon = document.getElementById('play-btn-icon');
    this.playBtnText = document.getElementById('play-btn-text');
    this.vinylDisc = document.getElementById('hero-vinyl-disc');
    this.equalizer = document.getElementById('hero-equalizer');
    
    this.initEvents();
  }

  initEvents() {
    if (!this.playBtn) return;
    this.playBtn.addEventListener('click', () => this.togglePlay());
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  togglePlay() {
    this.initAudioContext();
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    this.isPlaying = true;
    this.step = 0;
    
    if (this.playBtnText) this.playBtnText.textContent = 'Pausar Set Preview';
    if (this.playBtnIcon) {
      this.playBtnIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
    }
    if (this.vinylDisc) this.vinylDisc.classList.add('spinning');
    if (this.equalizer) this.equalizer.classList.add('active');

    const stepTime = (60 / this.tempo) / 4 * 1000; // 16th notes
    this.timerId = setInterval(() => this.tick(), stepTime);
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) clearInterval(this.timerId);
    
    if (this.playBtnText) this.playBtnText.textContent = 'Escuchar Preview del Set';
    if (this.playBtnIcon) {
      this.playBtnIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
    }
    if (this.vinylDisc) this.vinylDisc.classList.remove('spinning');
    if (this.equalizer) this.equalizer.classList.remove('active');
  }

  tick() {
    if (!this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    const sixteenth = this.step % 16;
    const quarter = this.step % 4;

    // 1. Warm Deep House Kick on every 4th 16th note (Four on the floor)
    if (quarter === 0) {
      this.playKick(t);
    }

    // 2. Offbeat Crisp Hi-Hat (on step 2 of every beat)
    if (sixteenth % 4 === 2) {
      this.playHat(t, 0.12);
    }

    // 3. Subtle 16th Shaker/Hat on in-between steps
    if (sixteenth % 2 === 1) {
      this.playHat(t, 0.03, true);
    }

    // 4. Melodic Minor Chord Stab (Tech/Afro House Vibe)
    if (sixteenth === 0 || sixteenth === 6 || sixteenth === 10) {
      this.playChord(t, sixteenth);
    }

    this.step = (this.step + 1) % 64;
  }

  playKick(time) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.14);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  playHat(time, volume, isShaker = false) {
    const bufferSize = this.audioCtx.sampleRate * (isShaker ? 0.04 : 0.08);
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = isShaker ? 8000 : 6500;

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isShaker ? 0.03 : 0.07));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    noise.start(time);
  }

  playChord(time, stepPattern) {
    // Elegant A minor 9 / F maj 7 chord progression
    const rootNotes = stepPattern === 10 ? [174.61, 220, 261.63, 329.63] : [220, 261.63, 329.63, 392]; // F or Am
    
    rootNotes.forEach((freq) => {
      const osc = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, time);
      filter.frequency.exponentialRampToValueAtTime(400, time + 0.35);

      gain.gain.setValueAtTime(0.07, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(time);
      osc.stop(time + 0.45);
    });
  }
}

window.DJAudioPlayer = DJAudioPlayer;
