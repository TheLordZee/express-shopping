const express = require('express');
const router = new express.Router();
const XError = require('./xError');
const items = require('./fakeDb')

router.get('/', (req, res) => {
    return res.send(items)
})

router.post('/', (req, res) => {
    const newItem = {
        name: req.body.name, 
        price: req.body.price
    }
    items.push(newItem)
    res.status(201).json({ added: newItem })
})

router.patch('/:name', (req, res) => {
    const foundItem = items.find(i => i.name === req.params.name)
    if(foundItem === undefined){
        throw new XError("item not found", 404)
    }
    foundItem.name = req.body.name || foundItem.name
    foundItem.price = req.body.price || foundItem.price
    res.json({updated: foundItem}) 
})

router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name)
    if(item === undefined){
        throw new XError("item not found", 404)
    }
    return res.json(item)
})

router.delete('/:name', (req, res) => {
    const item = items.findIndex(i => i.name === req.params.name)
    if(item === -1){
        throw new XError("item not found", 404)
    }
    items.splice(item, 1)
    return res.json({message: "successfully deleted"})
})


module.exports = router