import * as React from 'react'
import Link from 'next/link'
import {DB} from "../utils/firebase";

interface props {
  title: string
}

interface state {
  eventCode: string
  eventList: string[]
}

export default class Index extends React.Component<props, state> {
  state = {
    eventCode: '',
    eventList: []
  }

  componentDidMount() {
    DB.ref('/eventInfo').on('value', (snap) => {
      this.setState({eventList: Object.values(snap.val())})
    })
  }

  isEventExist() {
    return this.state.eventList.findIndex(event => event.code === this.state.eventCode) >= 0
  }

  handleChange = ({target: {value}}) => {
    this.setState({eventCode: value})
    this.isEventExist()
  }

  render() {
    return (
      <div>
        {this.props.title}
        <input onChange={this.handleChange} value={this.state.eventCode}/>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      </div>
    )
  }
}
