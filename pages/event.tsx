import * as React from 'react'
import {DB} from '../utils/firebase'

interface props {
  title: string
}

interface state {
  eventName: string
  eventInfo: { code: string }
}

export default class Event extends React.Component<props, state> {
  static getInitialProps() {
    return {
      title: 'Hello, world!'
    }
  }

  state = {
    eventName: '',
    eventInfo: {code: ''}
  }

  componentDidMount() {
    DB.ref('/eventInfo').on('value', (snap) => {
      this.setState({eventInfo: snap.val()});
    });
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.eventInfo).map(event => (<h5 key={event}>{this.state.eventInfo[event].code}</h5>))}
      </div>
    )
  }
}
