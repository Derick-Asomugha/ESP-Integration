ESP Integration API

This project is a simple Node.js + Express + MongoDB API that integrates with popular Email Service Providers (ESPs) like Mailchimp and GetResponse. It allows saving API keys securely, validating them, and fetching mailing lists or campaigns.

Features

Connect with Mailchimp or GetResponse.

Validate API keys before saving them.

Store API keys securely in MongoDB.

Fetch lists/campaigns from the connected ESP.

📂 Project Structure
📂 Project Root
│── server.js                 # App entry point
│── routes/espRoutes.js       # Routes for ESP integrations
│── controllers/espController.js  # Business logic (save key, fetch lists)
│── models/integration.js     # Mongoose schema for integrations
│── .env                      # Environment variables



 Setup & Installation

Clone the repo:

git clone <your-repo-url>
cd project-folder


Install dependencies:

npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongo_connection_string


Start the server:

npm start


Server will run at: http://localhost:5000


 API Endpoints




1. Save & Validate API Key

POST /api/integrations/esp
Request body:

{
  "provider": "mailchimp",   // or "getresponse"
  "apiKey": "your_api_key",
  "userId": "12345"
}


Response:

{
  "success": true,
  "message": "mailchimp API key validated and saved"
}




2. Get Lists / Campaigns

GET /api/integrations/esp/lists?provider=mailchimp&userId=12345

Response (Mailchimp example):

{
  "success": true,
  "lists": { ... }
}


Response (GetResponse example):

{
  "success": true,
  "lists": [ ... ]
}






TECH STACKS

Node.js + Express (Backend framework)

MongoDB + Mongoose (Database & ORM)

Axios (API requests)



HOW IT WORKS

User sends their ESP provider + API key.

The API makes a test call to validate the key.

If valid, the key is saved in MongoDB linked to the userId.

The user can then fetch lists or campaigns anytime using the stored key.