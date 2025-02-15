const { WebflowClient } = require("webflow-api");

exports.handler = async () => {
  try {
    // Load API Token from environment variables
    const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

    if (!WEBFLOW_API_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Webflow API token" }),
      };
    }

    // Initialize Webflow Client
    const webflow = new WebflowClient({ accessToken: WEBFLOW_API_TOKEN });

    // Fetch sites
    const sites = await webflow.sites.list();

    return {
      statusCode: 200,
      body: JSON.stringify(sites),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
