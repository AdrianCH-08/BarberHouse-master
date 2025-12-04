const axios = require("axios");

const GRAPHITE_URL = process.env.GRAPHITE_URL;
const GRAPHITE_API_KEY = process.env.GRAPHITE_API_KEY;

async function sendMetric(name, value) {
  try {
    const body = [
      {
        name,
        interval: 10,
        value,
        tags: ["barberhouse"],
        time: Date.now() * 1_000_000, // nanosegundos
      },
    ];

    await axios.post(GRAPHITE_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GRAPHITE_API_KEY}`,
      },
    });

    console.log(`✔ Métrica enviada -> ${name}: ${value}`);
  } catch (error) {
    console.error("❌ Error enviando métrica:", error.message);
  }
}

module.exports = sendMetric;
