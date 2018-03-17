import axios from 'axios'
import { Language } from './languages';

const apiKey = 'AIzaSyCCioj-_r71RMpBewDvS6Vq6Z4bkYu82LQ'
const apiURL = 'https://translation.googleapis.com/language/translate/v2?'

export const translate = async (newScript: any, targetLang: Language) => (await axios.get(
  `${apiURL}q=${newScript.text}&target=${targetLang.code}&key=${apiKey }`
)).data.data.translations[0].translatedText