import app from "./src/ApiBack.js"

const port = 5000
app.listen(port, () =>{
    console.log(`Servidor está rodando no endereço http://localhost:${port}`)
})