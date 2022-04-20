import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import employeeRoutes from './routes/employees.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8181


app.use(cors());
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));

app.use('/employee/details/', employeeRoutes);

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Omnipresent Test',
            description: 'The Employee Record App',
            contact: {
                name: 'Oyedamola'
            },
            servers: ['http://localhost:8181']
        }
    },

    // 
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen( PORT,  console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`) )


export default app; 