import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes.js'; 
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));
app.use(cors());

app.use(router);

app.listen(port, () => {
    console.log(`Servidor está rodando no endereço http://localhost:${port}`);
});
