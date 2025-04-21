import http, { get } from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './extract-query-params.js';



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

// Query Parameters === URL Stateful => usadas em (Filtros, paginação)
    //http://localhost:3333/users?userId==1&name=Wilson

// Route Parameters = identificação de recurso/rota
    //GET http://localhost:3333/users/1
    //DELETE http://localhost:3333/users/1

// Request Body = Envio de informação de um formulário (HTTPs)
    // {"name": "wilson", "password": "123"}


const server = http.createServer(async (request, response) =>{
    const { method, url } = request

    await json(request, response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        
        const routeParams = request.url.match(route.path)
        
        const {query, ...params} = routeParams.groups

        
        request.params = params
        request.query = query ? extractQueryParams(query) : {}
         
        return route.handler(request,response)
    }

    return response.writeHead(404).end()
})

server.listen(3333)

// CommonJs => require (Não muito usado atualmente)
// EsModules => import/export (Muito usado atualmente e precisa declarar tipo no packeage.json)