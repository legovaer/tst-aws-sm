const express = require('express');
const pomClient = require('prom-client');
const collectDefaultMetrics = pomClient.collectDefaultMetrics;
const register = pomClient.register;

collectDefaultMetrics();

const app = express();

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(4001, '0.0.0.0');
