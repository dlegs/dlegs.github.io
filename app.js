const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(request, response){
    response.sendFile('/Users/mikkijanower/Documents/hello/index.html');
});

app.listen(port, () => {
    console.log('I see u i hear u i stand with u xoxo ${port}');
});