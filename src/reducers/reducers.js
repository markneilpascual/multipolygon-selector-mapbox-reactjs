import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";
import countryReducer from "./countryReducer";
import polygonReducer from "./polygonReducer";

const reducers = combineReducers({
    country: countryReducer,
    countries: countriesReducer,
    polygon: polygonReducer,
});

export default reducers;
