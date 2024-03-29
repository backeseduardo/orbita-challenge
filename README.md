# orbita-challenge
Orbita development challenge

## api

Processo para iniciar a api em modo de desenvolvimento.

Iniciar o banco de dados:
```bash
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5432 -d -t postgres
```

Vá para a pasta api:
```bash
$ cd api
```

Instalar as dependências:
```bash
$ yarn
```

Rodar as migrations:
```bash
$ yarn sequelize db:migrate
```

Rodar os seeds:
<br/>
PS: baixar o [solar_data.json](https://drive.google.com/file/d/1dbURdS6TjfnweoFSB_0vqJpn77QJFXoZ/view?usp=sharing) e deixá-lo aqui no root, lembre-se de deixar o nome do arquivo como `solar_data.json`
```bash
$ yarn sequelize db:seed:all
```

Finalmente rodar a api em modo desenvolvimento:
```bash
$ yarn dev
```

Endereço da api `http://localhost:3333`

## front

Vá para o diretório front:
```bash
$ cd front
```

Instalar as dependências:
```bash
$ yarn
```

Iniciar o projeto em modo desenvolvimento:
```bash
$ yarn start
```
