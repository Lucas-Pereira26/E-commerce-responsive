import axios from "axios";
import btoa from "btoa";
export const getUser = async (req, res) => {
    const username = 'user.integration';
    const password = 'Dev.#@2024';
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);
    try {
        const userId = req.query.userId;
        console.log("teste user Id:", userId);

        const getUserResponse = await axios.get(
            "https://dev57586.service-now.com/api/now/table/x_820501_departa_0_users",
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Basic ${encodedCredentials}`,
                },
            }
        );

        if (getUserResponse.status === 200) {
            const userGetData = getUserResponse.data.result;

            loginUser = true;
            // Verifica se existe um usuário com o nome e senha fornecidos
            const userGet = userGetData.find((user) => user.sys_id === userId);

            if (userGet) {
                const dadosUser = {
                    user: userGet.name,
                    email: userGet.email,
                };
                console.log("Recebendo solicitação de usúario:", dadosUser);
                // Salva dados no localStorage

                res.json({ message: "Autenticação bem-sucedida", userGet });
            } else {
                console.log(" Dados do usuario estão invalidos");
                res.json({ message: "usuario com dados invalidos", userGet });
            }
        } else {
            res.status(500).json({ error: "Erro ao obter na consulta da Api" });
            console.log("Erro ao obter na consulta da Api");
        }
    } catch (error) {
        console.error(
            "Erro ao processar a consulta dos registros de usúarios:",
            error.response ? error.response.data : error.message
        );

        res.status(500).json({ error: "Erro ao processar a consulta" });
    }
};
