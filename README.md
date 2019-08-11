# orbita-challenge
Orbita development challenge

## api

Para iniciar a api em modo de desenvolvimento

Deve-se iniar o banco de dados

```bash
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5432 -d -t postgres
```

Depois rodar a api

```bash
$ cd api && yarn dev
```

Isso vai rodar a api no endereço `http://localhost:3333`
