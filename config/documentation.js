const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

const setupSwagger = (app) => {
  try {
    // Track all loaded docs for the combined docs
    const allDocs = [];

    // Add documentation index page
    app.get('/docs', (req, res) => {
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Evocare API Documentation</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            text-align: center;
            color: #333;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .modules {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
          }
          .module {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .module:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .module h2 {
            margin-top: 0;
            color: #0366d6;
          }
          .module a {
            display: inline-block;
            background-color: #0366d6;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 10px;
            font-size: 14px;
            transition: background-color 0.2s;
          }
          .module a:hover {
            background-color: #0255b3;
          }
          .combined {
            margin-top: 30px;
            text-align: center;
          }
          .combined a {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.2s;
          }
          .combined a:hover {
            background-color: #218838;
          }
        </style>
      </head>
      <body>
        <h1>Evocare API Documentation</h1>
        
        <div class="combined">
          <a href="/docs/all-docs">View Combined API Documentation</a>
        </div>
        
        <div class="modules">
          <div class="module">
            <h2>Common</h2>
            <a href="/docs/common">View Docs</a>
          </div>
          <div class="module">
            <h2>Media</h2>
            <a href="/docs/media">View Docs</a>
          </div>
          <div class="module">
            <h2>Contents</h2>
            <a href="/docs/contents">View Docs</a>
          </div>
          <div class="module">
            <h2>Products</h2>
            <a href="/docs/products">View Docs</a>
          </div>
          <div class="module">
            <h2>Solutions</h2>
            <a href="/docs/solutions">View Docs</a>
          </div>
          <div class="module">
            <h2>Teams</h2>
            <a href="/docs/teams">View Docs</a>
          </div>
          <div class="module">
            <h2>Partners</h2>
            <a href="/docs/partners">View Docs</a>
          </div>
          <div class="module">
            <h2>References</h2>
            <a href="/docs/references">View Docs</a>
          </div>
          <div class="module">
            <h2>Events</h2>
            <a href="/docs/events">View Docs</a>
          </div>
          <div class="module">
            <h2>Services</h2>
            <a href="/docs/services">View Docs</a>
          </div>
          <div class="module">
            <h2>News</h2>
            <a href="/docs/news">View Docs</a>
          </div>
        </div>
      </body>
      </html>
      `;
      res.send(html);
    });

    // Helper function to safely load YAML files
    const safeLoadYaml = (filePath, moduleName) => {
      try {
        // First check if file exists
        if (!fs.existsSync(filePath)) {
          console.warn(
            `Warning: ${moduleName} docs file not found at ${filePath}`
          );
          return null;
        }

        const doc = YAML.load(filePath);
        if (!doc) {
          console.warn(
            `Warning: ${moduleName} docs file loaded as null or undefined`
          );
          return null;
        }
        return doc;
      } catch (error) {
        console.error(`Error loading ${moduleName} docs:`, error);
        return null;
      }
    };

    // Define module docs array with paths and names
    const modules = [
      { path: './app/common/docs.yaml', name: 'common', route: '/docs/common' },
      { path: './app/media/docs.yaml', name: 'media', route: '/docs/media' },
      {
        path: './app/contents/docs.yaml',
        name: 'contents',
        route: '/docs/contents',
      },
      {
        path: './app/products/docs.yaml',
        name: 'products',
        route: '/docs/products',
      },
      {
        path: './app/solutions/docs.yaml',
        name: 'solutions',
        route: '/docs/solutions',
      },
      { path: './app/teams/docs.yaml', name: 'teams', route: '/docs/teams' },
      {
        path: './app/partners/docs.yaml',
        name: 'partners',
        route: '/docs/partners',
      },
      {
        path: './app/references/docs.yaml',
        name: 'references',
        route: '/docs/references',
      },
      { path: './app/events/docs.yaml', name: 'events', route: '/docs/events' },
      {
        path: './app/services/docs.yaml',
        name: 'services',
        route: '/docs/services',
      },
      { path: './app/news/docs.yaml', name: 'news', route: '/docs/news' },
    ];

    // Load all module docs
    modules.forEach((module) => {
      try {
        const docs = safeLoadYaml(module.path, module.name);
        if (docs) {
          allDocs.push(docs);
          app.use(
            module.route,
            (req, res, next) => {
              req.swaggerDoc = docs;
              next();
            },
            swaggerUi.serve,
            swaggerUi.setup()
          );
        } else {
          // Create a minimal fallback for routes with missing docs
          app.use(module.route, (req, res) => {
            res.send(
              `<html><body><h1>${module.name} Documentation</h1><p>Documentation is not available. The YAML file could not be loaded.</p><a href="/docs">Back to documentation index</a></body></html>`
            );
          });
        }
      } catch (error) {
        console.error(`Error setting up ${module.name} documentation:`, error);
        // Create error fallback
        app.use(module.route, (req, res) => {
          res
            .status(500)
            .send(
              `<html><body><h1>Error: ${module.name} Documentation</h1><p>An error occurred loading this documentation module.</p><a href="/docs">Back to documentation index</a></body></html>`
            );
        });
      }
    });

    // Create combined documentation
    const combinedDocs = {
      openapi: '3.0.0',
      info: {
        title: 'Evocare API Documentation',
        description:
          'Combined API documentation for all endpoints in the Evocare API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3015',
          description: 'Local development server',
        },
      ],
      paths: {},
      components: {
        schemas: {},
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    };

    // Combine paths from all docs - with additional error handling
    if (allDocs.length > 0) {
      allDocs.forEach((doc) => {
        // Skip null/undefined docs
        if (!doc) return;

        // Add paths
        if (doc.paths) {
          Object.keys(doc.paths).forEach((path) => {
            try {
              // Add a module-specific prefix to avoid path conflicts
              const moduleName = path.startsWith('/') ? path : `/${path}`;
              combinedDocs.paths[moduleName] = doc.paths[path];
            } catch (error) {
              console.error(`Error processing path ${path}:`, error);
            }
          });
        }

        // Add schemas
        if (doc.components && doc.components.schemas) {
          Object.keys(doc.components.schemas).forEach((schema) => {
            try {
              if (!combinedDocs.components.schemas[schema]) {
                combinedDocs.components.schemas[schema] =
                  doc.components.schemas[schema];
              }
            } catch (error) {
              console.error(`Error processing schema ${schema}:`, error);
            }
          });
        }
      });

      // DO NOT write to file - this is what's causing the nodemon restart loop
      // Just keep the combined docs in memory

      // Serve the combined docs
      try {
        app.use(
          '/docs/all-docs',
          (req, res, next) => {
            req.swaggerDoc = combinedDocs;
            next();
          },
          swaggerUi.serve,
          swaggerUi.setup(undefined, {
            explorer: true,
            docExpansion: 'list',
          })
        );
      } catch (error) {
        console.error('Error setting up combined documentation:', error);
        app.use('/docs/all-docs', (req, res) => {
          res
            .status(500)
            .send(
              `<html><body><h1>Error: Combined Documentation</h1><p>An error occurred setting up the combined documentation view.</p><a href="/docs">Back to documentation index</a></body></html>`
            );
        });
      }
    } else {
      // Handle case where no docs were loaded successfully
      app.use('/docs/all-docs', (req, res) => {
        res.send(
          `<html><body><h1>Combined Documentation</h1><p>No valid documentation modules could be loaded. Please check the console for errors.</p><a href="/docs">Back to documentation index</a></body></html>`
        );
      });
    }
  } catch (error) {
    console.error('Error in documentation setup:', error);
    // Add a fallback route for all documentation routes
    app.use('/docs/*', (req, res) => {
      res
        .status(500)
        .send(
          `<html><body><h1>Documentation Error</h1><p>An error occurred in the documentation system. Please check the server logs.</p></body></html>`
        );
    });
  }
};

module.exports = { setupSwagger };
