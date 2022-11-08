const express = require('express');
const authToken = require('./middleware/auth_token');
const PORT = 8001 || process.env.PORT;
const app = express();

// Parser 
app.use(express.json());

// Set view engine EJS
app.set('view engine', 'ejs');

const users = [
    {name: "Roni", city: "Jakarta"},
    {name: "Joo", city: "Balikpanan"}
];

app.get('/', (request, response) => {
    // response.json({message: 'Index page'});
    response.render('index', {
        name: request.query.name
    })
});

app.get('/api/users', authToken, (request, response) => {
    response.json({message: users});
});

// /:id => Path parameter
// ?id=&name= => Query parameter
// request.body
app.get('/api/users/:id', (request, response) => {
    response.json({message: users});
});

app.post('/api/users', (request, response) => {
    response.json({
        message: "Create user",
        body: request.body
    });
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


// Study case
// Custom middleware
// Role Admin => GET POST PUT DELETE
// Role User => GET
// Header name => mRole
// Sampe jam 9.55 WIB