import http from 'http'
import {Transform} from "node:stream"

class InverseNumber extends Transform {
    _transform(chunk, encolding, callback) {
        const transformed = Number(chunk.toString()) * - 1

        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer( async(request, response) => {
    const buffers = []

    for await(const chunk of request) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return response.end(fullStreamContent   )


    // return request
    // .pipe(new InverseNumber)
    // .pipe(response)
})

server.listen(3334)