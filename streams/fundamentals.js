// Readable Streams = Leitura de dados / Writable Streams = Escrita de dados

// process.stdin.pipe(process.stdout)

import {Readable, Writable, Transform} from 'node:stream'


// Stream de leitura
class OneToHundredStream extends Readable {

    index = 1;
    _read() {
        const i = this.index++;

       setTimeout(() => {
        if(i > 5) {
            this.push(null)
        } else {

            const buf = Buffer.from(String(i))
            this.push(buf)
        }
       }, 1000  )
    }
}

class InverseNumber extends Transform {
    _transform(chunk, encolding, callback) {
        const transformed = Number(chunk.toString()) * - 1
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encolding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumber)
    .pipe(new MultiplyByTenStream)