import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Function to interpolate color between two colors
function interpolateColor(factor, color1, color2) {
    const r = Math.round(color1.r + factor * (color2.r - color1.r));
    const g = Math.round(color1.g + factor * (color2.g - color1.g));
    const b = Math.round(color1.b + factor * (color2.b - color1.b));
    return { r, g, b };
}

// Function to convert RGB to hex color
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Function to get marker color based on magnitude
function getMarkerColor(magnitude) {
    const normalizedMagnitude = magnitude <= 4 ? 0 : magnitude >= 7 ? 1 : (magnitude - 4) / 3;
    const interpolatedColor = interpolateColor(normalizedMagnitude, { r: 255, g: 255, b: 0 }, { r: 255, g: 0, b: 0 });
    return rgbToHex(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b);
}

// Function to get the gradient for the colormap bar
function getColormapGradient() {
    return 'linear-gradient(to right, yellow, red)';
}

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

// Map component
const Map = ({ data }) => {
    if (!data || !data.features || data.features.length === 0) {
        return <div>No data available to display the map.</div>;
    }

    return (
        <MapContainer center={[0,0]} zoom={2} style={{ height: '100%', width: '100%' }}>
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
                >
                    <Popup>
                        <div>
                            <b>Date: </b>{new Date(feature.properties.time).toUTCString()}<br />
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

export default Map;