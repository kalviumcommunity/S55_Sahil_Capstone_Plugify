const mongoose = require('mongoose');
require('dotenv').config();

let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000 
          });
        connectionStatus = "The database has been connected";
    } catch (err) {
        console.error("Failed to connect to database");
        connectionStatus = "error";
        throw err;
    }
};  

const stopDatabase = async () => {
    await mongoose.disconnect();
    connectionStatus = "closed";
};

const getConnectionStatus = async () => {
    return { status: connectionStatus };
    // return JSON.stringify(connectionStatus);
};

module.exports = { startDatabase, stopDatabase, getConnectionStatus };