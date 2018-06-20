import React, { Component } from "react";
import "./Home.css";


export default class Home extends Component {
	render() {
		return (
			<div className="Home">
				<div className="lander">
					<div className="py-5">
				<div className="container">
				  <div className="row">
					<div className="text-center col-md-7 mx-auto">
					  <i className="fa d-block fa-bullseye fa-5x mb-4 text-info" />
					  <h2>
						<b>BOLETIN NOTIFICACIÓN ENFERMEDADES DE DECLARACIÓN OBLIGATORIA (ENO)</b>
					  </h2>
					  <p className="lead">ENO Online demo desarrollado por I2Salud</p>
					</div>
				  </div>
				</div>
			  </div>
				</div>
				<div className="py-5 text-muted text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 my-4">
              <p className="mb-1">© 2018-2019 I2Salud</p>
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
			
		);
	}
}