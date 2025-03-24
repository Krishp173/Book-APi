const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const bookRoutes = require('./routes/bookRoutes'); // Import routes

const app = express();
const port = 3000;

app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Books API',
            version: '1.0.0',
            description: 'A simple CRUD API for managing books',
        },
        servers: [{ url: `http://localhost:${port}` }],
    },
    apis: ['./routes/bookRoutes.js'],  // Correct file path here
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Write swagger.json to a file (optional)
fs.writeFileSync(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerDocs, null, 2));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve the static swagger.json file
app.get('/swagger.json', (req, res) => {
    res.json(swaggerDocs);
});

// Use book routes
app.use('/books', bookRoutes);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
