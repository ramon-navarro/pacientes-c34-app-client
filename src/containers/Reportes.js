import React, { Component } from "react";
import { ControlLabel} from "react-bootstrap";
import { API } from "aws-amplify";
import config from "../config";
import "./Reportes.css";
//import '../../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries, VerticalBarSeries, LabelSeries} from 'react-vis';

//import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie  } from 'victory';


export default class Reportes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,			
			chartType:"",
			data:[]
		};		
	}
	
	handleChange = async event => {
		this.setState({
			[event.target.id]: event.target.value
		});					
	}
		
	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}
		try {			
			const data = await this.getData();			
			this.setState({ data });
		} catch (e) {
			alert(e);
		}
		this.setState({ isLoading: false });
	}
	getData(){
		return API.get("reportes", "/reportes?tipo=Bar");
	}
	renderChart(data) {
		return (					
			<VictoryChart domainPadding={10} theme={VictoryTheme.material} animate={{ duration: 1000 }} >	  
				<VictoryAxis								
					label="Regiones"
					style={{
						axisLabel: { padding: 30 }
					}}
				/>
				<VictoryAxis
					dependentAxis	
					label="Total Casos"				
					style={{
						axisLabel: { padding: 30 },
						labels: {fontSize: 14}
					}}
					
				/>
				<VictoryBar
					data={data}
					x="Region"        
					y="Cantidad"
				/>
			</VictoryChart>						  
		);
	}
	
	renderChartPie(data) {
		return (								
			
				<VictoryPie
					data={data}
					x="Region"        
					y="Cantidad"	
					colorScale={["cyan", "tomato","gold", "orange", "navy" ]}					
					style={{ labels: { fill: "black", fontSize: 15, fontWeight: "bold" } }}
					animate={{ duration: 1000 }}
				/>
			
		);
	}

	render() {				
		return (
		<div className="row">
          <div className="col-md-12 order-md-1">
            <hr className="mb-2 border-dark" />
            <h4 className="mb-2">
              <b>Reportes</b>
            </h4>			
              <div className="row">
                <div className="col-md-3 mb-3">
                  {!this.state.isLoading && this.renderChart(this.state.data)}
                </div>				
				<div className="col-md-3 mb-3">                  
					{!this.state.isLoading && this.renderChartPie(this.state.data)}
                </div>				
			  </div>			  			
		  </div>
		</div>		
		);
  }
}
