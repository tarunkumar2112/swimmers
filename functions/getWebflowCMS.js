const { WebflowClient } = require("webflow-api");

exports.handler = async () => {
  try {
    const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
    const SITE_ID = "67692557ab90f4029b75ba00"; // Replace with your actual Site ID

    if (!WEBFLOW_API_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Webflow API token" }),
      };
    }

    // Initialize Webflow Client
    const client = new WebflowClient({ accessToken: WEBFLOW_API_TOKEN });

    // Fetch CMS collections
    const collections = await client.collections.list(SITE_ID);

    return {
      statusCode: 200,
      body: JSON.stringify(collections),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
