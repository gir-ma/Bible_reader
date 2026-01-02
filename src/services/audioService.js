// Audio service using Web Speech API (browser built-in TTS)

class AudioService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.utterance = null;
    this.isPaused = false;
    this.currentRate = 1.0;
  }

  // Generate and speak text
  speak(text, options = {}) {
    // Cancel any ongoing speech
    this.cancel();

    // Create a new utterance
    this.utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties
    this.utterance.rate = options.rate || this.currentRate;
    this.utterance.pitch = options.pitch || 1.0;
    this.utterance.volume = options.volume || 1.0;

    // Select a voice (prefer English voices)
    const voices = this.synthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      this.utterance.voice = englishVoice;
    }

    // Set up event callbacks
    if (options.onStart) this.utterance.onstart = options.onStart;
    if (options.onEnd) this.utterance.onend = options.onEnd;
    if (options.onPause) this.utterance.onpause = options.onPause;
    if (options.onResume) this.utterance.onresume = options.onResume;
    if (options.onError) this.utterance.onerror = options.onError;

    this.synthesis.speak(this.utterance);
    this.isPaused = false;
  }

  // Pause speech
  pause() {
    if (this.synthesis.speaking && !this.isPaused) {
      this.synthesis.pause();
      this.isPaused = true;
    }
  }

  // Resume speech
  resume() {
    if (this.isPaused) {
      this.synthesis.resume();
      this.isPaused = false;
    }
  }

  // Cancel/stop speech
  cancel() {
    this.synthesis.cancel();
    this.isPaused = false;
  }

  // Check if currently speaking
  isSpeaking() {
    return this.synthesis.speaking;
  }

  // Get available voices
  getVoices() {
    return this.synthesis.getVoices();
  }

  // Set speech rate
  setRate(rate) {
    this.currentRate = rate;
    if (this.utterance) {
      this.utterance.rate = rate;
    }
  }
}

// Export a singleton instance
export const audioService = new AudioService();
