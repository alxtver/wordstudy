class Alexa {
  private volume = 1
  private rate = 1
  private pitch = 1

  private speechSynthesisUtterance = new SpeechSynthesisUtterance()

  public say(text: string, lang: 'ru-RU' | 'en-US'): void {
    this.speechSynthesisUtterance.text = text
    this.speechSynthesisUtterance.lang = lang
    this.speechSynthesisUtterance.volume = this.volume
    this.speechSynthesisUtterance.rate = this.rate
    this.speechSynthesisUtterance.pitch = this.pitch
    speechSynthesis.speak(this.speechSynthesisUtterance)
  }
}

export default new Alexa()
