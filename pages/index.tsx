import * as React from 'react'
import Link from 'next/link'

interface props {
  name: string
}
interface state {
  toggle: boolean
}
export default class Index extends React.Component<props, state> {
  static getInitialProps({ req }) {
    return { name: 'me!' }
  }

  state = {
    toggle: true
  }

  handleClick = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  getBackgroundColor = () => (this.state.toggle ? '#ff0000' : '#00ff00')

  render() {
    return (
      <div style={{ backgroundColor: this.getBackgroundColor() }} onClick={this.handleClick}>
        Click {this.props.name}.{' '}
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    )
  }
}
