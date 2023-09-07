"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const port = 5000;
mongoose_1.default.connect('mongodb://127.0.0.1:27017/graphql')
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log(err));
// // Connect to MongoDB (replace with your MongoDB connection string)
// mongoose.connect('mongodb://127.0.0.1:27017/graphql', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
// });
// App level middlewares
// body parser
app.use(body_parser_1.default.json);
app.use(body_parser_1.default.urlencoded({ extended: true }));
//GraphQL endpoint
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    graphiql: true,
}));
app.use('/auth', auth_routes_1.default);
app.listen(port, () => {
    console.log(`server running on ${port}`);
});
