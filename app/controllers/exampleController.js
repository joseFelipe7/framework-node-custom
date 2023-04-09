const  {Database} = require('../../libs/App')
testController = {
    index:async (req, res) => {
        res.view('index.html', {title:'olhe para o meu titulo', uiiiii: 'ele gosta'})
        // let query = await Database.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = 1", ['felipesss', 'felipe@email.com', 123])
        let query = await Database.query("SELECT * FROM users")
        // let transaction = await Database.transaction()

        // try {
        //     let data = await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', ['felipeaaa', 'kpasfedasassdsasdsdacsaa@email.com', '123']);
        //     console.log(data)
        //     await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', ['felipessscccc', 'kdscadasdasdasasaccsdasdaspsfec@email.comcc', '1213']);
        //     await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', ['felipesssccccsdadas', 'kpsadasdasdasaaasdsdsdadasdasdsafec@email.comcc', '1213']);
        //     await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', ['felipesssccccsadsa', 'kpdacasdasasddawwssdcsdassfec@email.comcc', '1213']);
        //     await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', ['felipessscccccascascas', 'kpsfasdadsaqqdasadsssdadasdasdasec@email.comcc', '1213']);
        //     // await transaction.query('INSERT INTO usersasddas SET name = ?, email = ?, password = ?', ['felipessscccccascascas', 'kpsfsqdasasdasdeqwewqqwedadasdasdasec@email.comcc', '1213']);
        //     transaction.commit()
        // } catch (error) {
        //     console.log(error.message   )
        //     transaction.roolback()
        // }
        console.log(query)
    }
}
module.exports = testController