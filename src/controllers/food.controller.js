const foodService = require('../services/food.service')



const findAll = async (req, res) => {
    try {
        const result = await foodService.findAll()
        if (result.length >= 1) {
            res.status(200).json({ data: result })
        } else {
            res.status(404).json({ message: "404 not found" })
        }

    } catch (error) {
        res.status(500).json({ status: "something went wrong" })
    }
}

const findByName = async (req, res) => {
    try {
        const foodName = req.params.name
        const result = await foodService.findByName(foodName)
        if (result.length >= 1) {
            res.status(200).json({ data: result })
        } else {
            res.status(404).json({ message: "404 not found" })
        }
    } catch (error) {
        res.status(500).json({ status: "something went wrong" })
    }
}

const insert = async (req, res) => {
    try {
        const data = req.body
        const result = await foodService.insert(data)
        if (result === true) {
            res.status(201).json({ message: "inserting was successful" })
        } else {
            res.status(403).json({ message: "Data exists" })
        }

    } catch (error) {
        res.status(500).json({ status: "something went wrong" })
    }
}

const updateByName = async (req, res) => {
    try {
        const { newName, oldName } = req.body
        const isUpdate = await foodService.update(newName, oldName)
        if (isUpdate === true) {
            res.status(200).json({ message: "food name was updated" })
        } else if (isUpdate === undefined) {
            res.status(404).json({ message: "food name does not exist" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "something went wrong" })
    }
}

const remove = async (req, res) => {
    try {
        const body = req.body
        const isRemove = await foodService.remove(body)
        if (isRemove === true) {
            res.status(204).json({ message: "food was removed" })
        }else if( isRemove === undefined){
            res.status(404).json({ message: "food name for remove does not exist" })
        }

    } catch (error) {
        res.status(500).json({ status: "something went wrong" })
    }
}


module.exports = {
    findAll,
    findByName,
    insert,
    updateByName,
    remove
}