# 🚀 Projeto Full-Stack 🚀
<p align="center"> O projeto consiste em um sistema de sorteios onde os usuários podem se cadastrar e selecionar sorteios que desejam participar, há também uma visão onde como Administrador do sistema tem acesso ao gerenciamento dos sorteios, podendo cadastrar novos, editar e sortear um ganhador. </p>

## Sobre o desenvolvimento
Front-End: construído em HTML/CSS/JavaScript e Bootstrap 5. 

Back-End: desenvolvido em Node.js e Banco MySQL.

Foi realizada a criação de um Framework em Node.js, DO ZERO, utilizando somente os tipos nativos do mesmo para facilitar a utilização. É descrito seu uso detalhado e exemplos mais abaixo.

## Sobre futuro e melhorias
O objetivo central desenvolvido no projeto foi criar um Framework reutilizável e disponível para instalação via npm. Os arquivos necessários para uso do framework se encontram na pasta libs, pasta esta que irá gera o Framework. Para o futuro do projeto também se encontra a atualização e melhoria da doc junto com melhor tratativa dos casos de uso.

## Instalação do projeto local
Para rodar o projeto localmente em sua máquina é necessário configurar as informações dos arquivos existentes dentro da pasta config e ter em sua máquina o banco MYSQL disponibilizado dentro da raiz deste repositório `banco.slq`

Para acesso do admin há um usuario com as credenciais:
```
email:admin@admin.com
senha:123
```
Comandos: 
```
npm install(primeira vez que for rodar o projeto)
node index,js ou npx nodemon index.js(para caso de desenvolvimento)
```
Rota cliente: `/`
Rota admin: `/manager`

Sobre o Framework criado com ferramentas nativas
# | Framework  Node&View |

Foi criado um Framework para trabalhar com node para facilitar e permitir o trabalho com node usando apenas as bibliotecas nativas; todo o trabalho desse framework ainda em desenvolvimento se encontra na pasta libs.

---

### App
É o arquivo central do servidor; ele disponibiliza todas as partes do framework para uso do dev.

#### Funções e atributos

***
##### Start: inicia o servidor com a porta e nome de host passado pelo usuário

```
start(hostname, port)
```

```js
const { App } = require('./libs/App')
const host = '127.0.0.1';
const port = 3000;
app = new App()
app.start(host, port)
```

***

##### viewFolder(path): Recebe por parâmetro o local no projeto onde as views se encontram para serem carregadas a partir dele.
##### _Default_: por padrão as views são carregadas a partir de /app/views caso não deseje definir outro local.

```js
const path = require('path');
const { App } = require('./libs/App')
app = new App()
app.viewFolder(path.join('app', 'views'))
```

***

##### publicFolder(path): Recebe por parâmetro o caminho em que os arquivos públicos do sistema se encontram.
Default: por padrão os arquivos públicos se encontram em /public .

```js
const path = require('path');
const { App } = require('./libs/App')
app = new App()

app.publicFolder(path.join('public'))
```

***

##### useRoute(router): Recebe por parâmetro um objeto Router(está presente na lib) e adiciona as rotas criadas ao servidor.

```js
const { App, Router } = require('./libs/App')
const router = new Router()
router.get('/', (req, res) => { /*...*/ })
app = new App()

app.useRoute(router)
```

---

### Router
Biblioteca criada para facilitar a criação e  uso de rotas.

#### Funções e atributos

##### get(routePath, callback, middleware:opcional): Cria uma rota do tipo GET e recebe o caminho da rota que será criada e um callback que será executado ao ser acessado essa rota
o callback recebe dois parâmetros req e res. 
req é responsável pelos dados da requisição recebida pelo servidor e res pelas respostas dadas ao cliente


```js
const { Router } = require('./libs/App')
const router = new Router()
router.get('/', (req, res) => { /*...*/ })
```

Há também outras opções de criação de rota que partilham o mesmo uso alterando apenas o tipo de rota criada

```js
router.post('/', (req, res) => { /*...*/ }) 
router.put('/', (req, res) => { /*...*/ })
router.delete('/', (req, res) => { /*...*/ })
```

Todas as rotas também possuem opcionalmente um terceiro parâmetro para passagem de um Middleware.

---

### Middlewares
Na criação de rotas é possível usar middlewares passando um terceiro parâmetro na sua criação o middleware é uma função que recebe três parâmetros (req,res,next) e é executada antes de ir para a função callback da rota

```js
const { Router } = require('../libs/App')
const router = new Router()
const middleware = (req,res,next)=>{
    /*--*/
    next()
}
router.get('/', (req, res) => { /*...*/ }, middleware)
```

dentro do middleware é usado next() para chamar a função callback passada na rota

---
### Request
o objeto request recebido pela rotas possui alguns dados tratados 

#### Funções e atributos

##### query
acessando req.query é possível acessar os atributos de query strings recebidos na rota

acessando /home?id=3 e possivel pegar o parametro fazendo
```js
const { Router } = require('../libs/App')
const router = new Router()
router.get('/home', (req, res) => {
    req.query.id
})
```
---
##### body
em caso da requisição tiverem dados passados no corpo como no caso de um post é possível acessar os dados a partir de req.body no momento é possível usar nos casos de requisições do tipo
```js
multipart/form-data
application/x-www-form-urlencoded
application/json
```
O acesso será
```js
const { Router } = require('../libs/App')
const router = new Router()
router.get('/', (req, res) => {
    req.body.name
})

```
---
##### session
e possivel guarda dados na sessão do usuario atribuindo a `req.session` e resgatar esses dados em qualquer momento dentro da aplicação
O acesso será
```js
const { Router } = require('../libs/App')
router.get('/', (req, res) => {
    req.session.dadoGuardado
})
```
---

