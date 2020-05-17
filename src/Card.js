import React from 'react'
import {
	Link
} from 'react-router-dom'
import { Col } from 'react-flexbox-grid'

const Card = (props) => {
	const {
		country: {
			alpha2Code,
			capital,
			flag,
			name,
			population,
			region,
		},
	} = props

	const style = {
		backgroundImage: `url('${flag}')`,
		backgroundPosition: 'center',
		backgroundRepeat  : 'no-repeat',
		backgroundSize: 'cover'
	}

	const renderPopulation = population && population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

	return (
		<Col xs={12} md={3}>
			<Link to={`/countries/${alpha2Code.toLowerCase()}`}>
				<div className="b-country__card">
					<div style={style} className="b-country__flag-container" />
					<div className="b-country__details">
						<h3 className="b-country__name">{name}</h3>
						<p className="b-country__info">
							<span className="b-country__label">Population:</span> {renderPopulation}
						</p>
						<p className="b-country__info">
							<span className="b-country__label">Region:</span> {region}
						</p>
						<p className="b-country__info">
							<span className="b-country__label">Capital:</span> {capital}
						</p>
					</div>
				</div>
			</Link>
		</Col>
	)
}

export default Card
