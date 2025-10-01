const Integration = require("../models/integration"); 
const axios = require('axios');

// Save & validate API key
exports.saveAPIKey = async (req, res) => {
  try {
    const { provider, apiKey, userId } = req.body;
    let url, headers;

    if (provider === 'mailchimp') {
      const dc = apiKey.split('-')[1]; 
      if (!dc) return res.status(400).json({ success: false, error: 'Invalid Mailchimp API key format' });

      url = `https://${dc}.api.mailchimp.com/3.0/lists`;
      headers = {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`
      };
    } else if (provider === 'getresponse') {
      url = 'https://api.getresponse.com/v3/accounts';
      headers = { 'X-Auth-Token': `api-key ${apiKey}` };
    } else {
      return res.status(400).json({ success: false, error: 'Invalid provider' });
    }

    // Validate API key by making test request
    await axios.get(url, { headers });

    // Save or update integration
    const integration = await Integration.findOneAndUpdate(
      { userId, provider },
      { apiKey },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: `${provider} API key validated and saved`, integration });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(401).json({ success: false, error: 'Invalid API key' });
  }
};

// Get lists/campaigns
exports.getLists = async (req, res) => {
  try {
    const { provider, userId } = req.query;
    const integration = await Integration.findOne({ provider, userId });
    if (!integration) {
      return res.status(404).json({ success: false, error: 'No integration found' });
    }

    let url, headers;

    if (provider === 'mailchimp') {
      const dc = integration.apiKey.split('-')[1];
      if (!dc) return res.status(400).json({ success: false, error: 'Invalid Mailchimp API key format' });

      url = `https://${dc}.api.mailchimp.com/3.0/lists`;
      headers = {
        Authorization: `Basic ${Buffer.from(`anystring:${integration.apiKey}`).toString("base64")}`
      };
    } else if (provider === 'getresponse') {
      url = 'https://api.getresponse.com/v3/campaigns';
      headers = { 'X-Auth-Token': `api-key ${integration.apiKey}` };
    }

    const response = await axios.get(url, { headers });
    res.json({ success: true, lists: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch lists' });
  }
};
