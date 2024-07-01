require('dotenv').config();
const express = require('express')
const https = require('https');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

const port = 3000;
const app = express();

const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    jwksUri: process.env.JWKSURI,
    agent: new https.Agent({ rejectUnauthorized: false }),
});

app.use(cors());

app.get('/', checkJwt, async (req, res) => {
    try {
        console.log('Connecting to server');
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db("para");
        const collection = db.collection('teamMembers');
        const response = await collection.find({}).toArray();

        res.send(response);
    } catch (err) {
        console.log(err);
        res.send("An error occurred while getting teamMembers");
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));