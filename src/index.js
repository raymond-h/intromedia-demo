import path from 'path';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();

app.set('env', 'development');
app.set('views', './lib/views');
app.set('view engine', 'js');

app.engine('js', function(filePath, opts, cb) {
    const Component = require(filePath);

    cb(null, ReactDOMServer.renderToString(<Component {...opts} />));
});

app.use(express.static( path.join(__dirname, '../public') ));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080);
