import React, { Component } from "react";
import { ControlLabel, Col } from "react-bootstrap";
import { API } from "aws-amplify";
import config from "../config";

export default class NewNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: null,			
			nombreEsta:""
		};
	}
	
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});	
	}
		
	handleSubmit = async event => {
		event.preventDefault();		
	}
	

	render() {
		return (
			<div>

			</div>
		);
	}
}
