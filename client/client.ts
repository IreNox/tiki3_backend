﻿import express = require('express');

var app = express();
app.use('/', express.static('.'));

app.listen(80, "www.tiki.local");
