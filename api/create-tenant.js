import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, email } = req.body;

  try {
    const response = await axios.post(
      "https://rest.gohighlevel.com/v1/locations/",
      {
        name,
        companyName: name,
        email,
        phone: "0000000000"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_AGENCY_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || error.message);
  }
}
