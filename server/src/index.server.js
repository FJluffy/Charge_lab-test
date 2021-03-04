const express = require("express");
const env = require("dotenv");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


//routes
const authRoutes = require('./routes/auth');
const stationRoutes = require('./routes/station');

//environment variable or you can say constance
env.config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.5mgnd.mongodb.net/${process.env.MONGO_DB_DATABASE}?authSource=admin&replicaSet=atlas-10p9x1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('database connected');
})

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', stationRoutes);

io.on('connection', function (socket) {
    console.log('a user connected');
})

http.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
