const testUserController = (req,res) =>{
    try {
        // res.status(200).send({
        //     success:true,
        //     message:"Test user data API"
        // })
        res.status(200).send('<h1>Test user data</h1>')
    } catch (error) {
        console.log('error in test API ',error)
    }
} 

module.exports = {testUserController};