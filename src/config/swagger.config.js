import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mirach Community API',
      version: '1.0.0',
      description: 'Official REST API documentation for the Mirach Community platform.',
    },
    servers: [
      {
        url: 'http://127.0.0.1:8000/',
        description: 'Local server',
      },
      {
        url: 'https://mirachcommunity-api.vercel.app/',
        description: 'Staging server',
      },
    ],
  },
  apis: [path.join(process.cwd(), 'src/routes/*.js'), path.join(process.cwd(), 'src/app.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;