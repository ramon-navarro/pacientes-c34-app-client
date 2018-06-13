import React, { Component, Fragment} from "react";
import {FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			newPassword: "",
			newPasswordRequired: false,
			isLoading: false		
		};
		this.user="";
		this.data="";
	}
	
	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}
	
	validatePassword(){
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\.\+!@#\$%\^&\*])(?=.{8,})");
		const length = this.state.newPassword.length;
		if (strongRegex.test(this.state.newPassword)) return 'success';		
		else if (length > 0) return 'error';
		return null;
	}
	
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}
	
	handleSubmit = async event => {
		event.preventDefault();		
		this.setState({ isLoading: true });
		if(this.state.newPasswordRequired){		
			try {				
				this.data = await Auth.completeNewPassword(this.user, this.state.newPassword, this.user.challengeParam.requiredAttributes);
					console.log(this.data);			
					this.setState({newPasswordRequired: false});
					this.props.userHasAuthenticated(true);
					//this.props.history.push("/");							
			} catch (e) {
				alert(e.message);
				this.setState({ isLoading: false });
			}			
		}else{
			try {
				this.user = await Auth.signIn(this.state.email, this.state.password);
				console.log(this.user);			
				if(this.user.challengeName='NEW_PASSWORD_REQUIRED' && this.user.signInUserSession==null){
					alert("Debe cambiar Password");
					this.setState({newPasswordRequired: true});
					this.setState({ isLoading: false });
				}else{
					this.props.userHasAuthenticated(true);
					//this.props.history.push("/");
				}
			} catch (e) {
				alert(e.message);
				this.setState({ isLoading: false });
			}
		}
	}
	
	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="email" bsSize="large">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							autoFocus
							type="email"
							value={this.state.email}
							onChange={this.handleChange}
							disabled={this.state.newPasswordRequired}
						/>
					</FormGroup>
					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							value={this.state.password}
							onChange={this.handleChange}
							type="password"
							disabled={this.state.newPasswordRequired}
						/>
					</FormGroup>
					{this.state.newPasswordRequired
						?
							<Fragment>
							<FormGroup controlId="newPassword" bsSize="large" validationState={this.validatePassword()}>
								<ControlLabel>New Password</ControlLabel>
								<FormControl
									autoFocus
									value={this.state.newPassword}
									onChange={this.handleChange}
									type="password"
								/>
								<FormControl.Feedback />
								<HelpBlock>Minimum length 8</HelpBlock>
								<HelpBlock>Require numbers and special character</HelpBlock>								
								<HelpBlock>Require uppercase and lowercase letters</HelpBlock>								
							</FormGroup>
							<LoaderButton block bsSize="large" bsStyle="primary" disabled={!(this.validatePassword()=='success')} type="submit" isLoading={this.state.isLoading} text="Change Password" loadingText="Cargando…"/>
							</Fragment>
						:
							<LoaderButton block bsSize="large" bsStyle="primary" disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Login" loadingText="Cargando…"/>
					}					
				</form>
			</div>
		);
	}
}