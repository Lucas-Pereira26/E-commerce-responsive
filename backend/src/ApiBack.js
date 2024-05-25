import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import btoa from 'btoa';
import cors from 'cors'; // Importe o middleware CORS
import { fileURLToPath } from 'url';
import { dirname } from 'path';  



//import jwt from 'jsonwebtoken'; // Importe o módulo jsonwebtoken



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));
app.use(cors());

let loginUser = false;
//Rota para buscar usúarios 
app.get('/get-user', async (req, res) => {

    try {
        const userId = req.query.userId;
        console.log('teste user Id:', userId)

        const getUserResponse = await axios.get(
            'https://dev57586.service-now.com/api/now/table/x_820501_departa_0_users',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('admin' + ':' + '@Black2309'),
                },
            }
        );

        if (getUserResponse.status === 200) {
            const userGetData = getUserResponse.data.result;


            loginUser = true
            // Verifica se existe um usuário com o nome e senha fornecidos
            const userGet = userGetData.find(user =>
                user.sys_id === userId
            );

            if (userGet) {
                const dadosUser = {
                    user: userGet.name,
                    email: userGet.email
                }
                console.log('Recebendo solicitação de usúario:', dadosUser);
                // Salva dados no localStorage

                res.json({ message: 'Autenticação bem-sucedida', userGet });

            } else {

                console.log(' Dados do usuario estão invalidos');
                res.json({ message: 'usuario com dados invalidos', userGet });


            }


        } else {
            res.status(500).json({ error: 'Erro ao obter na consulta da Api' });
            console.log('Erro ao obter na consulta da Api');
        }
    } catch (error) {
        console.error(
            'Erro ao processar a consulta dos registros de usúarios:',
            error.response ? error.response.data : error.message
        );

        res.status(500).json({ error: 'Erro ao processar a consulta' });
    }

})



app.put('/update-user', async (req, res) => {
    try {
        const { userId, name, email, password, imageBase64 } = req.body;
console.log(req.body)
        const updateUserResponse = await axios.put(
            `https://dev57586.service-now.com/api/now/table/x_820501_departa_0_users/${userId}`,
            {
                name: name,
                email: email,
                password_user: password,
                url_avatar: imageBase64
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('admin' + ':' + '@Black2309'),
                },
            }
        );

        if (updateUserResponse.status === 200) {
            console.log('Usuário atualizado com sucesso:', updateUserResponse.data);

            res.json({ message: 'Usuário atualizado com sucesso' });
        } else {
            console.error('Erro ao atualizar usuário');
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    } catch (error) {
        console.error('Erro ao processar a solicitação de atualização de usuário:', error.message);
        res.status(500).json({ error: 'Erro ao processar a solicitação de atualização de usuário' });
    }
});



// Rota para criar um usuário
app.post('/create-user', async (req, res) => {
    try {
        const { name, email, password_user } = req.body;

        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('admin' + ':' + '@Black2309'),
            },
        };

        const newUserData = {
            name,
            email,
            password_user,
        };

        const response = await axios.post(
            'https://dev57586.service-now.com/api/now/table/x_820501_departa_0_users',
            newUserData,
            header
        );

        if (response.status === 201) {

            console.log('Usuário criado com sucesso');

            res.json({ message: 'Usuário criado com sucesso' });

        } else {
            res.status(500).json({ error: 'Erro ao criar usuário' });

            console.log('Erro ao criar usuário');
        }
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message);

        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});



// Rota para tratar o envio do formulário de login
app.post('/Loginstore', async (req, res) => {
    try {
        const { email, password_user } = req.body;
        console.log('Recebendo solicitação de login:', req.body);
        // Consulta GET na sua tabela para obter os dados dos usuários
        const getDataResponse = await axios.get(
            'https://dev57586.service-now.com/api/now/table/x_820501_departa_0_users',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('admin' + ':' + '@Black2309'),
                },
            }
        );

        if (getDataResponse.status === 200) {
            const userData = getDataResponse.data.result;

            loginUser = true
            // Verifica se existe um usuário com o nome e senha fornecidos
            const userFound = userData.find(user =>
                user.email === email && user.password_user === password_user
            );

            if (userFound) {
                console.log('Recebendo solicitação de login:', userFound);
                // Salva dados no localStorage

                res.json({ message: 'Autenticação bem-sucedida', userFound });

            } else {

                console.log(' Dados do usuario estão invalidos');
                res.json({ message: 'usuario com dados invalidos', userFound });


            }
        } else {
            res.status(500).json({ error: 'Erro ao obter na consulta da Api' });
            console.log('Erro ao obter na consulta da Api');
        }
    } catch (error) {
        console.error(
            'Erro ao processar formulário de login:',
            error.response ? error.response.data : error.message
        );

        res.status(500).json({ error: 'Erro ao processar formulário de login' });
    }
});






////////////////////////// Solicatção de Tickes

// Rota para criar um tickes
app.post('/ticks', async (req, res) => {
    try {
        const ticketsData = req.body;
        console.log('Tick: ', req.body)
        const head = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('admin' + ':' + '@Black2309'),
            },
        };

        // const newticketData = {
        //     request,
        //     quantity,
        //     price
        // };

        const createdTickets = [];

        for (const ticketData of ticketsData) {
            const responseTicket = await axios.post(
                'https://dev57586.service-now.com/api/now/table/x_820501_departa_0_ticket',
                ticketData,
                head
            );

            if (responseTicket.status === 201) {
                // Acessar a propriedade 'name' do objeto 'request' na resposta
                const itemName = responseTicket.data.result.request;
                console.log('Nome do item:', itemName);

                createdTickets.push(responseTicket.data);
            } else {
                console.log('Erro ao criar Ticket:', responseTicket.status);
                res.status(500).json({ error: 'Erro ao criar Tickets' });
                return;
            }
        }

        console.log('Tickets criados com sucesso', createdTickets);
        res.json({ message: 'Tickets criados com sucesso', createdTickets });
    } catch (error) {
        console.error('Erro ao criar Ticket:', error.message);

        res.status(500).json({ error: 'Erro ao criar Ticket' });
    }
});

export default app;
