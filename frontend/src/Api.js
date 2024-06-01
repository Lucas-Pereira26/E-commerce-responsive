import axios from 'axios'

export default axios.create({
    baseURL: `http://localhost:5000/`
})
//deu certo chat, agora eu não quero mais salvar no localStorage, quero que venha da api  