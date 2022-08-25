<div align="center">
### eTouring Rest API
</div>


## **:rocket: Objetivo**

O projeto tem como finalidade colocar em prática o conteúdo aprendido durante a disciplina de Serviços Web do curso superior de Sistemas para Internet do IFSUL Campus Charqueadas

## **:computer: Tecnologias**

  - **Node.js - Javascript**
  - **Knex.js - Query builder**
  - **Express - Framework**
  - **SQLite - Banco de dados relacional**
  - **JWT - Token de autenticação**

## **📩 Commits**

  - **✨ - Adição de nova feature**
  - **🐛 - Resolução de bugs / correções**
  - **♻️ - Mudanças de código / refatorações**


## **⚡Executando o projeto em ambiente de Desenvolvimento**

### Pré-requisitos

- Node.js instalado na sua máquina
- Postman ou Insomnia para realizar as requisições na API

### Instalação

Siga as etapas seguintes para instalar e executar o projeto:

1. Clone o repositório

   ```sh
   git clone https://github.com/rafaelst2000/etouring-backend.git
   ```
2. Instale as dependências do projeto:

   ```sh
   npm install
   ```
   
3. Execute o projeto em servidor de desenvolvimento:

   ```sh
   npm start
   ``` 
   
4. Enjoy! =D

   ```sh
   abra seu app para teste de API e crie as requisições abaixo a partir do localhost:3333.
   ``` 
   <br>
   
   
## **⚡Rotas e parâmetros**

1. Usuários

 # Parâmetros
   ```sh
    name
    email
    password
    image
   ```

   ```sh
    GET: /users  | lista todos usuários disponíveis
    GET: /users/:id  | lista o usuário com o respectivo id
    POST: /users  | cria um usuário
    PUT: /users | REQUER AUTENTICAÇÃO | edita o usuário autenticado
   ```

 
 <div align="center">
  Made by <a href="https://www.linkedin.com/in/rafaelst2000/" target="_blank">Rafael Trevisan</a>
 </div>

<!-- Badges -->

[node_version_badge]: https://img.shields.io/badge/Node-12.20.0-green

[yarn_version_badge]: https://img.shields.io/badge/Yarn-1.22.17-red

[vue_badge]: https://img.shields.io/badge/Web-VueJS-green

[server_firebase_badge]: https://img.shields.io/badge/Server-Firebase-important

[pinia_badge]: https://img.shields.io/badge/Store-Pinia-yellow

[vite_badge]: https://img.shields.io/badge/Bundle-Vite-purple
