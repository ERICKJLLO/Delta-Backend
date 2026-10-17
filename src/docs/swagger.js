
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Delta Backend API',
      version: '1.0.0',
      description:
        'Documentación de la API de Delta para autenticación, consulta del usuario y asistencia de Delta AI.',
    },
    servers: [
      {
        url: '/',
        description: 'Servidor actual',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce el token JWT obtenido al iniciar sesión.',
        },
      },
    },
    
    tags: [
    { name: 'Health', description: 'Estado de la API' },
    { name: 'Autenticación', description: 'Registro y acceso de usuarios' },
    { name: 'Delta AI', description: 'Procesamiento de mensajes' },
    ],
    paths: {
    '/api/health': {
        get: {
        tags: ['Health'],
        summary: 'Comprobar el estado de la API',
        responses: {
            '200': {
            description: 'API funcionando correctamente',
            },
        },
        },
    },
    '/api/auth/register': {
        post: {
        tags: ['Autenticación'],
        summary: 'Registrar una empresa y su usuario',
        requestBody: {
            required: true,
            content: {
            'application/json': {
                schema: {
                type: 'object',
                required: [
                    'email',
                    'password',
                    'company_name',
                    'nit',
                    'contact_name',
                ],
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', format: 'password' },
                    company_name: { type: 'string' },
                    nit: { type: 'string' },
                    contact_name: { type: 'string' },
                    phone: { type: 'string' },
                    address: { type: 'string' },
                    industry: { type: 'string' },
                    employees: { type: 'integer' },
                    plan_id: { type: 'integer' },
                },
                },
            },
            },
        },
        responses: {
            '201': { description: 'Usuario registrado' },
            '400': { description: 'Datos inválidos o incompletos' },
            '500': { description: 'Error interno del servidor' },
        },
        },
    },
    '/api/auth/login': {
        post: {
        tags: ['Autenticación'],
        summary: 'Iniciar sesión',
        requestBody: {
            required: true,
            content: {
            'application/json': {
                schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', format: 'password' },
                },
                },
            },
            },
        },
        responses: {
            '200': { description: 'Inicio de sesión exitoso' },
            '400': { description: 'Datos inválidos o incompletos' },
            '401': { description: 'Credenciales incorrectas' },
            '500': { description: 'Error interno del servidor' },
        },
        },
    },
    '/api/auth/me': {
        get: {
        tags: ['Autenticación'],
        summary: 'Consultar el usuario autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
            '200': { description: 'Información del usuario' },
            '401': { description: 'Token ausente o inválido' },
        },
        },
    },
    '/api/ai/chat': {
        post: {
        tags: ['Delta AI'],
        summary: 'Enviar un mensaje a Delta AI',
        requestBody: {
            required: true,
            content: {
            'application/json': {
                schema: {
                type: 'object',
                required: ['message'],
                properties: {
                    message: { type: 'string' },
                    plan: {},
                    transactions: { type: 'array', items: {} },
                    context: {},
                },
                },
            },
            },
        },
        responses: {
            '200': { description: 'Respuesta generada por Delta AI' },
            '400': { description: 'Mensaje inválido' },
            '500': { description: 'Error interno del servidor' },
        },
        },
    },
    },

  },
  apis: ['./src/server.js', './src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
