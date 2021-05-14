require('dotenv').config();

let app = require('./index');
let port =  process.env.PORT || 7816;

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
