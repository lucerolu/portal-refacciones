export default async function handler(req, res) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).send("Missing coords");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/staticmap
    ?center=${lat},${lng}
    &zoom=16
    &size=600x300
    &markers=color:red|${lat},${lng}
    &key=${apiKey}
  `.replace(/\s/g, "");

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Error fetching map");
  }
}
