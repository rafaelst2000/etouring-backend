<div align="center">
  <h1>eTouring Rest API</h1>
</div>


## **:rocket: Objetivo**

O projeto tem como finalidade colocar em prática o conteúdo aprendido durante a disciplina de Serviços Web do curso superior de Sistemas para Internet do IFSUL Campus Charqueadas

## **:computer: Tecnologias**

  - **Node.js - Javascript**
  - **Knex.js - Query builder**
  - **Express - Framework**
  - **SQLite - Banco de dados relacional**
  - **JWT - Token de autenticação**
  - **Abstract API - Validação de e-mail**

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
   
3. Acesse o projeto e crie um arquivo .env na raiz:

   ```sh
   ABSTRACT_EMAIL_VALIDATION_KEY="seu token"
   ```
   
4. Execute o projeto em servidor de desenvolvimento:

   ```sh
   npm start
   ``` 
   
5. Enjoy! =D

   ```sh
   abra seu app para teste de API e crie as requisições abaixo a partir da localhost:3333.
   ``` 
   <br>
   
   
## **⚡Rotas e parâmetros**

# 1. /users

   ```sh
    GET: lista todos usuários disponíveis
       - sem parâmetros -
      
    GET: :id lista o usuário com o respectivo id
       - route params -
         id
         
    POST: cria um usuário
       - body - 
       {
          "name": "seu nome",
          "email": "seu@email.com",
          "password": "sua-senha",
          "image": "sua url de imagem"
       }
       
    
    PUT: REQUER AUTENTICAÇÃO | edita o usuário autenticado
        - body - 
       {
          "name": "seu nome",
          "email": "seu@email.com",
          "password": "sua-senha",
          "image": "sua url de imagem"
       }
       
       - Authorization Bearer: seu token
       
    DELETE: REQUER AUTENTICAÇÃO | deleta o usuário autenticado
     - Authorization Bearer: seu token
   ```
 # 2. /sessions

 ```sh
  POST: faz o login do usuário, retornando seu token de autenticação
     - body - 
     {
        "email": "seu@email.com",
        "password": "sua-senha",
     }
 ```

# 3. /posts

   ```sh
    GET: lista todos os posts disponíveis
       - sem parâmetros -
      
    GET: ?page=1 lista todos os posts paginando
       - query params -
        page: 1
         
    POST: REQUER AUTENTICAÇÃO | cria uma postagem
       - body - 
       {
          "description": "sua descrição",
       }
       
       - Authorization Bearer: seu token
    
    PUT: :id REQUER AUTENTICAÇÃO | edita um post
       - route params -
         id
         
        - body - 
       {
          "description": "sua descrição",
       }
       
       - Authorization Bearer: seu token
       
    DELETE: :id REQUER AUTENTICAÇÃO | deleta um post
       - route params -
         id
         
       - Authorization Bearer: seu token
   ```
 
 # 4. /comments

   ```sh 
    POST: REQUER AUTENTICAÇÃO | cria um comentário no post desejado
       - body - 
       {
        "description": "Esse é um comentário",
        "post_id": 3
       }
       
       - Authorization Bearer: seu token
    
    PUT: :id REQUER AUTENTICAÇÃO | edita um comentário
       - route params -
         id
         
        - body - 
       {
          "description": "comentario atualizado"
       }
       
       - Authorization Bearer: seu token
       
    DELETE: :id REQUER AUTENTICAÇÃO | deleta um comentário
       - route params -
         id
         
       - Authorization Bearer: seu token
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
