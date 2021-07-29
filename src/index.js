import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import MapBox from "./MapBox";
import "./index.css";
import Menu from "./Menu";
import PolygonData from "./PolygonData";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Menu></Menu>
            <MapBox></MapBox>
            <PolygonData/>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
