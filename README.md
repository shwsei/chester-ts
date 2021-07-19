# ChesterBot - TS
## Este é apenas um fork do bot feito pelo [Rev3rs1d](https://github.com/Rev3rs1d)

![Badge](https://img.shields.io/badge/Telegram-ShuseiKagari-blue) ![Badge](https://img.shields.io/badge/Telegram-type0f-blue)

### Pré-requisitos

Você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) 
- [MongoDB](https://cloud.mongodb.com/)

### 🤖 Deploy no Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


### 🤖 Rodando o bot localmente

```bash
# Clone este repositório
$ git clone https://github.com/Lewizh11/chester-ts.git

# Acesse a pasta do projeto no terminal/cmd
$ cd chesterbot

# Instale as dependências

# Usando o NPM:
$ npm i

#Usando o Yarn:
$ yarn install

# Variáveis ambientes. Crie um arquivo com .env com qualquer editor de texto e coloque:
DB_STRING=#URL de conexão com o MongoDB
TELEGRAM_API=#Token do seu bot gerado no @BotFather

# Build
# Usando o NPM:
$ npm build

#Usando o yarn:
$ yarn build

# Execute a aplicação

# NPM:
$ npm start

# Yarn:
$ yarn start

```
