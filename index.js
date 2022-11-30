const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const postRouter = require('./router/post.router.js');
const carRouter = require('./router/car.router.js');
const userRouter = require('./router/user.router.js');

const PORT = 8001 || process.env.PORT;
const app = express();

// Set view engine EJS
app.set('view engine', 'ejs');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Binar Synrgy Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Binar Synrgy",
          url: "https://binaracademy.com",
          email: "binaracademy.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8001/api/",
        },
      ],
    },
    apis: [
        "./router/post.router.js"
    ],
};
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Routing include
app.use(postRouter);
app.use(carRouter);
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Application running at localhost:${PORT}`);
});
