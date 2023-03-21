const fs = require('fs')
const path = require('path')
const foodDB = path.resolve(__dirname, '../db/foods.json')


const migrateStructure = () => {
    const structure = {
        countId: 0,
        item: []
    }
    const data = JSON.stringify(structure)
    fs.writeFileSync(foodDB, data, (err) => {
        if (err) throw err
    })
    return new Promise((resolve, reject) => {
        try {
            resolve("migrate was successful")
        } catch (err) {
            reject(err)
        }
    })
}



const getLastId = async () => await readFoodDB()

const readFoodDB = () => {
    const result = fs.readFileSync(foodDB, (err) => {
        if (err) throw err
    })
    return new Promise((resolve, reject) => {
        try {
            if (result.length >= 1) {
                resolve(JSON.parse(result))
            }
            resolve([])
        } catch (err) {
            reject(err)
        }
    })
}


const writeFoodDB = async (data) => {
    let template = {
        countId: data.countId,
        item: data.item
    }
    template = JSON.stringify(template)
    // console.log(`before writing file data : ${JSON.stringify(data, null, 2)}`)
    // console.log(`before writing file ${template}`)
    fs.writeFileSync(foodDB, template, (err) => {
        if (err) throw err
    })
    // sorting by name after write
    await sortingFoodByName()
    return true
}


const sortingFoodByName = async () => new Promise(async (resolve, reject) => {
    try {
        const db = await readFoodDB()
        db.item.sort((a, b) => a.name.localeCompare(b.name))
        const writer = JSON.stringify(db)
        fs.writeFileSync(foodDB, writer, (err) => {
            if (err) throw err
        })
        resolve(true)

    } catch (err) {
        reject(err)
    }
})

// return array of foods
const findAll = async () => await readFoodDB()


const findByFoodName = async (foodName) => {
    const db = await readFoodDB()
    const result = db.item.filter(elem => elem.name === foodName)
    return result
}

// use this for update data or delete
const findFoodIndexById = async (id) => {
    const db = await readFoodDB()
    const index = db.item.findIndex(elem => elem.id === id)
    return index
}


const deleteFoodByIndex = async (index) => {
    const db = await readFoodDB()
    db.item.splice(index, 1)
    const updatedFood = db.item
    const updateDB = {
        countId: db.countId,
        item: updatedFood
    }
    return await writeFoodDB(updateDB)

}


const updateFoodById = async (id, newName) => {
    const db = await readFoodDB()
    const updatedFood = db.item.map(elem => {
        if (elem.id === id) {
            elem.name = newName
            return elem
        }
        return elem
    })
    // console.log(`updateFoodById ${JSON.stringify(updatedFood, null, 2)}`)
    return await writeFoodDB({ countId: db.countId, item: updatedFood })
}


// const updateFoodById = async (id, newName) => {
//     const db = await readFoodDB()
//     const updatedFood = db.item.filter(elem => {
//         if (elem.id === id) {
//             elem.name = newName
//             return elem
//         }
//     })
//     console.log(`updateFoodById ${JSON.stringify(updatedFood, null, 2)}`)
//     // return await writeFoodDB(updatedFood)
//     return
// }




module.exports = {
    migrateStructure,
    readFoodDB,
    getLastId,
    sortingFoodByName,
    writeFoodDB,
    findAll,
    findByFoodName,
    findFoodIndexById,
    deleteFoodByIndex,
    updateFoodById
}
