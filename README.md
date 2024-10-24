# API de Usuários - Node.js, PostgreSQL e Docker

Esta API gerencia usuários, permitindo criar e listar registros de usuários em um banco de dados PostgreSQL. Toda essa aplicação é gerenciada a partir de containers Docker

## Estrutura da Imagem Docker
A imagem configurada no arquivo ```docker-compose.yml``` roda 3 serviços no mesmo container 

<i>(obs: em uma aplicação real isso seria má prática, pois cada serviço deve ter seu próprio container, mas para fins didáticos, foi criado uma unica imagem que rodará os 3 serviços no mesmo container)</i>
```
Serviços:
- Node.js (para criação da API)
- PostgreSQL (banco de dados)
- pgAdmin4 (sgbd/interface para o postgres)
```

## Passos para rodar o projeto
1. <small>É necessário ter ```Docker``` instalado na máquina</small>

2. <small> Acessar a pasta do projeto ```cd Alexandre Tonin```</small>

3. <small>Criar o container a partir da imagem descrita no arquivo docker-compose.yml: rodar o comando ```docker compose --build``` no terminal</small>

4. <small>Acessar no navegador a seguinte url ```http://localhost:3000/users``` ou acessar os endpoints desejados da API na porta 3000</small>




## Endpoints da API

### 1. Criar um Usuário (Formulário)

**Rota:** `GET /user`

Este endpoint exibe um formulário HTML para criar um novo usuário.

### 2. Criar um Usuário (Envio de Dados)
**Rota:** `POST /user`

Este endpoint cria um novo usuário no banco de dados a partir dos dados enviados via formulário.

### Parâmetros:
```
name (string, obrigatório): Nome do usuário.
email (string, obrigatório): Email do usuário.
password (string, obrigatório): Senha do usuário.
```

Exemplo de Body:
```
{
  "name": "Alexandre",
  "email": "alexandre@example.com",
  "password": "123456"
}
```
Respostas:
```
200 OK: Redireciona para /users se o usuário for criado com sucesso.
```
```
500 Internal Server Error: Retorna uma mensagem de erro caso ocorra algum problema ao inserir o usuário no banco de dados.
```
### 3. Listar Todos os Usuários
**Rota:** `GET /users`

Este endpoint exibe uma tabela HTML com todos os usuários cadastrados no banco de dados.

Respostas:
```
200 OK: Retorna uma tabela HTML com os usuários cadastrados.
```
```
500 Internal Server Error: Retorna uma mensagem de erro caso ocorra algum problema ao buscar os usuários no banco de dados.
```