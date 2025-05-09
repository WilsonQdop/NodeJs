import { randomUUID } from 'node:crypto';
import { Database } from './middlewares/database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (request, response) => {
            console.log(request.query)
            const users = database.select('users',{
                name: search,
                email: search,
            })
            return response.end(JSON.stringify(users))
        }
    },

    {
        method: 'POST',
        path: buildRoutePath('/users'),
       handler: (request, response) => {
            const{name, email,senha} = request.body

        const user = {
            id: randomUUID(),
            name,
            email, 
            senha,
        }

        database.insert('users', user)
        return response.writeHead(201).end()
        }

    },

    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const {id} = request.params
            const{name, email,senha} = request.body
            database.update('users', id, {
                name, email, senha,
            })

            return response.writeHead(201).end()
        }

    },

    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const {id} = request.params

            database.delete('users', id)
            return response.end()
        }

    }
]