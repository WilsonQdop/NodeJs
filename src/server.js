import http, { get } from 'node:http'

import { json } from './middlewares/json.js';


//request = obter todas as informações da requisição.
//response = devolver as informações para quem chamou a requisição.

/* - Http 
    - Método Http
    - URL
*/

// GET, POST, PUT, PATCH, DELETE

// GET = buscar informações no backend
// POST = Criar uma informação no backend
// PUT = Editar ou atualizar informações no backend
// PATCH = Atualizar uma informação única/especifica do backend
// DELETE = Deletar uma informação do backend

// Stateful (Guardar as informações em memória) - Stateless (Guardar as informações em banco de dados)

//JSON = JavaScript Object Notation (Transitar dados de variados tipos (Arrays, Boleanos ou object) e transformar em Strings)

//Http Status Code 

const users = [];


const server = http.createServer(async (request, response) =>{
    const { method, url } = request

    await json(request, response)

    if (method === 'GET' && url === '/users') {
        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method === 'POST' && url === '/users') {
        const{name, email,senha} = request.body

        users.push({
            id:1,
            name,
            email, 
            senha,
        })
        return response.writeHead(201).end()
    }

    return response.writeHead(404).end()
})

server.listen(3333)

// CommonJs => require (Não muito usado atualmente)
// EsModules => import/export (Muito usado atualmente e precisa declarar tipo no packeage.json)