import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const getMarkerColor = (magnitude) => {
    const normalizedMag = Math.min(Math.max(magnitude - 4, 0) / 4, 1);
    const r = 255;
    const g = Math.round(255 * (1 - normalizedMag));
    const b = 0;
    return `rgb(${r},${g},${b})`;
};

const UpdateMapView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);
    return null;
};

const ColormapBar = () => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '200px',
            height: '20px',
            background: 'linear-gradient(to right, yellow, red)',
            zIndex: 1000,
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
                <span>4.0</span>
                <span>8.0+</span>
            </div>
        </div>
    );
};

const Map3 = ({ feature }) => {
    const [mapCenter, setMapCenter] = useState([36, 140]);
    const [mapZoom, setMapZoom] = useState(5);

    useEffect(() => {
        if (feature) {
            const newCenter = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
            setMapCenter(newCenter);
            setMapZoom(6);  // ズームレベルは必要に応じて調整可能
        }
    }, [feature]);

    if (!feature) {
        return <div>Loading map data...</div>;
    }

    return (
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
            <UpdateMapView center={mapCenter} zoom={mapZoom} />
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Standard Map">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Aerial (Satellite)">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

            <Marker
                position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                icon={L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background-color: ${getMarkerColor(feature.properties.mag)}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
                    iconSize: [10, 10],
                    iconAnchor: [5, 5],
                })}
            >
                <Popup>
                    <div>
                        <b>Date: </b>{new Date(feature.properties.time).toLocaleString()}<br />
                        <b>Location: </b>{feature.properties.place}<br />
                        <b>Magnitude: </b>{feature.properties.mag}
                    </div>
                </Popup>
            </Marker>

            <ColormapBar />
        </MapContainer>
    );
};

export default Map3;