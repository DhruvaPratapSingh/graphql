## install tsconfig.json
[](npx tsc --init)

## build folder --> npx tsc
## for running ts file
# npm add tsc-watch -D

# server start ⤵️
## npm run dev

## http://localhost:4000/graphql

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