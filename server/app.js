require('dotenv').config();
const express = require('express')
const https = require('https');
const axios = require('axios');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const { createPostRequest } = require('./utils')

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
        const config = createPostRequest({
            "collection": "teamMembers",
            "database": "para",
            "dataSource": "AtlasCluster"
        });

        const response = await axios(config);
        res.send(response.data.documents);
    } catch (err) {
        console.log(err);
        res.send("An error occurred while getting teamMembers");
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));