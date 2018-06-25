import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import config from "../config";

export default class NewNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: null,			
			nombreEsta:"",
			codigoEsta:"",
			nombresPac:"",
			apellido1Pac:"",
			apellido2Pac:"",
			rutPac:"",
			sexoPac:"",
			codigoComunaPac:"",
			diagnostico1:"",
			cie101:"",
			diagnostico2:"",
			cie102:"",
			nombresNot:"",
			apellido1Not:"",
			apellido2Not:"",
			rutNot:""
		};
	}
	
	//validateForm() {
	//	return this.state.rut.length > 0;
	//}
	
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
		if(event.target.id=="diagnostico1"){
			this.setState({
				cie101: event.target.value
			});
		}
	}
		
	handleSubmit = async event => {
		event.preventDefault();
		//if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
		//	alert("Please pick a file smaller than 5MB");
		//	return;
		//}
		this.setState({ isLoading: true });
		try {
			await this.createNote({
			content: this.state.content
		});
		this.props.history.push("/");
		} catch (e) {
			alert(e);
			this.setState({ isLoading: false });
		}
	}
	
	/*createNote(note) {			
			return API.post("eno", "/eno", {
				body: { 
						"nombreEsta": this.state.nombreEsta,
						"codigoEsta": this.state.codigoEsta,
						"nombresPac": this.state.nombresPac,
						"apellido1Pac": this.state.apellido1Pac,
						"apellido2Pac": this.state.apellido2Pac,
						"rutPac": this.state.rutPac,
						"sexoPac": this.state.sexoPac,
						"codigoComunaPac": this.state.codigoComunaPac,
						"diagnostico1": this.state.diagnostico1,
						"cie101": this.state.cie101,
						"diagnostico2": this.state.diagnostico2,
						"cie102": this.state.cie102,
						"nombresNot": this.state.nombresNot,
						"apellido1Not": this.state.apellido1Not,
						"apellido2Not": this.state.apellido2Not,
						"rutNot": this.state.rutNot
				}
			});
	}*/
	
	createNote(note) {			
			return API.post("eno", "/eno", {
				body: this.state
			});
	}
	
	

	render() {
		return (
		 <div className="container">
        <div className="row">
          <div className="col-md-12 order-md-1">
            <hr className="mb-2 border-dark" />
            <h4 className="mb-2">
              <b>ESTABLECIMIENTO</b>
            </h4>			
            <form className="needs-validation" noValidate onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="nombreEstablecimiento">1. Nombre del establecimiento</label>
                  <input type="text" className="form-control" id="nombreEsta" required value={this.state.nombreEsta} onChange={this.handleChange}/>
                  <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="codigoEstablecimiento">C&oacute;digo Establecimiento</label>
                  <input type="text" className="form-control w-75" id="codigoEsta" required value={this.state.codigoEsta} onChange={this.handleChange}/>
                  <div className="invalid-feedback"> Valid last name is required. </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="nombreSeremi">3. SEREMI</label>
                  <input type="text" className="form-control" required id="nombreSeremi" disabled/>
                  <div className="invalid-feedback"> Valid last name is required. </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="codigoSeremi">C&oacute;digo SEREMI</label>
                  <input type="text" className="form-control w-100" id="codigoSeremi" required disabled/>
                  <div className="invalid-feedback"> Valid last name is required. </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="oficinaProvincial">2. Oficina Provincial</label>
                  <input type="text" className="form-control" id="oficinaProvincial" required disabled/>
                  <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="codigoProvincial">C&oacute;digo Oficina Provincial</label>
                  <input type="text" className="form-control w-75" required id="codigoProvincial" disabled/>
                  <div className="invalid-feedback"> Valid last name is required. </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="numeroHistoria">4. N&uacute;mero Historia Cl&iacute;nica</label>
                  <input type="text" className="form-control" id="numeroHistoria" required disabled/>
                  <div className="invalid-feedback"> Valid last name is required. </div>
                </div>
              </div>
              <div className="mb-3 border-dark">
                <h4 className="mb-3">
                  <b />
                </h4>
                <hr className="mb-2 border-dark" />
                <h4 className="mb-2">
                  <b>DATOS DE IDENTIFICACI&Oacute;N DEL PACIENTE</b>
                </h4>
                <label htmlFor="username">5. NOMBRE DEL (DE LA) PACIENTE</label>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="lastName">Apellido Paterno</label>
                    <input type="text" className="form-control" required id="apellido1Pac" value={this.state.apellido1Pac} onChange={this.handleChange}/>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="motherlastName">Apellido Materno</label>
                    <input type="text" className="form-control" id="apellido2Pac" required value={this.state.apellido2Pac} onChange={this.handleChange}/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="Names">Nombres</label>
                    <input type="text" className="form-control" id="nombresPac" required value={this.state.nombresPac} onChange={this.handleChange} />
                    <div className="invalid-feedback"> Valid last name is required. </div>
                    <div className="col-md-3 mb-3"> </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="rut">6. RUT</label>
                    <input type="text" className="form-control" id="rutPac" placeholder="########-#" required value={this.state.rutPac} onChange={this.handleChange}/>
                    <div className="invalid-feedback"> RUT valido requerido. </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-2 mb-3">
                    <label htmlFor="sexo">7. Sexo</label>
                    <select className="custom-select d-block w-100" id="sexoPac" required value={this.state.sexoPac} onChange={this.handleChange}>
                      <option value="">Seleccione</option>
                      <option value="M">1. Hombre</option>
                      <option value="F">2. Mujer</option>
                    </select>
                    <div className="invalid-feedback"> Indicar un sexo de las alternativas. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="lastName">8. Fecha de Nacimiento</label>
                    <input type="text" className="form-control" id="nombreEstablecimiento" required disabled/>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-3 mb-3"> </div>
                  <div className="col-md-1 mb-3">
                    <label htmlFor="lastName">9. Edad</label>
                    <input type="text" className="form-control" id="nombreEstablecimiento" required disabled/>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="medidaEdad">10. Unidad de la medida de la edad</label>
                    <select className="custom-select d-block" id="medidaEdad" required disabled>
                      <option value="">Seleccione</option>
                      <option value="medidaEdad1">1. Dias</option>
                      <option value="medidaEdad2">2. Meses</option>
                      <option value="medidaEdad3">3. A&ntilde;os</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="nacionalidad">11. NACIONALIDAD</label>
                    <span className="text-muted">(Solo Extranjeros)</span>
                    <input type="text" className="form-control" id="nacionalidad" required disabled/>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="codigoNacionalidad">C&oacute;digo</label>
                    <input type="text" className="form-control" id="codigoNacionalidad" required disabled/>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-3 mb-3"> </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="puebloOriginario">12. PUEBLO ORIGINARIO DECLARADO</label>
                    <select className="custom-select d-block" id="state" required disabled>
                      <option value>Seleccione</option>
                      <option value="puebloOriginario1">1. Alacalufe (Kawashkar)</option>
                      <option value="puebloOriginario2">2. Atacame&ntilde;o</option>
                      <option value="puebloOriginario3">3. Aimara</option>
                      <option value="puebloOriginario4">4. Colla</option>
                      <option value="puebloOriginario5">5. Diaguita</option>
                      <option value="puebloOriginario6">6. Mapuche</option>
                      <option value="puebloOriginario7">7. Quechua</option>
                      <option value="puebloOriginario8">8. Rapa Nui</option>
                      <option value="puebloOriginario9">9. Y&aacute;mara (Yagan)</option>
                      <option value="puebloOriginario0">0. Ninguna</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="domicilio">13. DOMICILIO</label>
                    <input type="text" className="form-control" placeholder="Calle/Avenida" required id="domicilio" disabled/>
                    <div className="invalid-feedback py-4"> Direcci&oacute;n es requerida. </div>
                  </div>
                  <div className="col-md-1 mb-3">
                    <label htmlFor="numeroDomicilio">Nro.</label>
                    <input type="text" className="form-control" id="numeroDomicilio" placeholder="Nro." required disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-1 mb-3">
                    <label htmlFor="numeroDepto">Depto.</label>
                    <input type="text" className="form-control" id="numeroDepto" required disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                    <div className="col-md-3 mb-3"> </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="poblacion">Poblaci&oacute;n</label>
                    <input type="text" className="form-control" id="poblacion" required disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="codigoPostal">C&oacute;digo Postal</label>
                    <input type="text" className="form-control" id="codigoPostal" required disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="comuna">14. REGION</label>
                    <select className="custom-select d-block" id="codigoComunaPac" required value={this.state.codigoComunaPac} onChange={this.handleChange}>
                      <option value>Seleccione</option>
                      <option value="RM">RM - Metropolitana de Santiago</option>
                      <option value="II">II - Antofagasta</option>
                      <option value="VII">VII - Maule</option>                      
                    </select>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="codigoComuna">C&oacute;digo Comuna</label>
                    <input type="text" className="form-control" required id="codigoComuna" disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-3 mb-3"> </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="telefono">15. TEL&Eacute;FONO</label>
                    <input type="text" className="form-control" id="telefono" required disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                    <div className="col-md-3 mb-3"> </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="condicionActividad">16. CONDICI&Oacute;N DE ACTIVIDAD</label>
                    <select className="custom-select d-block" id="state" required disabled>
                      <option value>Seleccione</option>
                      <option value="condicionActividad0">0. Inactivo(a)</option>
                      <option value="condicionActividad1">1. Activo(a)</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="ocupacion">17. OCUPACI&Oacute;N</label>
                    <input type="text" className="form-control" required id="ocupacion" disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="codigoOcupacion">C&oacute;digo Ocupaci&oacute;n</label>
                    <input type="text" className="form-control" id="codigoOcupacion" required disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                    <div className="col-md-3 mb-3"> </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="categoriaOcupacional">18. CATEGORIA OCUPACIONAL</label>
                    <select className="custom-select d-block" id="state" required disabled>
                      <option value>Seleccione</option>
                      <option value="categoriaOcupacional1">1. Patr&oacute;n/Empresario</option>
                      <option value="categoriaOcupacional2">2. Empleado</option>
                      <option value="categoriaOcupacional3">3. Obrero</option>
                      <option value="categoriaOcupacional4">4. Trabajador Independiente</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                </div>
                <hr className="mb-2 border-dark" />
                <h4 className="mb-2">
                  <b>DATOS CLINICOS</b>
                </h4>
                <div className="row" draggable="true">
                  <div className="col-md-10 mb-3">
                    <label htmlFor="diagnostico1">19. DIAGNOSTICO CONFIRMADO</label>                    
					<select className="custom-select d-block" required id="diagnostico1" value={this.state.diagnostico1} onChange={this.handleChange}>
                      <option value="">Seleccione</option>
                      <option value="A010">FIEBRE TIFOIDEA</option>
                      <option value="B190">HEPATITIS VIRAL NO ESPECIFICADA CON COMA</option>
					  <option value="G000">MENINGITIS POR HEMOFILOS</option>
					  <option value="J128">NEUMONIA DEBIDA A OTROS VIRUS</option>
					  <option value="Z228">PORTADOR DE OTRAS ENFERMEDADES INFECCIOSAS</option>
                    </select>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="codigoDiagnostico1">CIE 10</label>
                    <input type="text" className="form-control" id="cie101" required value={this.state.diagnostico1} disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                    <div className="col-md-3 mb-3"> </div>
                  </div>
                  <div className="col-md-10 mb-3">
                    <label htmlFor="diagnostico2">20. OTRO DIAGNOSTICO CONFIRMADO
                      <span className="text-muted">(Registrar solo si en el anterior diagnostico se declara una TBC)</span>
                    </label>
                    <input type="text" className="form-control" required id="diagnostico2" value={this.state.diagnostico2} onChange={this.handleChange}/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="codigoDiagnostico2">CIE 10</label>
                    <input type="text" className="form-control" id="cie102" required value={this.state.cie102} onChange={this.handleChange}/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                    <div className="col-md-3 mb-3"> </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="fechaSintomas">21. FECHA PRIMEROS SINTOMAS</label>
                    <input type="date" className="form-control" required id="fechaSintomas" disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-3 mb-3"> </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="paisContagio">22. PAIS DE CONTAGIO</label>
                    <select className="custom-select d-block" id="paisContagio" required disabled>
                      <option value>Seleccione</option>
                      <option value="paisContagio1">1. Chile</option>
                      <option value="paisContagio2">2. Extranjero</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="idPais">Pa&iacute;s</label>
                    <input type="text" className="form-control" required id="idPais" disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="antecedenteVacunacion">23. ANTECEDENTE DE VACUNACI&Oacute;N</label>
                    <select className="custom-select d-block" id="antecedenteVacunacion" required disabled>
                      <option value>Seleccione</option>
                      <option value="antecedenteVacunacion1">1. Si</option>
                      <option value="antecedenteVacunacion2">2. No</option>
                      <option value="antecedenteVacunacion3">3. Ignorado</option>
                      <option value="antecedenteVacunacion4">4. No corresponde</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                    <label htmlFor="fechaDosis">24. FECHA &Uacute;LTIMA DOSIS</label>
                    <input type="date" className="form-control" required id="fechaDosis" disabled/>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                    <label htmlFor="numeroDosis">25. N&Uacute;MERO DOSIS</label>
                    <input type="number" className="form-control" required id="numeroDosis" disabled/>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="confirmacionDiag">26. CONFIRMACI&Oacute;N DIAGNOSTICA</label>
                    <div className="d-block my-1">
                      <div className="custom-control custom-checkbox">
                        <input id="confclinica" name="confirmaciondg" type="checkbox" className="custom-control-input" required defaultValue="on" disabled/>
                        <label className="custom-control-label" htmlFor="confclinica">1. Clinica (Incluye Imagenologia)</label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input id="confepi" name="confirmaciondg" type="checkbox" className="custom-control-input" required defaultValue="on" disabled/>
                        <label className="custom-control-label" htmlFor="confepi">2. Epidemiologica</label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input id="conffrotis" name="confirmaciondg" type="checkbox" className="custom-control-input" required defaultValue="on" disabled/>
                        <label className="custom-control-label" htmlFor="conffrotis">3. Frotis</label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input id="confcultivo" name="confirmaciondg" type="checkbox" className="custom-control-input" required defaultValue="on" disabled/>
                        <label className="custom-control-label" htmlFor="confcultivo">4. Cultivo</label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input id="confserio" name="confirmaciondg" type="checkbox" className="custom-control-input" required defaultValue="on" disabled/>
                        <label className="custom-control-label" htmlFor="confserio">5. Seriologia</label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input id="confbio" name="confirmaciondg" type="checkbox" className="custom-control-input" required defaultValue="on" disabled/>
                        <label className="custom-control-label" htmlFor="confbio">6. Biopsia</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3"> </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="embarazo">27. EMBARAZO</label>
                    <select className="custom-select d-block" id="state" required disabled>
                      <option value>Seleccione</option>
                      <option value="embarazo1">1. Si</option>
                      <option value="embarazo2">2. No</option>
                      <option value="embarazo3">3. No corresponde</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                </div>
                <hr className="mb-2 border-dark" />
                <h4 className="mb-2"> </h4>
                <h4 className="mb-2 text-left">
                  <b>COMPLETAR S&Oacute;LO SI LA DECLARACI&Oacute;N CORRESPONDE A TBC</b>
                </h4>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3"> </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="tbc">28. INDICAR SI CORRESPONDE A:</label>
                    <select className="custom-select d-block" id="state" required disabled>
                      <option value>Seleccione</option>
                      <option value="tbc1">1. Caso Nuevo</option>
                      <option value="tbc2">2. Recaida</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="recaidas">29. S&Oacute;LO PARA RECAIDAS</label>
                    <select className="custom-select d-block" id="state" required disabled>
                      <option value>Seleccione</option>
                      <option value="recaidas1">1. Igual Localizaci&oacute;n</option>
                      <option value="recaidas2">2. Otra</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div>
                  <div className="col-md-3 mb-3"> </div>
                </div>
                <hr className="mb-2 border-dark" />
                <h4 className="mb-2"> </h4>
                <h4 className="mb-2">
                  <b>DATOS DEL PERSONAL QUE NOTIFICA</b>
                </h4>
                <label htmlFor="username">30. NOMBRE</label>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="lastName2">Apellido Paterno</label>
                    <input type="text" className="form-control" required id="apellido1Not" value={this.state.apellido1Not} onChange={this.handleChange}/>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="motherlastName2">Apellido Materno</label>
                    <input type="text" className="form-control" id="apellido2Not" required value={this.state.apellido2Not} onChange={this.handleChange}/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombresNot">Nombres</label>
                    <input type="text" className="form-control" id="nombresNot" required value={this.state.nombresNot} onChange={this.handleChange}/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                    <div className="col-md-3 mb-3"> </div>
                  </div>
                </div>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="phone2">31. TEL&Eacute;FONO</label>
                    <input type="text" className="form-control" required id="phone2" disabled/>
                    <div className="invalid-feedback py-4"> Nombre de establecimiento es requerido. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="mail2">Correo Electr&oacute;nico</label>
                    <input type="text" className="form-control" required id="mail2" disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-3 mb-3"> </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="rutNot">32. RUT</label>
                    <input type="text" className="form-control" id="rutNot" placeholder="########-#" required required value={this.state.rutNot} onChange={this.handleChange}/>
                    <div className="invalid-feedback"> RUT valido requerido. </div>
                  </div>
                </div>
                <hr className="mb-2 border-dark" />
                <h4 className="mb-2"> </h4>
                <h4 className="mb-2">
                  <b>FECHA DE NOTIFICACI&Oacute;N</b>
                </h4>
                <div className="row" draggable="true">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="fechanotificacion1">33. FECHA DE NOTIFICACI&Oacute;N</label>
                  </div>
                  <div className="col-md-3 mb-3">
                    <input type="date" className="form-control" required id="fechanotificacion1" disabled/>
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="fechanotificacion2">34. FECHA DE NOTIFICACI&Oacute;N DESDE LA SEREMI AL MINSAL</label>
                  </div>
                  <div className="col-md-3 mb-3">
                    <input type="date" className="form-control" id="fechanotificacion2" required disabled/>
                    <div className="invalid-feedback"> Valid last name is equired. </div>
                  </div>
                </div>
                <hr className="mb-2 border-dark" />
                <h4 className="mb-2"> </h4>
              </div>
				<LoaderButton
						block
						bsStyle="primary"
						bsSize="large"
						/*disabled={!this.validateForm()}*/
						type="submit"
						isLoading={this.state.isLoading}
						text="Notificar"
						loadingText="Notificando..."
				/>
            </form>
            <div className="py-5 text-muted text-center">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 my-4">
                    <p className="mb-1">&copy; 2018-2019 I2Salud</p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a href="#">Privacy</a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">Terms</a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">Support</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
			
		);
	}
}



/* Backup
export default class NewNote extends Component {
	constructor(props) {
		super(props);
		this.file = null;
		this.state = {
			isLoading: null,
			content: ""
		};
	}
	
	validateForm() {
		return this.state.content.length > 0;
	}
	
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleFileChange = event => {
		this.file = event.target.files[0];
	}

	handleSubmit = async event => {
		event.preventDefault();
		if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
			alert("Please pick a file smaller than 5MB");
			return;
		}
		this.setState({ isLoading: true });
	}

	render() {
		return (
			<div className="NewNote">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="content">
						<FormControl
							onChange={this.handleChange}
							value={this.state.content}
							componentClass="textarea"
						/>
					</FormGroup>
					<FormGroup controlId="file">
						<ControlLabel>Attachment</ControlLabel>
						<FormControl onChange={this.handleFileChange} type="file"/>
					</FormGroup>
					<LoaderButton
						block
						bsStyle="primary"
						bsSize="large"
						disabled={!this.validateForm()}
						type="submit"
						isLoading={this.state.isLoading}
						text="Create"
						loadingText="Creating…"
					/>
				</form>
			</div>
		);
	}
}
*/