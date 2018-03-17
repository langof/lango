import * as React from 'react'
import {DB, insertSpeeches} from '../utils/firebase'
import {Balloon} from '../components/Balloon';
import {languages} from '../utils/languages'
import {getSpeechRecognitionObject} from '../utils/speechRecognition'

interface props {
}

interface state {
  recognition?: SpeechRecognition
  originLang: string
  translatedLang: string
  transcript: string
  speech: {
    [key: string]: {
      created: number
      language: string
      text: string
    }
  }
  translated: {
    [language: string]: {
      [key: string]: {
        text: string
      }
    }
  }
}

export default class Admin extends React.Component<props, state> {
  state = {
    recognition: undefined,
    originLang: 'ko',
    translatedLang: 'en',
    transcript: '',
    speech: {},
    translated: {'en': {}}
  }

  async componentDidMount() {
    const eventCode = window.location.hash.slice(1)
    if (!eventCode) window.location.replace('/')

    const recognition = await getSpeechRecognitionObject()
    recognition.interimResults = true
    recognition.lang = 'ko-KR'
    recognition.addEventListener('result', insertSpeeches(eventCode, this.state.originLang, this.handleChangeTransacript))
    recognition.addEventListener('end', recognition.start)
    this.setState({recognition})

    DB.ref(`/events/${eventCode}`).on('value', (snap) => {
      console.log(snap.val())
      this.setState(snap.val());
    });
    recognition.start()
  }

  handleChangeTransacript = (transcript) => {
    this.setState({transcript})
  }

  handleChangeLanguage = ({target: {name, value}}) => {
    if (name === 'originLang') {
      this.state.recognition.lang = languages.find(langunage => langunage.code === value).talk
    }
    this.setState({[name]: value})
  }

  render() {
    const {originLang, translatedLang, speech, translated} = this.state
    return (
      <div style={{display: 'grid', gridTemplateColumns: 'auto auto' }}>
        <div>
          <select name='originLang' onChange={this.handleChangeLanguage} value={originLang}>
            {languages.map((language) => (<option value={language.code}>{language.icon} {language.text}</option>))}
            <option value='en'>English</option>
          </select>
          <ul>
            {this.state.transcript && <Balloon key={'transcript'} text={this.state.transcript.replace('&#39;', `'`)}/>}
            {Object.keys(speech).reverse().map((key) => (
              <Balloon key={key} text={speech[key].text.replace('&#39;', `'`)}/>
            ))}
          </ul>
        </div>
        <div style={{ position: 'relative'}}>
          <select name='translatedLang' onChange={this.handleChangeLanguage} value={translatedLang}>
            {languages.map((language) => (<option value={language.code}>{language.icon} {language.text}</option>))}
            <option value='en'>English</option>
          </select>
          <ul>
          {translated[translatedLang] && Object.keys(translated[translatedLang]).reverse().map((key) => (
            <Balloon key={key} text={translated[translatedLang][key].text.replace('&#39;', `'`)} />
          ))}
          </ul>
        </div>
      </div>
    )
  }
}