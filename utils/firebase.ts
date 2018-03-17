import * as firebase from 'firebase'
import { languages } from '../utils/languages'
import { translate } from './translate';

const config = {
  apiKey: 'AIzaSyAFmmX2HlYLeMf_RHFuEC_72Fm7i2r9Tns',
  authDomain: 'lango-192611.firebaseapp.com',
  databaseURL: 'https://lango-192611.firebaseio.com',
}

!firebase.apps.length && firebase.initializeApp(config)

export const DB = firebase.database()

export const insertSpeeches = (eventCode: string, originLang: string, onChangeTranscript: Function) => e => {
  let transcript = [...e.results].map(result => result[0].transcript).join('')
  onChangeTranscript(transcript)
  if (e.results[0].isFinal) {
    const newScript = {
      text: transcript,
      language: originLang,
      created: Date.now()
    }
    DB.ref(`/events/${eventCode}/speech`).push(newScript)
    onChangeTranscript('')
    languages.forEach(async language => {
      const translatedText = await translate(newScript, language)
      DB.ref(`/events/${eventCode}/translated/${language.code}`).push({
        text: translatedText
      })
    })
  }
}