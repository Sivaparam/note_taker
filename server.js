const express = require('express');
const { url } = require('inspector');
const path = require('path');
const app = express();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false }));



const PORT =process.env.PORT || 3001;

app.listen(PORT, () =>
console.log(`App listening on server ${PORT}`)
);