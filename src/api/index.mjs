import express, { response } from 'express'
import { getUser } from '../Services/GetUser.mjs'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/enrollments', async (req, res) => {
    try{
        const enrollments = await getUser();
        res.status(200).send(enrollments)
    }catch(error){
        res.status(500).send({error: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})