// Use native fetch available in Node.js 18+
export default async function handler(req, res) {
    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const start = fortyEightHoursAgo.toISOString();
    const end = now.toISOString();
    
    const mag = 2.0;
    const maxLat = 90;
    const minLat = -90;
    const maxLong = 180;
    const minLong = -180;

    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=${start}T00:00:00&endtime=${end}T23:59:59&maxlatitude=${maxLat}&minlatitude=${minLat}&maxlongitude=${maxLong}&minlongitude=${minLong}&minmagnitude=${mag}&orderby=time`;

    try {
        const response = await fetch(url); // Native fetch usage
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Directly send data to the client without saving it to a file
        res.status(200).json({ data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
