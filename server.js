var express    = require('express'); 

var app        = express();

var port = process.env.PORT || 8080;

var router = require('./app/routes/sitefRouter.js')

// all of our routes will be prefixed with /api
app.use('/api/sitef', router);

// =============================================================================
app.listen(port);

console.log('Magic happens on port ' + port);