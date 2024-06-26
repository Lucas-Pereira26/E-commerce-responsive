import axios from 'axios';

export const updatedUser = async (req, res) => {
    const username = 'user.integration';
    const password = 'Dev.#@2024';
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);
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
                    'Authorization': `Basic ${encodedCredentials}`,
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
}
