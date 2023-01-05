const express = require('express');
const cors = require('cors');
require('./app/corn-job/updateBattery');
require('./app/connection/db');
const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./app/routes/battery_route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/api.`);
});
