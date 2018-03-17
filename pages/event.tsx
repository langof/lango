import * as React from 'react'
import {DB} from '../utils/firebase'

interface props {
  title: string
}

interface state {
  eventName: string
  eventInfo: string[]
}

export default class Event extends React.Component<props, state> {
  static getInitialProps() {
    return {
      title: 'Hello, world!'
    }
  }

  state = {
    eventName: '',
    eventInfo: []
  }

  componentDidMount() {
    DB.ref('/eventInfo').on('value', (snap) => {
      this.setState({eventInfo: Object.values(snap.val())});
    })
  }

  render() {
    return (
      <div>
        {this.state.eventInfo.map(({code}) => (<h5 key={code}>{code}</h5>))}
      </div>
    )
  }
}
