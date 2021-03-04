const SelectedCountries = (props) => {
    return (
        <div>
            {console.log('selected-countries', props.selectedCountries)}
            {props.selectedCountries?.length && props.selectedCountries.map(country => {
                return (
                    <div>
                        <img src={country.flag} alt={country.name}/>
                        <span>{country.name}</span>
                        <span>{country.capital}</span>
                        <span>{country.population}</span>
                        <span>{country.currencies.map(currency => currency.code)}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default SelectedCountries;
