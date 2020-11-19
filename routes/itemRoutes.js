const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const Item = require('../models/itemSchema')

router.use(bodyParser.json())

router.route('/')
    .get((req, res) => {
        Item.find()
            .then(items => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(items)
            })
            .catch(err => console.log(err))
    })
    .post((req, res) => {
        Item.create(req.body)
            .then(item => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({ success: true })
            })
            .catch(err => {
                res.send(err)
            })
    })

router.route('/:id')
    .get((req, res) => {
        Item.findById(req.params.id)
            .then(item => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(item)
            })
            .catch(err => {
                console.log(err)
            })
    })
    .put((req, res) => {
        Item.findByIdAndUpdate(req.params.id, req.body)
            .then(item => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({ success: true })
            })
            .catch(err => {
                console.log(err)
            })
    })
    .delete((req, res) => {
        Item.findByIdAndRemove(req.params.id)
            .then(result => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({ success: true })
            })
            .catch(err => {
                console.log(err)
            })
    })

module.exports = router