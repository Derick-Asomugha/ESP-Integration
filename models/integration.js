const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: ['mailchimp', 'getresponse'],
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Integration', integrationSchema);
