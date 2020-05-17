import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import {
	Link
} from 'react-router-dom'
import {
	Col,
	Row
} from 'react-flexbox-grid'

const CountryInfo = (props) => {
	const {
		borders,
		capital,
		currencies,
		flag,
		languages,
		name,
		nativeName,
		population,
		region,
		subregion,
		topLevelDomain
	} = props

	const [borderCountries, setBorderCountries] = useState('')
	const searchParams = borders && borders.map(b => b.toLowerCase()).join(';')
	const borderUrl = searchParams && `https://restcountries.eu/rest/v2/alpha?codes=${searchParams}`

	useEffect(() => {
		axios.get(borderUrl).then(res => {
			const { data } = res
			const countries = data && data.map(e => <Link className="b-country-information__border-country" to={`/countries/${e.alpha2Code.toLowerCase()}`}>{e.name}</Link>)
			setBorderCountries(countries)
		})
	}, [borderUrl])

	const renderBorderCountries = borderCountries ? borderCountries : ''
	const renderCapital = capital && capital
	const currencyArray = currencies && currencies.map(e => e.name)
	const renderCurrencies = currencyArray && currencyArray.join(', ')
	const languageArray = languages && languages.map(e => e.name)
	const renderLanguages = languageArray && languageArray.join(', ')
	const renderNativeName = nativeName && nativeName
	const renderPopulation = population && population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	const renderRegion = region && region
	const renderSubRegion = subregion && subregion
	const renderTopLevelDomain = topLevelDomain && topLevelDomain[0]

	return (
		<Fragment>
			<Row>
				<Col xs={12}>
					<div className="b-country-information">
						<Link className="b-button__back" to="/">
							<img className="b-button__left-arrow" src={require('./images/arrow-left2.svg')} alt="" />
							<span className="b-button__text">Back</span>
						</Link>
					</div>
				</Col>
			</Row>
			<Row middle="xs" between="md">
				<div className="b-country-information__flag-container">
					<img className="b-country-information__flag" src={flag} alt="" />
				</div>
				<div className="b-country-information__container">
					<div className="b-country-information__title">
						<h2>{name}</h2>
					</div>
					<div className="b-country-information">
						<div className="b-country-information__column">
							<p className="b-country__info">
								<span className="b-country__label">Native Name:</span> {renderNativeName}
							</p>
							<p className="b-country__info">
								<span className="b-country__label">Population:</span> {renderPopulation}
							</p>
							<p className="b-country__info">
								<span className="b-country__label">Region:</span> {renderRegion}
							</p>
							<p className="b-country__info">
								<span className="b-country__label">Sub Region:</span> {renderSubRegion}
							</p>
							<p className="b-country__info">
								<span className="b-country__label">Capital:</span> {renderCapital}
							</p>
						</div>
						<div className="b-country-information__column">
							<p className="b-country__info">
								<span className="b-country__label">Top Level Domain:</span> {renderTopLevelDomain}
							</p>
							<p className="b-country__info">
								<span className="b-country__label">Currencies:</span> {renderCurrencies}
							</p>
							<p className="b-country__info">
								<span className="b-country__label">Languages:</span> {renderLanguages}
							</p>
						</div>
					</div>
					<div className="b-country-information__border">
						<h3 className="b-country-information__border-title">Border Countries:</h3>
						<div className="b-country-information__border-countries">
							{renderBorderCountries}
						</div>
					</div>
				</div>
			</Row>
		</Fragment>
	)
}

export default CountryInfo