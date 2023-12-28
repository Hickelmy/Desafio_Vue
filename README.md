# essentials

## Configuração do projeto

```

# npm
npm install


### Compiles and hot-reloads for development

```

# npm
npm run dev


### Compiles and minifies for production

```

# npm
npm run build

```

### Lints and fixes files

```
# npm
npm run lint

```


## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```


#### Cadastrar um novo produto

```http
  POST /api/products/add
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do produto |
| `description` | `string` | Descrição do produto |
| `price` | `string` | Preço do produto |
| `expiration_date` | `string` | Data de validade do produto |
| `image` | `string` | Url da imagem produto |
| `category_id` | `string` | ID produto |


#### Editar Produto

```http
  PUT /api/products/update
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | ID do produto |
| `name` | `string` | Nome do produto |
| `description` | `string` | Descrição do produto |
| `price` | `string` | Preço do produto |
| `expiration_date` | `string` | Data de validade do produto |
| `image` | `string` | Url da imagem produto |
| `category_id` | `string` | ID produto |

#### Deletar Produto

```http
  DELETE /api/products/delete 
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | ID do produto |

#### ----------------------------------------

#### Login Do Usuario

```http
  POST /api/auth/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | EMAIL do usuario |
| `password` | `string` | senha do usuario |


#### Cadastro de um novo Do Usuario

```http
  POST /api/auth/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do usuario |
| `email` | `string` | Email do usuario |
| `password` | `string` | Senha do usuario |


