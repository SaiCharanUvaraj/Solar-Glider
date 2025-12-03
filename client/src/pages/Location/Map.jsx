import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Map = ({ dronesListInfo }) => {

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
    });

    const FitToMarkers = ({ dronesListInfo }) => {
        const map = useMap();
        useEffect(() => {
            if (dronesListInfo.length > 0) 
            {
                const bounds = L.latLngBounds(dronesListInfo.map(drone => drone.location));
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }, [map, dronesListInfo]);
        return null;
    };

    return (
        <div>
            <MapContainer
                style={{width: "70vw",
                    height: "80vh",
                    borderRadius: "0.5rem"}} 
                center={[0, 0]} zoom={3} minZoom={3} maxZoom={18}
            >
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />

                {Array.isArray(dronesListInfo) && dronesListInfo.length > 0 && dronesListInfo.map((drone) => (
                    <Marker 
                        key={drone.id} 
                        position={drone.location}
                        ref={(marker) => {
                            setTimeout(() => {
                                if (marker && marker._popup)  // ✅ added safe check
                                {
                                    marker.openPopup();
                                }
                            }, 0);
                        }}
                    >
                        <Popup closeButton={false}>
                            <b>{drone.name}</b>
                        </Popup>
                    </Marker>
                ))}

                {Array.isArray(dronesListInfo) && dronesListInfo.length > 0 && <FitToMarkers dronesListInfo={dronesListInfo} />}
            </MapContainer>
        </div>
    );
};

export default Map;