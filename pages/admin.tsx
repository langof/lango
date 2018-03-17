import * as React from 'react'
import { DB } from '../utils/firebase'
import { Balloon } from '../components/Balloon';
import { languages } from '../utils/languages'

interface state {
  lang: string
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
export default class Admin extends React.Component<any, state> {
  state = {
    lang: 'en',
    speech: {},
    translated: { 'en': {}}
  }
  
	componentDidMount() {
    const eventCode = window.location.hash.slice(1)

		DB.ref(`/events/${eventCode}`).on('value', (snap) => {
      console.log(snap.val())
			this.setState(snap.val());
		});
  }

  handleChangeLanguage = ({ target: { value }}) => {
    this.setState({ lang: value })
  }

  render() {
    const { lang, speech, translated } = this.state
    return (
      <div>
        <div>
          <ul>
            {Object.keys(speech).reverse().map((key) => (
              <Balloon key={key} text={speech[key].text.replace('&#39;', `'`)} />
            ))}
          </ul>
        </div>
        <div>
          <select onChange={this.handleChangeLanguage} value={lang}>
            {languages.map((language) => (<option value={language.code}>{language.icon} {language.text}</option>))}
            <option value='en'>English</option>
          </select>
          <ul>
          {Object.keys(translated[lang]).reverse().map((key) => (
            <Balloon key={key} text={translated[lang][key].text.replace('&#39;', `'`)} />
          ))}
          </ul>
        </div>
      </div>
    )
  }
}