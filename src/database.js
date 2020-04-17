/*import MongoClient from 'mongodb'


export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb+srv://user:user@mvico-hbci6.azure.mongodb.net/test?retryWrites=true&w=majority', {
            useUnifiedTopology: true
        })
        const db = client.db('Proyecto')
        console.log('DB is connected')
        return db
    } catch(e) {
        console.log(e)
    }
}*/

import MongoClient from 'mongodb'


export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb+srv://admin:admin1007@cluster0-yzhtx.mongodb.net/test?retryWrites=true&w=majority', {
            useUnifiedTopology: true
        })
        const db = client.db('alejandroleonmunozpro')
        console.log('DB is connected')
        return db
    } catch(e) {
        console.log(e)
    }
}