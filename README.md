
#  Gorila (Back-end)

Teste para desenvolvedor Back-end no Gorila 

## Aplicação

A aplicação está disponivel em : [https://dev-gorila.herokuapp.com/](https://dev-gorila.herokuapp.com/)


## Iniciando servidor 

Clone o projeto

```bash
  git clone https://github.com/FilipFelipe/gorila_teste_backend.git
```

Vá para a pasta do projeto 

```bash
  cd gorila_teste_backend-main
```

Instale as dependências 

```bash
  npm install
```

Configure as migrations com knex

```bash
knex migrate:latest  ou  npx knex migrate:latest 
```

Inicie o servidor 
```bash
  npm run dev
```
#### Porta padrão da aplicação 
```sh
IP:3000
```


## Variáveis de ambiente

Para iniciar esse projeto, é necessário configurar as variáveis de ambiente no arquivo .env (Há um arquivo .env.exemple como modelo) 

`PORT`

`DATABASE_URL`

`DATABASE_URL_DEV`

`DATABASE_URL_TEST`

Exemplo de URL: postgres://**usuário**>:<**senha**>@<**host**>:<**port**>/<**database**>
```bash
  postgres://admin:admin@127.0.0.1:5432/postgres
```


## Rodando os testes

Para rodar os testes, execute os seguintes comandos: 

```bash
  knex migrate:latest --env test
```

```bash
  npm run test
```

## API 

- #### Importa os dados no serviço
Salva os dados do CSV no banco de dados
```http
  POST /cdi
```


| Parâmetros | Tipo    | Descrição                |
| :-------- | :------- | :------------------------- |
| `fileCSV` | `file` | **Required** O arquivo deve ser no formato **.csv**|


- #### Lista as Taxas de CDI salva no banco de dados 
Retorna a lista cadastrada no banco
```http
  GET /cdi
```

| Parâmetros | Tipo    | Descrição                |
| :-------- | :------- | :------------------------- |
| `Nenhum` | ` ` |  |


- #### Registra uma nova consulta no banco de dados
Salva os dados de uma consulta no banco de dados
```http
  POST /cdb
```

| Parâmetros | Tipo    | Descrição                |
| :-------- | :------- | :-------------------------------- |
| `investmentDate`| `string` | **Required**. Data inicial do investimento|
| `cdbRate`       | `number` | **Required**. Taxa do CDB|
| `currentDate`   | `string` | **Required**. Data atual|

Exemplo de JSON

```json
{
    "investmentDate":"2016-11-14",
    "cdbRate": 103.5,
    "currentDate":"2016-12-26"
} 
```

- #### Calcula e retorna uma lista de preços unitários do CDB

Realiza os calculos e retorna uma lista com os preços unitários dos dias
```http
  GET /cdb/${id}
```

| Parâmetros | Tipo    | Descrição                |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Identificador da consulta|

Exemplo de resposta

```json
[{
	"date": "2016-12-26",
	"unitPrice": XX.XX
},
{
	"date": "2016-12-25",
	"unitPrice": YY.YY
},
{
	"date": "2016-12-24",
	"unitPrice": ZZ.ZZ
}]
```
## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

-   **[NodeJS](https://nodejs.org/en/)**
-   **[Express](https://expressjs.com/)**
-   **[KnexJS](http://knexjs.org/)**
-   **[Cors](https://www.npmjs.com/package/cors)**
-   **[consign](https://www.npmjs.com/package/consign)**
-   **[Supertest](https://www.npmjs.com/package/supertest)**
-   **[Jest](https://www.npmjs.com/package/jest)**


## Autor

- [@FilipFelipe](https://www.github.com/filipfelipe) :)
