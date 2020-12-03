import React, { Component } from 'react'
import './deviceregister.css'

const data = [];
class deviceregister extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			device_name: '',
			device_id: '',
			graph_location: '',
			measured_value_type: 'temperature'
			
		}
	}

	handledevice_nameChange = (event) => {
		this.setState({
			device_name: event.target.value
		})
	}

	handlegraph_locationChange = (event) => {
		this.setState({
			graph_location: event.target.value
		})
	}

	handledevice_idChange = event => {
		this.setState({
			device_id: event.target.value
		})
	}

	handlemeasured_value_typeChange = event => {
		this.setState({
			measured_value_type: event.target.value
		})
	}

	handleSubmit = event => {
		data.push(JSON.stringify(this.state));
		alert(`device name: ${this.state.device_name} \ndevice id: ${this.state.device_id} \nmeasured value type: ${this.state.measured_value_type} \ngraph location: ${this.graph_location}`)
		event.preventDefault()
	}

	render() {
		const { device_name, device_id, measured_value_type,graph_location } = this.state
		return (
	<body>
        <div className= "blackbox-form">
			<form className= "blackbox-form" onSubmit={this.handleSubmit}>
				<div className="wide-screen-label-cell">
                    <h1>device Registration</h1>
					<label>Device name:&nbsp;</label>
					<input
					    className = "rounded-input"
						type="text"
						value={device_name}
						onChange={this.handledevice_nameChange}
					/>
				</div>
				<br></br>
				<div className="wide-screen-label-cell">
					<label>Device ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
					<input
						className = "rounded-input"
						type="text"
						value={device_id}
						onChange={this.handledevice_idChange}
					/>
				</div>
				<br></br>
				
				<div className="wide-screen-label-cell">
					<label>Measured Value Type:</label>&nbsp;
					<select className="select" value={measured_value_type} onChange={this.handlemeasured_value_typeChange}>
						<option value="temperature">Tempersture</option>
						<option value="weight">weight</option>
						<option value="voltage">Voltage</option>
					</select>
				</div>
				<br/>
                <div className="wide-screen-label-cell">
					<label>Graph Location:&nbsp;&nbsp;&nbsp;</label>
					<input
						className = "rounded-input"
						type="text"
						value={graph_location}
						onChange={this.handlegraph_locationChange}
					/>
				</div>
				<br></br>
				<center>
				<button className = "button" type="submit">Submit</button></center>
				<br/><br/><br/><br/><br/>

			</form>
			</div>
			</body>
		)
	}
}

export default deviceregister
