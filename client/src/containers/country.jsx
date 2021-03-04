import Search from "../components/search";
// import SelectedCountries from "../components/selected-countries";

const CountryContainer = (props) => {
    // const [selectedCountries, updateList] = React.useState({selectedCountries: []});

    // React.useEffect(() => {
    //     updateList(props.selectedCountries);
    // }, [props.selectedCountries]);

    return (
        <>
            <Search/>
            {/*<SelectedCountries selectedCountries={selectedCountries}/>*/}
        </>
    );
}

export default CountryContainer;
