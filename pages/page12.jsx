import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterPlot = ({ data }) => {
    const [chartData, setChartData] = useState({ datasets: [] });

    useEffect(() => {
        if (data && data.features) {
            const plotData = data.features.map(feature => ({
                x: feature.geometry.coordinates[0], // Longitude
                y: feature.properties.mag
            }));

            setChartData({
                datasets: [
                    {
                        label: 'Earthquake Magnitude vs Longitude',
                        data: plotData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            });
        }
    }, [data]);

    const options = {
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Longitude'
                }
            },
            y: {
                beginAtZero: true,
                min: 2,  // Set the minimum value for the y-axis
                title: {
                    display: true,
                    text: 'Magnitude'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const longitude = context.raw.x.toFixed(2);
                        return `Longitude: ${longitude}, Magnitude: ${context.raw.y.toFixed(2)}`;
                    }
                }
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '80vh' }}>
            <Scatter data={chartData} options={options} />
        </div>
    );
};

const Page12 = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/fetchData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result.data);
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '98%', height: '80vh', padding: '10px' }}>
            {data ? (
                <ScatterPlot data={data} />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default Page12;
