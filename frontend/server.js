const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self' 'unsafe-inline' http://localhost:9000 http://localhost:8080"]
  }
}));
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));
app.use(helmet.noCache());
app.use(helmet.referrerPolicy({policy: 'no-referrer'}));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
