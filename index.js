const express = require('express');
const PORT = 8001 || process.env.PORT;

const app = express();

const users = [
    {name: "Roni", city: "Jakarta"},
    {name: "Joo", city: "Balikpanan"}
];

app.get('/', (request, response) => {
    response.json({message: 'Index page'});
});

app.get('/api/users', (request, response) => {
    response.json({message: users});
});

app.post('/api/users', (request, response) => {
    response.json({message: "Create user"});
});

app.put('/api/users/:id', (request, response) => {
    response.json({message: "Create user"});
});

app.delete('/api/users/:id', (request, response) => {
    response.json({message: "Create user"});
});


app.listen(PORT, () => {
    console.log(`Application running at localhost:${PORT}`);
});