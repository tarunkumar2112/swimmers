const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
    const COLLECTION_ID = "67b08c039c6cfbd2576792a9"; // Your Collection ID

    if (!WEBFLOW_API_TOKEN) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow all origins
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Missing Webflow API token" }),
      };
    }

    const response = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items/live`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${WEBFLOW_API_TOKEN}`,
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
