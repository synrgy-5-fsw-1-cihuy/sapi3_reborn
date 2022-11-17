const express = require('express');
const formidableMiddleware = require('formidable');

const authToken = require('./middleware/auth_token');
const cloudinaryConfig = require('./config/cloudinary');
const postRouter = require('./router/post.router.js');
const carRouter = require('./router/car.router.js');

const PORT = 8001 || process.env.PORT;
const app = express();
// Parser 
// app.use(express.json());

// Set view engine EJS
app.set('view engine', 'ejs');

// Routing include
app.use(postRouter);
app.use(carRouter);

const users = [
    {name: "Roni", city: "Jakarta"},
    {name: "Joo", city: "Balikpanan"}
];

app.get('/', (request, response) => {
    // response.json({message: 'Index page'});
    response.render('index', {
        name: request.query.name
    });
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

app.post('/upload', (request, response) => {
    const form = formidableMiddleware({ });
    let uploadedFiles = '';

    form.parse(request, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        
        console.log(files.files.filepath);
        console.log(fields.name);
        
        
        cloudinaryConfig.uploader.upload(files.files.filepath, function(err, result) {
            if (err) {
                next(err);
                return;
            }

            uploadedFiles = result.secure_url;
            console.log(result);
            response.json({message: "uploaded success", body: result.secure_url});
        })

    });

    // response.json({
    //     message: "File uploaded successfully",
    //     uploaded_file: request.files
    // })
});


app.listen(PORT, () => {
    console.log(`Application running at localhost:${PORT}`);
});


// Study case TS
// Konversi routing dari javascript biasa menjadi TS
// Pisahkan routingnya