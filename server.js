import express, { Router } from "express";
import { db } from "./database/sqlite.js";

const app = express();
const router = Router();

router.get('/user', (req, res)=>{

    db.all('SELECT * FROM user', [], (err, rows)=>{

        if(err){
            return res.status(404).send('Users not found')
        }

        res.send(JSON.stringify(rows))
    })

})

router.get('/user/:id', (req, res)=>{
    const id = req.params.id

    db.get('SELECT * FROM user WHERE id = ?', [id], (err, row)=>{

        if(err){
            return res.status(404).send('User not found')
        }

        res.send(JSON.stringify(row))
    })

    // res.send("Käyttäjän tiedot id:llä: " + id)
})

router.post('/user', (req, res)=>{
    res.status(201).send('Käyttäjä luotu onnistuneesti')
})

router.put('/user', (req, res)=>{
    res.send('Käyttäjä päivitetty onnistuneesti')
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