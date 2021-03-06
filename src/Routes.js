import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import NewNote from "./containers/NewNote";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

/*Containers*/
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Reportes from "./containers/Reportes";
import Consulta from "./containers/Consulta";

export default ({ childProps }) =>	
	<Switch>
		<AppliedRoute path="/" exact component={Home} props={childProps}/>		
		<UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />		
		<AuthenticatedRoute path="/registrar/new" exact component={NewNote} props={childProps} />
		<AuthenticatedRoute path="/consultar" exact component={Consulta} props={childProps} />
		<AuthenticatedRoute path="/reportes" exact component={Reportes} props={childProps} />
		{ /* Finally, catch all unmatched routes */ }
		<Route component={NotFound} />	
	</Switch>;
	
/* Antes de proteger los recursos 
export default ({ childProps }) =>	
	<Switch>
		<AppliedRoute path="/" exact component={Home} props={childProps}/>
		<AppliedRoute path="/login" exact component={Login} props={childProps}/>
		<AppliedRoute path="/notes/new" exact component={NewNote} props={childProps} />		
		<Route component={NotFound} />
	</Switch>;
*/
	
/* Antes del manejo de sesion
export default () =>
	<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/login" exact component={Login} />
		<Route component={NotFound} />
	</Switch>;
*/