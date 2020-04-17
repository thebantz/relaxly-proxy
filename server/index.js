require('newrelic');
const express = require('express')
const app = express()
const port = 3002;
const path = require('path');
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(express.static(__dirname + '/../dist'));

// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
// })

// for the reviews module
app.all('/listings/*', (req, res) => {
    proxy.web(req, res, {
        target: "http://52.53.210.210/"
    });
});

// app.get('/listings/*', (req, res) => {
//     proxy.web(req, res, {
//         target: "http://52.53.210.210/",
//     });
// });

// related homes module
// app.all('/relatedProperties/*', (req, res) => {
//     proxy.web(req, res, {
//         target: "http://ec2-18-144-29-67.us-west-1.compute.amazonaws.com/"
//     });
// });

// app.get('/relatedProperties/:location', (req, res) => {
//     proxy.web(req, res, {
//         target: `http://ec2-18-144-29-67.us-west-1.compute.amazonaws.com/`,
//     })
// });

// reservations module
// waiting for Dennis to reopen his instances:



app.listen(port, () => console.log(`Proxy server listening on port ${port}!`))