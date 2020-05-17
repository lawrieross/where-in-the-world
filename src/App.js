import React, { useEffect, useState } from 'react'
import {
	Col,
	Row
} from 'react-flexbox-grid'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Card from './Card'
import 'react-dropdown/style.css'
import './App.scss'

const App = (props) => {
	const {
		allCountries,
		handleChange,
		handleReset,
		handleSubmit,
		selectedOption,
		submitValue
	} = props

	const [countries, setCountries] = useState('')
	const [options, setRegions] = useState('')
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		allCountries().then(data => {
			let countries = selectedOption && selectedOption.value !== 'All' ? data && data.filter(e => e.region === selectedOption.label) : data && data
			countries = countries && submitValue ? countries.filter(e => e.name === submitValue) : countries && countries
			countries = countries && searchValue ? countries.filter(e => e.name === searchValue) : countries && countries
			countries = countries ? countries.map(e => <Card key={e.alpha2Code} country={e} />) : (
				<Col xs={12}>
					<h3>No results</h3>
				</Col>
			)
			let options = data && data.map(e => e.region)
			options = options.filter((item, index) => options.indexOf(item) === index)
			options = options.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []).sort()
			const index = options.findIndex(x => x === '')
			options[index] = 'All'
			options = options.map(o => ({ value: o, label: o }))
			setCountries(countries)
			setRegions(options)
		})
	}, [allCountries, options, selectedOption, searchValue, submitValue])

	const handleSearch = (event) => {
		setSearchValue(event.target.value)
	}

	const reset = () => {
		handleReset()
		setSearchValue('')
	}

	const customStyles = {
		menu: (provided, state) => ({
			...provided,
			width: state.selectProps.width,
			borderBottom: '1px dotted pink',
			color: state.selectProps.menuColor,
			padding: 20,
		}),

		control: (_, { selectProps: { width }}) => ({
		  	width: width
		}),

		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = 'opacity 300ms';
			return { ...provided, opacity, transition };
		}
	}

	return (
		<Row>
			<Col xs={12} className="b-toolbar">
				<form className="b-toolbar__form" onSubmit={() => handleSubmit(searchValue)}>
					<button className="b-toolbar__submit" type="submit">
						<FontAwesomeIcon icon={faSearch} size="md" />
					</button>
					<input
						className="b-toolbar__search"
						value={searchValue}
						onChange={handleSearch}
						type="text"
						placeholder="Search for a country..."
					/>
					<button
						className="b-toolbar__reset"
						onClick={reset}
						type="reset"
					>
						<FontAwesomeIcon icon={faTimesCircle} size="lg" />
					</button>
				</form>
				<Select
					styles={customStyles}
					value={selectedOption}
					onChange={(e) => handleChange(e)}
					options={options}
					placeholder="Filter by Region"
				/>
			</Col>
			{countries}
		</Row>
	)
}

export default App
