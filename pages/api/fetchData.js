// Use native fetch available in Node.js 18+
export default async function handler(req, res) {

    // 現在のUTC日時を取得
    const now = new Date();

    // 48時間前のUTC日時を計算
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    // 日時をISO 8601形式で取得する関数（ミリ秒を除く）
    function formatDateISO(date) {
        return date.toISOString().split('.')[0];
    }

    // 開始日時と終了日時を適切な形式で取得
    const startTime = formatDateISO(fortyEightHoursAgo);
    const endTime = formatDateISO(now);

    console.log('開始日時 (UTC):', startTime);
    console.log('終了日時 (UTC):', endTime);

    // USGS地震データAPIのパラメータ
    const maxLat = 90; // 最大緯度
    const minLat = -90; // 最小緯度
    const maxLong = 180; // 最大経度
    const minLong = -180; // 最小経度
    const mag = 2; // 最小マグニチュード

    // USGS地震データAPIのURL構築
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=${startTime}&endtime=${endTime}&maxlatitude=${maxLat}&minlatitude=${minLat}&maxlongitude=${maxLong}&minlongitude=${minLong}&minmagnitude=${mag}&orderby=time`;

    console.log('API URL:', url);

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
