import express from "express";
import { ApolloServer } from '@apollo/server';
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from '@apollo/server/express4'; 
import axios from "axios";

async function startServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                name: String!
                email: String!
                phone: String!
            }

            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                userId: ID!
                user: User
            }

            type Query {
                getTodos: [Todo]
                getUser: [User]
                getUserbyid(id: ID!): User
            }
        `,
        resolvers: {
            Todo: {
                // Fetch the user for each Todo by userId
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data,
            },
            Query: {
                // Fetch all todos
                getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
                
                // Fetch all users
                getUser: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

                // Fetch a user by ID
                getUserbyid: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            }
        }
    });

    // Middlewares
    app.use(bodyParser.json());
    app.use(cors());

    // Start the Apollo GraphQL server
    await server.start();
    
    // GraphQL endpoint
    app.use("/graphql", expressMiddleware(server));

    // Start the Express server
    app.listen(4000, () => {
        console.log("Server is started at port 4000");
    });
}

startServer();
