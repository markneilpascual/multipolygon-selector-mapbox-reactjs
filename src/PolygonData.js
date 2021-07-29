import { CardHeader, Typography } from "@material-ui/core";
import {
    Card,
    CardContent,
    Fab,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import {  ChevronRight, Poll } from "@material-ui/icons";
import { geojsonToWKT } from "@terraformer/wkt";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Highlight from "react-highlight";
import 'highlight.js/styles/a11y-dark.css'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            position: "absolute",
            top: 20,
            right: 20,
            borderRadius: 10,
            zIndex: 1,
            [theme.breakpoints.up("md")]: {
                width: 500,
            },
            [theme.breakpoints.down("md")]: {
                width: "98vw",
                top: 5,
                left: 5,
            },
        },
    };
});

function PolygonData() {
    const classes = useStyles();
    const [showMenu, setShowMenu] = useState(true);
    const [polygonData, setPolygonData] = useState('')
    const [polygonJSONData, setPolygonJSONData] = useState('')
    const polygon = useSelector(state => state.polygon)

    const toggleMenu = (e) => {
        setShowMenu(!showMenu);
    };


    useEffect(() => {
        if (polygon.length){
            setPolygonData(geojsonToWKT(polygon[0].geometry))
            setPolygonJSONData(JSON.stringify(polygon, null, ' '))
        }
        return () => {
            
        }
    }, [polygon])

    return (
        <div>
            <Fab
                style={{ zIndex: 1, position: "absolute", top: 20, right: 20 }}
                onClick={toggleMenu}
                size="small"
            >
                <Poll/>
            </Fab>
            <Card
                classes={classes}
                style={{ display: showMenu ? "block" : "none" }}
            >
                <CardHeader title="Polygon Data" action={ <IconButton onClick={toggleMenu}>
                    <ChevronRight />
                </IconButton>}/>
                <CardContent>
                    <Highlight language='code' >
                        {`${polygonData}`}
                    </Highlight>
                    <Typography style={{marginTop:10, paddingY: 20}}>JSON Data</Typography>
                    <Highlight language='json' >
                        {`${polygonJSONData}`}
                    </Highlight>
                </CardContent>
            </Card>
        </div>
    );
}

export default PolygonData;
