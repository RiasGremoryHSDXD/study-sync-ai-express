import express, { response } from 'express'
import { getUser } from './Services/GetUser.mjs'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/enrollments', async (resquest, response) => {
    try
    {
        const enrollments = await getUser();
        response.status(200).send(enrollments)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})