export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JustARandomWebApp API',
      version: '2.0.0',
      description: 'API documentation for JustARandomWebApp',
      contact: {
        name: 'API Support',
        email: 'support@justarandomwebapp.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server'
      },
      {
        url: 'https://api.justarandomwebapp.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

