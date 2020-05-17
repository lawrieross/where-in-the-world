import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryInfo from './CountryInfo'

const Country = (props) => {
	const {
		match: {
			params: {
				id
			}
		},
	} = props

	const url = id && `https://restcountries.eu/rest/v2/alpha/${id}`
	const [country, setCountry] = useState('')

	useEffect(() => {
		axios.get(url)
			.then(res => {
				const { data } = res
				setCountry(data && <CountryInfo key={res.data.alpha2Code} {...data} />)
			})
	}, [url, country])

	return country
}

export default Country
