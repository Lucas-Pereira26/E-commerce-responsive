
import axios from 'axios';
import btoa from 'btoa';

export const userLogin = async (req, res) => {
    const username = 'user.integration';
    const password = 'Dev.#@2024';
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);
try {
    const { email, password_user } = req.body;
    console.log('Recebendo solicitação de login:', req.body);
    // Consulta GET na sua tabela para obter os dados dos usuários
    const getDataResponse = await axios.get(
        'https://dev57586.service-now.com/api/now/table/x_820501_departa_0_users',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
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
}