import React, { useEffect } from 'react'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Map = ({position}) => {

    const FitToMarker = ({ position })=> {
        const map = useMap();
        useEffect(() => {
            map.setView(position, 20);
        }, [map, position]);
        return null;
    }

    // Fix default icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
    });

    return (
        <div>
            <MapContainer
                style={{
                    width: "70vw",
                    height: "80vh", // half of width 2:1 ratio
                    borderRadius: "0.5rem"
                }}
                minZoom={3}   // users can’t zoom out beyond "world view"
                maxZoom={18}  // max zoom in (optional)
                worldCopyJump={false} // disable map repeat when panning
                center={[0, 0]} // world center (near Africa so all continents are visible)
                zoom={2}
                maxBounds={[
                    [-90, -180], // southwest
                    [90, 180],   // northeast
                ]}
                maxBoundsViscosity={1.0} // prevents dragging outside bounds
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    noWrap={true}
                    bounds={[[-90, -180], [90, 180]]}
                />
                <Marker position={position}>
                    <Popup>A pretty popup! <br /> Easily customizable.</Popup>
                </Marker> 
                <FitToMarker position={position} />
            </MapContainer>
        </div>
    )
}

export default Map