const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 1337;


const app = express();



//parsing ------------------------//

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//end of parsin------------------//


//statics ----------------------//

app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openai_routes'));

app.listen(port, () => console.log('Server started on port ' + port ));

//end of statics------------------//