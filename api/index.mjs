import express, { response } from 'express'
import { getUser } from '../services/GetUser.mjs'
import { addUSer } from '../services/addUser.mjs'
import { logInUser } from '../services/loginUser.mjs'
import { productDetails } from '../services/getProduct.mjs'
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello WSSSADA')
})

app.get('/api/getProduct/', async (req, res) => {
  try{
    const product = await productDetails();
    res.status(200).send(product)
  }catch(error){
    res.status(500).send({error: error.message})
  }
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

app.get('/api/enrollments1', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1]

  if (!token) return res.status(401).send({ error: 'No token provided' })

  try {
    const enrollments = await getUser(token)
    res.status(200).send(enrollments)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})


app.post('/api/addUser', async(req, res) => {
    const {email, password, full_name, role} = req.body

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
  const { email, password } = req.body
  if (!email || !password) 
    return res.status(400).send({ error: 'Email and password required' })

  try {
    const { session, profile } = await logInUser(email, password)
    res.status(200).send({
      message: 'Login successful',
      session: {
        access_token: session.access_token,
        expires_in: session.expires_in,
        refresh_token: session.refresh_token,
      },
      user: {
        id: session.user.id,
        email: session.user.email,
        full_name: profile.full_name,
        role: profile.role
      }
    })
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})


app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})

