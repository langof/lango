import * as React from 'react'
import Link from 'next/link'

interface props {
  title: string
}

interface state {
  eventName: string
}

export default class Index extends React.Component<props, state> {
  state = {
    eventName: ''
  }

  handleChange = ({target: {value}}) => {
    this.setState({eventName: value})
  }

  render() {
    return (
      <div>
        {this.props.title}
        <input onChange={this.handleChange} value={this.state.eventName}/>
        EventName: {this.state.eventName}
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      </div>
    )
  }
}
