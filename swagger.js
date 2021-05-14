const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

exports.swagger = (app) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Flavprs API with Swagger",
                version: "0.1.0",
                description:
                    "This is a simple CRUD API application made with Express and documented with Swagger",
                /* license: {
                     name: "MIT",
                     url: "https://spdx.org/licenses/MIT.html",
                 },
                 contact: {
                     name: "LogRocket",
                     url: "https://logrocket.com",
                     email: "info@email.com",
                 },*/
            },
            servers: [
                {
                    url: "https://votingback.herokuapp.com/",
                    //url: "http://localhost:7816",
                },
            ],
        },
        apis: ['./swagger_api/*.js'],
    };

    const specs = swaggerJsdoc(options);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));


}
