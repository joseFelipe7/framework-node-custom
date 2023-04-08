testController = {
    index:(req, res) => {
        res.view('index.html', {title:'olhe para o meu titulo', uiiiii: 'ele gosta'})
    }
}
module.exports = testController