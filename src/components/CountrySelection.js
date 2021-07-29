import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCountries } from "../actions/countriesActions";
import { setCountry } from "../actions/countryActions";

function CountrySelection() {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countriesList, setCountriesList] = useState([])
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch();

    const fetchCountries = async () => {
        let response = await axios.get('data/custom.geo-hd.json')
        await dispatch(setCountries(response.data.features))
        await setCountriesList(response.data.features)
    }

    const selectCountryHandler = (e) => {
        let selectedCountry = e.target.value;
        setSelectedCountry(selectedCountry)
        let country = countriesList.find( country => country.properties.iso_a3 === selectedCountry)

        dispatch(setCountry(country));
    }

    useEffect(() => {
        fetchCountries()
        
    }, [])

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Select
                    labelId="country"
                    id="country"
                    onChange={selectCountryHandler}
                    value={selectedCountry || ""}
                >
                    {countries.sort( (a,b) => a.properties.geounit.localeCompare( b.properties.geounit)).map((country, index) => {
                        return (
                            <MenuItem value={country.properties.iso_a3} key={index}>
                                {country.properties.geounit}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
}

export default CountrySelection;
