import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import https from "https";
import http from "http";
import fs from "fs";
const dotenv = require('dotenv');
dotenv.config();

// create express app
const app = express();

// cors
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// routing
app.get('/health', (req, res, next) => {
    res.status(200).send({
        status: true,
        response: 'Server is running!'
    });
});

app.use('/api', require('./routes'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = StatusCodes.NOT_FOUND;
    next(err);
});

// production error handler - no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars

    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);

    // initalize the error response, override message for 401
    const errorMsg = { message: err.message };
    if (err.status === StatusCodes.UNAUTHORIZED) {
        err.message = 'Unauthorized';
    }

    // in development, attach the full error object
    if (process.env.NODE_ENV === 'development') {
        errorMsg.error = err;
    }

    return res.json(errorMsg);
});

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
    app.use(forceSsl);
}

if (isProduction) {
    const sslOptions = {
        key: fs.readFileSync(getEnv("PRIVKEY_CERT_LOC", true)),
        cert: fs.readFileSync(getEnv("FULLCHAIN_CERT_LOC", true))
    };
    http.createServer(app).listen(80);
    https.createServer(sslOptions, app).listen(443);
} else {
    const port = 3000;
    http.createServer(app).listen(3000, () => console.log(`Listening on port ${port}`));
}
