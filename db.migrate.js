const foodRepository = require('./src/repositories/food.repository')



const main = async () => {
    return await foodRepository.migrateStructure()
}

main().catch(err => {
    console.log(err)
})