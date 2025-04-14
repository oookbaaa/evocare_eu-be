const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const setupSwagger = (app) => {
  // Load Swagger documentation
  const commonDocs = YAML.load("./app/common/docs.yaml");
  app.use(
    "/docs/common",
    (req, res, next) => {
      req.swaggerDoc = commonDocs;
      next();
    },
    swaggerUi.serve,
    swaggerUi.setup()
  )
};

module.exports = { setupSwagger };
