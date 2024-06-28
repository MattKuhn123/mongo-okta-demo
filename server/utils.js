const https = require('https');

exports.createPostRequest = (data) => {
    const config = {
        method: 'post',
        url: `${process.env.DATAAPI_URL}/action/find`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': `${process.env.APIKEY}`,
        },
        data: data,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    };

    return config;
}