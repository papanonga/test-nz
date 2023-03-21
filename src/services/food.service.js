const foodRepository = require('../repositories/food.repository')


const findAll = async () => {
    const result = await foodRepository.findAll()
    return result.item
}


const findByName = async (foodName) => await foodRepository.findByFoodName(foodName)

// return true if writing was successful
const insert = async (data) => {
    // isExist
    const isExist = await foodRepository.findByFoodName(data.name)
    if (isExist?.length >= 1) {
        console.log('foodname existed')
        return 
    }

    const oldItem = await findAll()
    const { countId } = await foodRepository.getLastId()
    data = { id: (countId ? countId + 1 : 1), ...data }
    oldItem.push(data)
    const writerToDB = {
        countId: data.id,
        item: oldItem
    }
    return await foodRepository.writeFoodDB(writerToDB)

}


const remove = async (data) => {
    const hasData = await foodRepository.findByFoodName(data.name)
    if (hasData.length === 0) {
        console.log("The data does not exist")
        return
    }
    const removeIndex = await foodRepository.findFoodIndexById(hasData[0].id)
    const removeResult = await foodRepository.deleteFoodByIndex(removeIndex)
    return removeResult

}


// return true when food was update
const update = async (newName, oldName) => {
    const hasData = await foodRepository.findByFoodName(oldName)
    console.log(`hasData : ${JSON.stringify(hasData, null, 2)}`)
    if (hasData.length === 0) {
        console.log("The data does not exist")
        return 
    }
    return await foodRepository.updateFoodById(hasData[0].id, newName)
}


module.exports = {
    findAll,
    findByName,
    insert,
    remove,
    update
}