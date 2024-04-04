import express, { Router } from "express";
import { db } from "./database/sqlite.js";
import { hash } from "bcrypt";

const app = express();

app.use(express.json())

const router = Router();
const saltRounds = 10

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

router.post('/user', async (req, res)=>{
    const {username, password, age} = req.body

    if(!username || !age || !password) {
        return res.status(400).send("Tarkista tiedot")
    } 
    
    const hashedPassword = await hash(password, saltRounds)

    db.serialize(()=>{

        const stmt = db.prepare("INSERT INTO user VALUES (NULL, ?, ?, ?)")
    
        stmt.run(username, hashedPassword, age)
    
        stmt.finalize()
    
        res.status(201).send('Käyttäjä luotu onnistuneesti')
    })
    

})



router.put('/user', (req, res)=>{

    
    const {username, age, id} = req.body

    if(!username || !age || !id) {
        return res.status(400).send("Tarkista tiedot")
    } 

    db.serialize(()=>{

        const stmt = db.prepare("UPDATE user SET username = ?, age = ? WHERE id = ?")

        stmt.run(username, age, id)

        stmt.finalize()

        res.send('Käyttäjä päivitetty onnistuneesti')
    })
})

router.patch('/user', (req, res)=>{
    res.send('Käyttäjän ikä päivitetty onnistuneesti')
})

router.delete('/user/:id', (req, res)=>{
    const id = req.params.id

    db.run("DELETE FROM user WHERE id = ?", [id], (err)=>{

        if(err){
            return res.status(404).send()
        }

        res.send("Käyttäjätili poistettu onnistuneesti")

    })

})

app.use('/api/v1', router)

app.use(express.static('public'))

app.listen(3000, ()=>{
    console.log('HTTP Server is running on port http://localhost:3000')
})