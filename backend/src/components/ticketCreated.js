
import axios from 'axios';
import btoa from 'btoa';

export const createdTickets = async (req, res) => {
    const username = 'user.integration';
    const password = 'Dev.#@2024';
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);
try {
    const ticketsData = req.body;
    console.log('Tick: ', req.body)
    const head = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`,
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

}