const express = require('express');
const path = require('path');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
// app.use(routes);
app.get('/',function(req,res){ 
    res.sendFile(path.join(__dirname+'/index.html')); 
}); 

// listen in
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
