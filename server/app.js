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
app.use(express.json()) 

app.get('/teamMembers', checkJwt, async (req, res) => {
    try {
        await client.connect();
        const db = client.db("para");
        const collection = db.collection('teamMembers');
        const response = await collection.find({}).toArray();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send("An error occurred while getting teamMembers");
    } finally {
        await client.close();
    }
});

app.post('/login-redirect-update-account', checkJwt, async (req, res) => {
    try {
        console.log('/login-redirect-update-account');
        console.log(req.body);
        await client.connect();
        const db = client.db("para");
        const collection = db.collection('teamMembers');
        const alreadyInSystem = await collection.findOne({sub: req.body.sub});
        if (!alreadyInSystem) {
            await collection.insertOne(req.body);
        } else {
            await collection.updateOne({
                sub: req.body.sub
            }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
            });
        }

        const response = await collection.findOne({sub: req.body.sub});
        res.send({
            ...response,
            alreadyInSystem,
        });
    } catch (err) {
        console.log(err);
        res.send("An error occurred while upserting account");
    } finally {
        await client.close();
    }
});

app.post('/login-redirect-add-flight-pass', checkJwt, async (req, res) => {
    try {
        await client.connect();
        const db = client.db("para");
        const collection = db.collection('teamMembers');
        await collection.updateOne({
            sub: req.body.sub
        }, {
            $set: {
                flightPass: req.body.flightPass,
            }
        });
        res.send({});
    } catch (err) {
        console.log(err);
        res.send("An error occurred while adding flight pass");
    } finally {
        await client.close();
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));