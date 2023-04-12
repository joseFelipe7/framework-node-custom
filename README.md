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

***
