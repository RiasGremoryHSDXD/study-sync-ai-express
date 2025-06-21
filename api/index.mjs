import express, { response } from 'express'
import { getUser } from '../services/GetUser.mjs'
import { addUSer } from '../services/addUser.mjs'
import { logInUser } from '../services/loginUser.mjs'

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello WSSSADA')
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

app.post('/api/addUser', async(req, res) => {
    const {email, password, full_name, role} = req.body

    console.log("9_TAILS")
    console.log(email)
    console.log(password)
    console.log(full_name)
    console.log(role)
    console.log("8_TAILS")

    if(!email || !password){
        return res.status(400).send({error: 'Email and password are required'})
    }

    try{
        const user = await addUSer(email, password, full_name, role)
        res.status(201).send({message: 'User created successfully', user})
    }catch(error){
        res.status(500).send({error: error.message})
    }
})

app.post('/api/login', async (req, res) => {

    const {email, password, full_name, role} = req.body

    console.log("NARUTO")
    console.log(email)
    console.log(password)
    console.log(full_name)
    console.log(role)
    console.log("UZUMAKI")

    if(!email || !password) return res.status(400).send({error: "Email and password are required"})
    
    try {
        
        const session = await logInUser(email, password, full_name, role)
        res.status(200).send({
            message: 'Login successfully',
            session
        })
    } catch (error) {
        res.status(401).send({error: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})

