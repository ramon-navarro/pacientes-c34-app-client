import React, { Component } from "react";
import { ControlLabel, Table} from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Consulta.css";

export default class Consulta extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: null,			
			rutPac:"",
			eno:[]
		};		
	}
	
	handleChange = async event => {
		this.setState({
			[event.target.id]: event.target.value
		});		
	}
		
	handleSubmit = async event => {
		this.setState({ isLoading: true });
		event.preventDefault();		
		try {
			const eno = await this.getEno(this.state.rutPac);
			this.setState({ eno });
		} catch (e) {
			alert(e);			
		}
		this.setState({ isLoading: false });
	}			
	getEno(rut){
		return API.get("eno", "/eno?rut="+rut);
	}
	renderEno(eno) {
		return (
			<Table striped bordered condensed hover>
			  <thead>
				<tr>
				  <th>Rut</th>
				  <th>Nombre</th>
				  <th>Notificador</th>
				  <th>Diagnostico</th>
				  <th>Fecha Notificación</th>
				</tr>
			  </thead>
			  <tbody>
			  {eno.map((item, i) =>{ 
				return(
					<tr>
					  <td>{item.rutPac}</td>
					  <td>{item.nombresPac + ' ' + item.apellido1Pac + ' ' + item.apellido2Pac}</td>
					  <td>{item.rutNot}</td>
					  <td>{item.cie101}</td>
					  <td>{item.FechaHora}</td>
					</tr>				
				)	
			  })} 
			  </tbody>
			</Table>
		);
	}

	render() {		
		//const data = [{Region:"RM",Cantidad:"10"},{Region:"II",Cantidad:"20"}]		
		return (
		<div className="container">
        <div className="row">
          <div className="col-md-12 order-md-1">
            <hr className="mb-2 border-dark" />
            <h4 className="mb-2">
              <b>Consulta Paciente</b>
            </h4>			
            <form className="needs-validation" noValidate onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="rutPac">Rut Paciente:</label>                  
				  <input type="text" className="form-control" id="rutPac" placeholder="########-#" required value={this.state.rutPac} onChange={this.handleChange}/>                  
                </div>				
				<div className="col-md-3 mb-3">                  
					<br/>
					<LoaderButton
						block
						bsStyle="primary"
						bsSize="large"
						/*disabled={!this.validateForm()}*/
						type="submit"
						isLoading={this.state.isLoading}
						text="Consultar"
						loadingText="Consultando..."
					/>
                </div>
			  </div>			  
			</form>
		  </div>
		</div>
		<br/>
		<div className="Consulta">			
			{!this.state.isLoading && this.renderEno(this.state.eno)}
		</div>
		</div>
		);
  }
}
