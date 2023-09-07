import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema/schema';
import router from './routes/auth.routes';

const app = express();
const port = 5000 as Number

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/graphql')
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log(err))


// App level middlewares
// body parser
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

//GraphQL endpoint
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);
app.use('/auth', router);


app.listen(port, () => {
    console.log(`server running on ${port}`)
})