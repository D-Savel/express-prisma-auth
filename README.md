<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
         <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
       <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project

## Express CRUD & Auth TypeScript Template. 

This is an express TypeScript Template to manage register and login operation with securised access to API (auth using jwt with access and refresh tokens). API model is defined with prisma ORM model file (~/prisma/schema.prisma). CRUD operations are configured from model to implement on routes directory.

+ Clone the repo, run docker postgres container for fast db deployment and run an express server in few seconds to manage register/login for user (JWT with refreshtoken). After successful login, access token is provided in a cookie for few minutes duration, to continue to be connected :  
  - You must use refresh token route on backend(http/localhost/api/v1/auth/local/refreshToken) before access token has expired in browser. Access token and refresh token are then updated.
  - Or use refresh token route on backend(http/localhost/api/v1/auth/local/refreshToken) after received a 401 status error on client to update access token and refresh token. And retry request from client to backend server.
+ After installation navigate through the API doc:
  - localhost:PORT/docs => doc for API usage


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built With

### Node.js v20.9.0 (LTS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
# Getting Started

## Installation

Below is an example of how you can install and set up your express app.

### 1. Clone the repo

- In a terminal clone the repo

`
    git clone --depth=1 https://github.com/D-Savel/express-prisma-auth.git yourProjectDirectory
`
- Remove the .git directory in your project directory

`
    cd yourProjectDirectory
    rm -rf !$/.git
`

### 2. Open in IDE (ex: vs code => type code .)
- Open terminal and run

`
  ~/yourProjectDirectory: code .
`

### 3. Install NPM packages
- Open terminal in your IDE and run

`
  ~/yourProjectDirectory  npm install
 `

### 4. Create .env at root of your project and choose the port you want to run for the express-server on localhost (Default port for server: 9000) then copy next config for postgres DB on docker and secret for generate jwt.

  `~/yourProjectDirectory  touch .env`

  /.env 
  
    `PORT=yourServerPort(number)`
    `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my-db-project?schema=public"`
    `JWT_ACCESS_SECRET="your-jwt-access-token-secret"`
    `JWT_REFRESH_SECRET="your-jwt-refresh-token-secret"`
    `REFRESH_TOKEN_TIME="1 month"`
    `ACCESS_TOKEN_TIME=24 * 60 * 1000`

### 5. Define node version

  You need to install node js 20  

     and nvm (optional) on your OS.  
    - For Windows https://github.com/coreybutler/nvm-windows/releases.
    - For Linux ubuntu run on terminal :  
    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh`
  
  #### Run specific node version with nvm

  ~/yourProjectDirectory `nvm install 20`   
  ~/yourProjectDirectory `nvm use 20`
`

  #### OR

  Automatic node version update on bash terminal opening witn nvm installed for linux ubuntu (use bash terminal in vs code with WSL in windows)
  edit .bashrc in your ubuntu config (wsl config)

+  using vi

    `~ cd home/{user_name}`

    `~/  vi .bashrc` 

+  Using vim

      `~ cd home/{user_name}`

      `~/  vim .bashrc `

  Add this code at the end of file
  
`
  _nvmrc_hook() {
  if [[ $PWD == $PREV_PWD ]]; then
    return
  fi
  PREV_PWD=$PWD
  [[ -f ".nvmrc" ]] && nvm use
}
if ! [[ "${PROMPT_COMMAND:-}" =~ _nvmrc_hook ]]; then
  PROMPT_COMMAND="_nvmrc_hook${PROMPT_COMMAND:+;$PROMPT_COMMAND}"
fi
`
### 7. Run docker postgres DB container (you need to install docker on your OS)
- On your terminal run  

 ~/yourProjectDirectory  `docker compose up -d`

  - On terminal, push model on DB with prisma ORM (Model is defined in ~/yourProjectDirectory/prisma/schema.prisma)  

 ~/yourProjectDirectory   `npx prisma db push`

  - To visualize DB, you can use prisma ORM utility (studio) running on localhost:5555  

 ~/yourProjectDirectory   `npx prisma studio`


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 8. Start server

 ~/yourProjectDirectory   `npm run dev`

 ### 9. Start to use API with doc

 In your browser go to  `localhost:SERVER_PORT/docs`


<p align="right">(<a href="#readme-top">back to top</a>)</p>

# License

## Distributed under the ISC License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
