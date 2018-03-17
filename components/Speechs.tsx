import * as React from 'react'
import {DB} from "../utils/firebase";

interface props {
  eventCode: string
}

interface state {
  speechScripts: object
}

export class Speechs extends React.Component<props, state> {
  static getInitialProps() {
    return {eventCode: ''}
  }

  state = {
    speechScripts: {}
  }

  componentDidMount() {
    DB.ref(`events/${this.props.eventCode}/speech`).on('value', (snap) => {
      this.setState({speechScripts: snap.val()});
    })
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.speechScripts).map((key) => (<h2 key={key}>{this.state.speechScripts[key].text}</h2>))}
      </div>
    )
  }
}
