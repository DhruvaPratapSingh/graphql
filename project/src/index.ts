import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from "./lib/db";

const fun = async () => {
    const app = express();
    const PORT = Number(process.env.PORT) || 4000;
    app.use(express.json());

    // Create GraphQL server
    const gqlserver = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
        type Mutation {
            createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
        }
        `, // Schema
        resolvers: {
            Query: {
                hello: () => `Hey sir, you are using GraphQL`,
                say: (_, { name }: { name: string }) => `Hey ${name}, how are you?`,
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
                    await prismaClient.user.create({
                        data: {
                            email,
                            firstName,
                            lastName,
                            password,
                            salt: 'random_salt',
                        },
                    });
                    return true;
                },
            },
        },
    });

    // Start GraphQL server
    await gqlserver.start();

    app.get("/", (req, res) => {
        res.json({ message: "Server is up to date and running..." });
    });

    app.use("/graphql", expressMiddleware(gqlserver));

    app.listen(PORT, () => {
        console.log(`Connection is successfully running at port ${PORT}`);
    });
};

fun();
