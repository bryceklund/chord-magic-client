function context() {
    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            return null
        }
        window.AudioContext = window.webkitAudioContext;
    }
    context = new AudioContext()
    return context
}


module.exports = context 