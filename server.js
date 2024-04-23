import express, { Router } from "express";

const app = express();
const router = Router();

router.get('/user', (req, res)=>{
    res.send('Kaikki käyttäjät haettu, count: 1234, page: 1, limit: 20')
})

router.get('/user/:id', (req, res)=>{
    const id = req.params.id
    res.send("Käyttäjän tiedot id:llä: " + id)
})

router.post('/user', (req, res)=>{
    res.status(201).send('Käyttäjä luotu onnistuneesti')
})

router.put('/user', (req, res)=>{
    res.send('Käyttäjä päivitetty')
})

router.patch('/user', (req, res)=>{
    res.send('Käyttäjän ikä päivitetty onnistuneesti')
})

router.delete('/user', (req, res)=>{
    res.send('Käyttäjätili poistettu onnistuneesti')
})

app.use('/api/v1', router)

app.use(express.static('public'))

app.listen(3000, ()=>{
    console.log('HTTP Server is running on port http://localhost:3000')
})