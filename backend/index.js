const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const publicRoutes = require('./routes/public.routes.js');
// const clientRoutes = require('./routes/client.routes.js');
// const testRoutes = require('./routes/test.routes.js');

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/test', testRoutes);
app.use('/api/public', publicRoutes);
// app.use('/api/client', clientRoutes);



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
