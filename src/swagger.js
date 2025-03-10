const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/index.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
