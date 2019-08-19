const express = require('express')
const cors = require('cors')
const app = express()

// list all the accepted hosts
const whitelist = ['http://localhost:3000', 'https://graph.facebook.com', 'http://example2.com'] 

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = {
    cors: cors(),
    corsWithOptions: cors(corsOptionsDelegate)
}