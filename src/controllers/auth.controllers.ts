import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import bcrypt from 'bcryptjs';

/*
 @parametres: this required three input
 @checks if the user exist and return 400 status code if so
 @creates new user if not and returns 200 status code
 @constraints: password should be 2 minlength
*/
export const signup = async (req:Request, res:Response): Promise<void>  => {
    // Receives information from the client
    const { username, email, password } = req.body;
    
    try {
        // checks if the user exists
        const existingUser = User.findOne({email: email});
        if (!existingUser) {
            const hashedPassword = await bcrypt.hashSync(password, 10);
            
            // creating and making new user assume the data construct
            const newUser: IUser = new User({
                username,
                email,
                password: hashedPassword
            });
            await newUser.save();
            res.status(200).json({message: 'User created succesfully'});
        }
        res.status(400).json({message: 'Bad request, user already exist'})
    } catch (err: any) {
        res.status(500).json({message: 'Internal server error'})
        console.log(err.message);
    }
}

export const login = async (req:Request, res:Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // find user
        const user = await User.findOne({email});
        if (!user) {
            res.status(401).json({message: 'Unauthorized'})
            return;
        }
        // checking the password
        const passwordValidation = await bcrypt.compareSync(password, user.password);

        if (!passwordValidation) {
            res.status(401).json({message: 'Invalid password'});
            return;
        }
        /*
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h', // Token expires in 1 hour
            });

        res.status(200).json({ token, userId: user._id });
        */

    } catch (err: any) {
        res.status(500).json({message: 'Internal server error'});
        console.log(err.message);
    }
}

