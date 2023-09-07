"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/*
 @parametres: this required three input
 @checks if the user exist and return 400 status code if so
 @creates new user if not and returns 200 status code
 @constraints: password should be 2 minlength
*/
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Receives information from the client
    const { username, email, password } = req.body;
    try {
        // checks if the user exists
        const existingUser = user_1.default.findOne({ email: email });
        if (!existingUser) {
            const hashedPassword = yield bcryptjs_1.default.hashSync(password, 10);
            // creating and making new user assume the data construct
            const newUser = new user_1.default({
                username,
                email,
                password: hashedPassword
            });
            yield newUser.save();
            res.status(200).json({ message: 'User created succesfully' });
        }
        res.status(400).json({ message: 'Bad request, user already exist' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(err.message);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // find user
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // checking the password
        const passwordValidation = yield bcryptjs_1.default.compareSync(password, user.password);
        if (!passwordValidation) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        /*
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h', // Token expires in 1 hour
            });

        res.status(200).json({ token, userId: user._id });
        */
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(err.message);
    }
});
exports.login = login;