### Response
o objeto response recebido pelas rotas possui algumas funções adicionada para um uso mais facilitado 

#### Funções e atributos

##### view(page, data:opcional)
A função view recebe uma pagina que é buscada a partir da pasta definida no app com a função viewFolder e opcionalmente pode receber dados que serão passados para a página carregada

```js
const { Router } = require('./libs/App')
const router = new Router()
router.get('/', (req, res) => {
    res.view('index.html', {data:[]})
})
```
Caso esta dentro de subpasta pode ser indicado também
```js
const { Router } = require('./libs/App')
const router = new Router()
router.get('/', (req, res) => {
    res.view('/templates/index.html', {data:[]})
})

```
---
##### json(data)
Recebe um objeto e retorna para o cliente os dados em formato json
```js
const { Router } = require('../libs/App')
const router = new Router()
router.get('/', (req, res) => {
    res.json({data:[], message:'json return'})
})
```
---
##### status(httpCode)
A função altera o status http retornado ao cliente e pode ser utilizado juntamente a função 
```js
const { Router } = require('./libs/App')
const router = new Router()
router.get('/', (req, res) => {
    res.status(201).json({data:[], message:'json return'})
})
```
---
##### redirect(route)
recebe por parâmetro uma o caminho de uma rota e move o cliente para a rota informada 
```js
const { Router } = require('./libs/App')
const router = new Router()
router.get('/', (req, res) => {
    res.redirect('/home')
})
```
nesse caso o cliente é redirecionado para o endpoint /home
---
### Hashing
módulo acessível a partir de app que permite criar hash e validá las  de maneira simplificada para usar o módulo deve ser configurado no arquivo hash encontrado em
```/config/hash.js```
configure da seguinte forma
```js
module.exports = {
    salt:'6dcf7e92sdafa4567a7c05b1eb7d231a39c1',
    digest:'hex'
}
```
#### Funções e atributos

##### hash(text)
Recebe uma string por parâmetro e retorna um hash dessa string
```js
const { Hashing } = require('./libs/App')
Hashing.hash('123') //saida: be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946
```
---
##### compare(text, originalText)
verifica se a string passada corresponde a string já em hash caso a correspondência seja verdadeira retorna o valor true
```js
const { Hashing } = require('./libs/App')
let textHash = 'be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946'
Hashing.compare('123',textHash) //saida: true
```
---
### Database
módulo acessível a partir de app permite a conexão do banco de dados  o módulo deve ser configurado no arquivo database encontrado no diretório raiz config deve ser passado as credenciais do banco de dados mysql utilizado

configure da seguinte forma
```js
module.exports = {
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'node_view'
}
```
#### Funções e atributos

##### query(sql, params:opcional)
A unção query de Database recebe uma query sql e executa a mesma retornando seu resultado dentro de um objeto no atributo `data` pode retorna também o numero de linhas retornadas na consulta em `numRows` e o atributo `insertId` que é idInsert em caso de querys de inserção 
```js
const  {Database} = require('../../libs/App')
let resultQuery = await Database.query("SELECT * FROM users")
```
ou tambem
```js
const  {Database} = require('../../libs/App')
let resultQuery = await Database.query("SELECT * FROM users WHERE id = ? ,[1])
```
---
##### transaction()
Afunção transaction retorna um objeto do tipo database e iniciar um transaction no banco de dados que é finalizada apenas ao chamar uma função commit ou rollback a partir da instância retornada pela transaction 
```js
const  {Database} = require('./libs/App')
let transaction = await Database.transaction()
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
```
---
##### commit()
caso exista finaliza a transaction iniciada confirmando todas as querys passadas
```js
const  {Database} = require('./libs/App')
let transaction = await Database.transaction()
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
transaction.commit() // efetiva as inserções
```
---
##### rollback()
Reverte todas as querys que foram feitas dentro da transaction 
```js
let transaction = await Database.transaction()
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
await transaction.query('INSERT INTO users SET name = ?, email = ?, password = ?', [...]);
transaction.rollback() // reverte todas as insercões feitas por transaction
```
---
### Uso de  funções em views
Algumas ações importantes de usos dentro de HTML estão implementadas e podem ser chamadas dentro  de `{{ }}` nos arquivos html chamado pelo método view de response

#### Funções e atributos

##### include(view)
Essa espera receber o caminho até uma view a partir do diretório de views definido com viewsFolder() função pode ser chamada dentro de um arquivo html para fazer a chamada de outra view desde de que a mesma esteja dentro da pasta definida
```html
{{ include(partials/header.html) }}
<div>
    html
</div>
```
---
##### if(param1,comparador:opcional, param2:opcional)
Pode ser realizado um if dentro do html e o mesmo pode receber só um parâmetro onde ele verificará se o mesmo existe e se é verdadeiro ou falso ou pode receber três parâmetro sendo o primeiro parâmetro comparador e segundo parâmetro e irá realizar o comparador passado entre o primeiro e segundo e ambos são encerrado com endif()
```html
{{if(!prizes)}}
  <p>Não há dados</p>
{{endif()}}

```
---
##### each(item in array)
Percorre um array passado passa seus valores para item e repete o trecho de código até chegar ao seu fechamento em endeach()
```html
{{ each(prize in prizes) 
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 text-color-default">Sorteio: {{ prize.prize }}  </h5>
    </div>
{{ endeach () }}

```
---
##### {{var}}
caso não seja chamado nenhuma função pode ser passado um valor que será substituído pelo valor de uma variável passada para view caso houver {{var}}
```html
<p>tenho: {{ item }}</p>
```
---
