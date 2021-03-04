import {useEffect, useState} from 'react';

const Search = () => {
    /**
     * START:
     * Country filter Handlers
     */
    const [filteredCountries, updateFilteredCountries] = useState([]);
    const [query, setQuery] = useState(undefined);

    useEffect(() => {
        (async () => {
            const filteredData = await filterCountryList(query);
            updateFilteredCountries([...filteredData]);
        })();
    }, [query]);

    const filterCountryList = (query) => {
        const countries = JSON.parse(localStorage.getItem('countryList'));
        const selectedCountryNames = selectedCountries.map(country => country.name);
        return countries.filter(country => country.name.toLowerCase().includes(query) && !selectedCountryNames.includes(country.name));
    }
    // END: Country Filter Handlers

    /**
     * START:
     * Country Selection Handlers
     */
    const [selectedCountries, updateSelectedCountries] = useState([]);
    const [selectedCountry, setCountry] = useState(undefined);

    useEffect(() => {
        (async () => {
            if (selectedCountry) {
                const currencyCode = selectedCountry.currencies && selectedCountry.currencies.length && selectedCountry.currencies.find(currency => currency.code).code;
                let exchangeRate;
                if (currencyCode) {
                    const exchangeRateResponse = await axios.get(`${API_END}/exchange-rate/${currencyCode}`, {
                        headers: {
                            'Authorization': `token ${getToken()}`
                        }
                    })
                    const conversionRateData = exchangeRateResponse.data.rates;
                    exchangeRate = (conversionRateData['SEK'] / conversionRateData[currencyCode]); // fixed to 3 because taking upto 2 is resulting 0 for large numbers
                }
                const selectedCountryList = selectedCountries.concat(Object.assign(selectedCountry, {exchangeRate}));
                updateSelectedCountries([...selectedCountryList]);
            }
        })();
    }, [selectedCountry]);
    // END: Country Selection Handlers

    /**
     * START:
     * Conversion Rate Handlers
     */
    const [conversion, setConversion] = useState({});

    const convertCurrency = (country, amount) => {
        conversion[country.name] = (amount / country.exchangeRate);
        setConversion(conversion);
    }
    // END: Conversion Rate Handlers

    return (
        <div className={'country-search-wrapper'}>
            <div>
                <input
                    placeholder={'Search Country'}
                    autoFocus={true}
                    type={'text'}
                    value={query}
                    onChange={(event) => setQuery(event.target.value || undefined)}
                />

                {filteredCountries.length
                    ? (<div className={'suggestion-list'}>
                        {
                            filteredCountries.map((country, key) => {
                                return (
                                    <div className={'suggestion-list-item'} key={key} onClick={() => {
                                        setCountry(country);
                                        setQuery(undefined);
                                    }}>
                                        <span>{country.name}</span>
                                    </div>
                                );
                            })
                        }
                    </div>)
                    : ''
                }
            </div>

            {selectedCountries && selectedCountries.length
                ? (<div className={'selected-countries-container'}>
                    {
                        selectedCountries.map((country, key) => {
                            return (
                                <div className={'grid selected-countries'} key={key}>
                                    <div><img src={country.flag} alt={country.name}/></div>
                                    <div className={'grid'}>
                                        <div>
                                            <span className={'country-name'}>{country.name}</span>
                                            <span className={'country-capital'} title={`capital: ${country.capital}`}> ({country.capital})</span>
                                        </div>
                                        <div title={'population'} className={'country-population'}><i className={'fas fa-users'}/> {country.population.toLocaleString()}</div>
                                        <div title={'currencies'}><i className={'far fa-money-bill-alt'}/> {country.currencies?.map(c => c.code).join(', ')}</div>
                                    </div>
                                    {
                                        country.exchangeRate
                                            ? (
                                                <div className={'exchange-rate'}>
                                                    <div className={'grid conversion-calculator'}>
                                                        <input
                                                            key={country.name}
                                                            placeholder={'SEK'}
                                                            onChange={(event) => convertCurrency(country, event.target.value)}
                                                        />
                                                        {
                                                            conversion[country.name] && <div
                                                                title={`${country.currencies?.find(c => c.code).code} ${conversion[country.name]?.toFixed(2)}`}
                                                                key={Math.random()}
                                                            >
                                                                {country.currencies?.find(c => c.code).code} {conversion[country.name]?.toFixed(2)}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className={'grid'}>Exchange Rate: {country.exchangeRate?.toFixed(2)} (SEK)</div>
                                                </div>
                                            )
                                            : ''
                                    }
                                </div>
                            );
                        })
                    }
                </div>)
                : ''
            }
        </div>
    );
}

import axios from 'axios';
import {getToken} from "../utility";
import {API_END} from "../app";

if (!localStorage.hasOwnProperty('countryList') && !localStorage.getItem('countryList')) {
    (async () => {
        const countryAPIEndpoint = `${API_END}/country-details`
        const response = await axios.get(`${countryAPIEndpoint}`, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        });
        localStorage.setItem('countryList', JSON.stringify(response.data));
        return response.data;
    })();
}


export default Search;
