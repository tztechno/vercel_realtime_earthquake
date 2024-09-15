import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Function to interpolate color between yellow and red based on magnitude
const getMarkerColor = (magnitude) => {
    const normalizedMag = Math.min(Math.max(magnitude - 4, 0) / 4, 1);  // Normalize between 4 and 8
    const r = 255;
    const g = Math.round(255 * (1 - normalizedMag));
    const b = 0;
    return `rgb(${r},${g},${b})`;
};

// Component to update map view and open popup
const ChangeViewAndOpenPopup = ({ center, zoom, popupRef }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
        if (popupRef.current) {
            popupRef.current.openPopup();
        }
    }, [map, center, zoom, popupRef]);
    return null;
};

// Colormap bar component
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

const MapComponent = ({ data }) => {
    const [center, setCenter] = useState([36, 140]);
    const [zoom, setZoom] = useState(5);
    const popupRef = useRef();

    useEffect(() => {
        if (data && data.features && data.features.length > 0) {
            const latestFeature = data.features[0];
            setCenter([latestFeature.geometry.coordinates[1], latestFeature.geometry.coordinates[0]]);
            setZoom(7);
        }
    }, [data]);

    // データがない場合のフォールバック表示
    if (!data || !data.features) {
        return <div>Loading map data...</div>;
    }

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <ChangeViewAndOpenPopup center={center} zoom={zoom} popupRef={popupRef} />
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

            {data.features.map((feature, index) => (
                <Marker
                    key={index}
                    position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                    icon={L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: ${getMarkerColor(feature.properties.mag)}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
                        iconSize: [10, 10],
                        iconAnchor: [5, 5],
                    })}
                    ref={index === 0 ? popupRef : null}
                >
                    <Popup>
                        <div>
                            <b>Date: </b>{new Date(feature.properties.time).toISOString().replace('T', ' ').substring(0, 19)}<br />
                            <b>Location: </b>{feature.properties.place}<br />
                            <b>Magnitude: </b>{feature.properties.mag}
                        </div>
                    </Popup>
                </Marker>
            ))}

            <ColormapBar />
        </MapContainer>
    );
};

export default MapComponent;