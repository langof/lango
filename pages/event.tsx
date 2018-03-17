import * as React from 'react'
import { DB } from '../firebase'

interface props {
	title: string
}
interface state {
	eventName: string
	eventInfo: string
}
export default class Index extends React.Component<props, state> {
	static getInitialProps({ req }) {
		return {
			title: 'Hello, world!'
		}
	}

	state = {
		eventName: '',
		eventInfo: ''
	}

	firebaseCallback() {

	}

	componentDidMount() {
		DB.ref('/eventInfo').on('value', (snap) => {
			this.setState({ eventInfo: snap.val() });
			console.log(this.state.eventInfo)
		});
	}

	handleChange = ({ target: { value } }) => {
		this.setState({ eventName: value })
	}

	render() {
		return (
			<div>
				{this.props.title}
				<input onChange={this.handleChange} value={this.state.eventName} />
				EventName: {this.state.eventName}
			</div>
		)
	}
}
