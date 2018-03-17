import * as React from 'react'
import { DB } from '../utils/firebase'

interface state {
}
export default class Admin extends React.Component<any, state> {
	componentDidMount() {
    const eventCode = window.location.hash.slice(1)

		DB.ref(`/events/${eventCode}`).on('value', (snap) => {
      console.log(snap.val())
			// this.setState({ eventInfo: snap.val() });
		});
	}

  render() {
    return (<div></div>)
  }
}