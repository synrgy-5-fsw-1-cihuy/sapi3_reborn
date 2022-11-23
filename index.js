const express = require('express');
const postRouter = require('./router/post.router.js');
const carRouter = require('./router/car.router.js');
const userRouter = require('./router/user.router.js');

const PORT = 8001 || process.env.PORT;
const app = express();

// Set view engine EJS
app.set('view engine', 'ejs');

// Routing include
app.use(postRouter);
app.use(carRouter);
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Application running at localhost:${PORT}`);
});
