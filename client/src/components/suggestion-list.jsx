const SuggestionList = (props) => {
    const selectedCountries = [];
    const [filteredCountries, updateCountrylist] = React.useState([]);

    React.useEffect(() => {
        updateCountrylist([...props.filteredCountries])
    });

    console.log(props.filteredCountries, filteredCountries);

    debugger;

    return (
        <div className={'suggestion-list'}>
            {
                filteredCountries.map(country => {
                    return (
                        <div onClick={() => selectedCountries.concat(country)}>
                            <span>{country.name}</span>
                            <span>{country.capital}</span>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default SuggestionList;
