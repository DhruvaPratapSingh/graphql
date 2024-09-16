## apollo server 
[click here](https://localhost:4000/graphql)

## project readme

# graphql express reference
[click here](https://www.apollographql.com/docs/apollo-server/api/express-middleware/)

# install tsconfig.json
```
[](npx tsc --init)
```
# build folder --> npx tsc
# for running ts file
```
npm add tsc-watch -D
```
# server start ⤵️
```
 npm run dev
```
# http://localhost:4000/graphql

# query 
```
query Query($name: String) {
  say(name: $name)
  hello
}

{
  "name": "dhruva"
}
```

# docker compose up
 for postgresql connection setup

# running docker in background
 ➡️➡️ docker compose up -d

# prisma
```
 npm install typescript ts-node @types/node -D
 npm add prisma -D
 npx prisma init

```
 # docker cmds
```
 docker ps
 docker exec -it 40e3ea082d8d bash
 su postgres
 psql
 \l
 \d
\c threads
\x
SELECT * FROM users;

```
