import { Component } from 'preact';
import ParentCheck from "./ParentCheck";

export default class CheckBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// dummy data, in real it could be props
			nodes: [{
				text: "Root",
				isChecked: true,
				isInterminiate: false,
				children: [{
					text: "Parent",
					isChecked: true,
					isInterminiate: false,
					children: [{
						text: "child",
						isChecked: true,
						isInterminiate: false,
						children: []
					}, {
						text: "child",
						isChecked: true,
						isInterminiate: false,
						children: []
					}]
				}, {
					text: "Parent",
					isChecked: true,
					isInterminiate: false,
					children: [{
						text: "child",
						isChecked: true,
						isInterminiate: false,
						children: []
					}, {
						text: "child",
						isChecked: true,
						isInterminiate: false,
						children: []
					}]
				}]
			}]
		};
	}

	childUpdated(index, node) {
		const { nodes } = this.state;
		nodes[index] = node;
		this.setState({ nodes });
	}

	render({ }, { nodes }) {
		return (
			<div id="app">
				{
					nodes.map((node, i) => <ParentCheck node={node} nodeUpdated={this.childUpdated.bind(this, i)} />)
				}
			</div>
		);
	}
}
