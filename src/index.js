import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {
	Link,
	Route,
	BrowserRouter as Router
} from 'react-router-dom'
import {
	Col,
	Grid,
	Row
} from 'react-flexbox-grid'
import * as serviceWorker from './serviceWorker'
import App from './App'
import Country from './Country'
import './index.css'

class Routing extends Component {
	state = {
		selectedOption: null,
		submitValue: ''
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption })
	}

	handleSubmit = (submitValue) => {
		this.setState({ submitValue })
	}

	render() {
		const getCountryData = () => axios.get('https://restcountries.eu/rest/v2/all').then(res => res.data)
		const { selectedOption, submitValue } = this.state;

		return(
			<Router>
				<header>
					<Grid>
						<Row middle="xs">
							<Col xs={12}>
								<div className="b-heading">
									<Link to="/">
										<h1 className="b-title">Where in the world?</h1>
									</Link>
								</div>
							</Col>
						</Row>
					</Grid>
				</header>
				<main>
					<Grid>
						<Route exact path="/" component={() => <App key={0} selectedOption={selectedOption} handleChange={this.handleChange} handleSubmit={this.handleSubmit} submitValue={submitValue} allCountries={getCountryData} />} />
						<Route path="/countries/:id" render={(props) => <Country {...props} />} />
					</Grid>
				</main>
			</Router>
		)
	}
}

ReactDOM.render(<Routing />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
