require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


const espRoutes = require('./routes/espRoutes');
app.use('/api/integrations/esp', espRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));