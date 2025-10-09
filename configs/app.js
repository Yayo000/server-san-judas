'Use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import 'dotenv/config';
import usersModels from '../src/users/user.model.js'
import authRoutes from '../src/auth/aut.routes.js'
import requestLimit from '../middlewares/request-limit.js'

const middlewares = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({etended: false}))
    app.use(cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']

    }));
    app.use(helmet({
        crossOriginResourcePolicy: {Policy: "cross-origin"},
        crossOriginEmbedderPolicy: false
    }));
    app.use(morgan('dev'));
    app.use(requestLimit)
}

const routes = (app) => {
    app.use('/api/auth', authRoutes)
}

const conectarDB = async () => {  
    try{
        await dbConnection();
    }catch(error){
        console.log(`Error al conectar la db: ${error.message}`)
    }    
    }


export const initServer = async () => {
    const app = express();
    

    try{
        middlewares(app)
        routes(app)    
        await conectarDB()
        app.listen(process.env.PORT, () =>{
            console.log(`Server running on port ${process.env.PORT}`)
        })
    }catch(error){
        console.log(`Error al iniciar el servidor: ${error.message}`);

    }
}
