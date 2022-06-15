const router = require('express').Router()
const Person = require('../models/Person')

// POST
router.post('/', async (req, res) => {

    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }
    if(!name || !salary || approved == null){
        res.status(422).json({message: "Parametros obrigatorios não foram preenchidos."})
        return
    }

    try {
        await Person.create(person)
        res.status(201).json({result:"Pessoa inserida na DB"})
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
        return
    }
})

//GET

router.get('/', async (req,res) =>{
    try {
        const people = await Person.find()
        res.status(200).json(people)
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
        return
    }
})


router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id) 

        if(!person){
            res.status(404).json({message: "Pessoa não encontrada"})
            return
        }
        res.status(200).json(person)
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
        return
    }
})

//UPDATE
router.patch("/:id", async (req, res) =>{
    const{name, salary, approved} = req.body
        const person = {name, salary, approved}
    try {
        const updatedPerson = await Person.updateOne({_id: req.params.id}, person)
        if(updatedPerson.matchedCount === 0){
            res.status(404).json({message: "Pessoa não encontrada"})
            return
        }
        res.status(200).json(person)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
        return
    }
})

//Delete
router.delete("/:id", async (req, res) =>{
    const person = await Person.findById(req.params.id) 

        if(!person){
            res.status(404).json({message: "Pessoa não encontrada"})
            return
        }

        try {
            await Person.deleteOne({_id: req.params.id})
            res.status(200).json({message: "Usuario deletado!"})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error})
            return
        }
    
})
module.exports = router