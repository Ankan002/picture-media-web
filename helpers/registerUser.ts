const User = require('../models/User');
import dbConnect from "../database/connectToDB";


export const registerUser = async(
    name: String,
    username: String,
    email: String,
    providerId: String,
    image: String,
    githubProfile?: String
) => {
    try{
        await dbConnect();

        const user = await User.findOne({providerId});

        if(!user){
            const newUserObject = {
                name,
                username,
                email,
                providerId,
                image,
                githubProfile: (typeof(githubProfile) !== 'undefined') ? githubProfile : '',
                likes: 0
            };

            const newUser = await User.create(newUserObject);

            return true;
        }

        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}