import axios from 'axios';
import btoa from 'btoa';

export const createUser = async (req, res) => {
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
            console.log('Erro ao criar usuário');
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};
