import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const fun=async()=>{
    const app=express();
const PORT=Number(process.env.PORT) || 4000;
app.use(express.json());
// create graphqlserver
const gqlserver=new ApolloServer({
    typeDefs:`
    type Query{
    hello:String
    say(name:String):String
    }
    `, // schema
    resolvers:{
        Query:{
            hello:()=>`hey sir you are using graphql`,
            say:(_,{name}:{name:String})=>`hey ${name}, How are you ?`,
        },
    },
})

// start gql server
await gqlserver.start();

app.get("/",(req,res)=>{
    res.json({message:"Server is upto date and running...."})
})
app.use("/graphql",expressMiddleware(gqlserver));
app.listen((PORT),()=>{
    console.log(`connection is successfully run at port ${PORT}`);

})
}
fun();