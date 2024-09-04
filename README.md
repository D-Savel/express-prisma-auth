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

## Express TypeScript Template

This is an express TypeScript Template :
+ Copy the boilerplate template and run an express server in few seconds
+ After installation navigate through the API doc:
  - localhost:PORT/docs => doc for Users API usage


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built With

### Node.js v20.9.0 (LTS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
# Getting Started

## Installation

_Below is an example of how you can installing and setting up your express app.

### 1. Clone the repo

- In a terminal clone the repo

`
    git clone --depth=1 https://github.com/D-Savel/express-typescript-template.git yourProjectDirectory
`
- Remove the .git directory

`
    cd yourProjectDirectory
    rm -rf !$/.git
`

### 2. Open in editor (ex: vs code => type code .)

`
  ~/yourProjectDirectory:code .
`

### 3. Install NPM packages

`
  ~/yourProjectDirectory:npm install
 `

### 4. Create .env at root of your project and choose the port you want to run the express-server on localhost

  `~/yourProjectDirectory:touch .env`

  /.env
  
  `PORT=yourPort(number)`

### 5. Define node version
  -You can change node version with editing .nvmrc at root project.

`
  ~/yourProjectDirectory:nvm use
`

  #### OR

  Automatic update on bash terminal opening (use bash terminal in vs code with WSL in windows)
  edit .bashrc in your ubuntu wsl config

+  using vi

    `~cd home/{user_name}`

    `~/vi .bashrc` 

+  Using vim

      `~cd home/{user_name}`

      `~/vim .bashrc `

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

### 6. Start server

`
 ~/yourProjectDirectory:npm run dev
`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# License

## Distributed under the ISC License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
