import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}
	
	async componentDidMount() {
		try{
			if (await Auth.currentSession()) {
				this.userHasAuthenticated(true);
			}
		}catch(e){
			if (e !== 'No current user') {
				alert(e);
			}			
		}	
		this.setState({ isAuthenticating: false });
	}
	
	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}
	
	handleLogout = async event => {
		await Auth.signOut();
		this.userHasAuthenticated(false);
		this.props.history.push("/login");
	}
		
	render() {		
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};
		return (
			!this.state.isAuthenticating &&
			<div className="App container" >
				<Navbar fluid inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">ENOnline</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<LinkContainer to="/registrar/new">
								<NavItem>Notificar</NavItem>
							</LinkContainer>
						</Nav>
						<Nav pullRight>					
							{this.state.isAuthenticated
							? /*Si*/
								<NavItem onClick={this.handleLogout}>Logout</NavItem>
							: /*No*/
								<Fragment>								
									<LinkContainer to="/login">
										<NavItem>Login</NavItem>
									</LinkContainer>
								</Fragment>
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Routes childProps={childProps} />
			</div>
		);
	}
}
export default withRouter(App);
//export default App;
