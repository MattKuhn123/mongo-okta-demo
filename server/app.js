require('dotenv').config();
const express = require('express')
const https = require('https');
const axios = require('axios');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');

const port = 3000;
const app = express();
const agent = new https.Agent({
    rejectUnauthorized: false
});

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  jwksUri: process.env.JWKSURI,
  agent: agent,
});

app.use(cors());

app.get('/', checkJwt, async (req, res) => {
    try {
        const data = JSON.stringify({
            "collection": "teamMembers",
            "database": "para",
            "dataSource": "AtlasCluster"
        });

        const config = {
            method: 'post',
            url: `${process.env.DATAAPI_URL}/action/find`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${process.env.APIKEY}`,
            },
            data: data,
            httpsAgent: agent
        };

        const response = await axios(config);
        res.send(JSON.stringify(response.data.documents));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});