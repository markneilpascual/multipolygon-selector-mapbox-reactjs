import React, { useState } from "react";
import { useEffect } from "react";

import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDispatch, useSelector } from "react-redux";

import mapboxgl from "mapbox-gl";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawControl from "react-mapbox-gl-draw";

import { getBounds } from "./functions";
import { setPolygon } from "./actions/polygonActions";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const Map = new ReactMapboxGl({
    accessToken: MAPBOX_TOKEN,
});

function MapBox() {
    const [selectedCountry, setSelectedCountry] = useState({});
    const [viewport, setViewport] = useState({
        style: "mapbox://styles/mapbox/dark-v10",
        containerStyle: {
            height: "100vh",
            width: "100vw",
        },
        zoom: [1],
        fitBoundsOptions: {
            offset: [0, 0],
        },
    });
    const country = useSelector((state) => state.country);
    const dispatch = useDispatch()

    const onDrawChange = async ({ features }) => {
        let polygon = features;
        dispatch(setPolygon(polygon))
    };

    useEffect(() => {
        if (selectedCountry !== country) {
            setSelectedCountry(country);
            setViewport({
                ...viewport,
                fitBounds: country.geometry
                    ? getBounds(country.geometry.coordinates)
                    : null,
            });
        }
    }, [country]);

    return (
        <div>
            <Map {...viewport}>
                <DrawControl
                    position="bottom-right"
                    onDrawCreate={onDrawChange}
                    onDrawUpdate={onDrawChange}
                    onDrawCombine={(e) => console.log(e.createdFeatures)}
                    controls={{
                        polygon: true,
                        lines: false,
                        point: false,
                        combine_features: false,
                        uncombine_features: false,
                        line_string: false,
                    }}
                />
                <Source
                    id="geojson-layer"
                    type="geojson"
                    geoJsonSource={{ type: "geojson", data: country }}
                />
                <Layer
                    id="geojson-lines"
                    type="line"
                    paint={{
                        "line-color": "#fff",
                        "line-width": 3,
                    }}
                    sourceId="geojson-layer"
                />
            </Map>
        </div>
    );
}

export default MapBox;
