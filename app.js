import http from 'http';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import calculatorRoutes from './routers/calculatorRoutes.js';

const swaggerDocument = YAML.load('./swagger.yaml');
const HOSTNAME = '0.0.0.0';
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

app.use('/api-docs', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});
app.use('/mortgage', calculatorRoutes);

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});