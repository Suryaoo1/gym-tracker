const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/db');


const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRES_IN || "7d"
    });
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        if (name == "" || password == "" || email == ""){
            return res.json({error : "Please provide required details to complete the registration"});
        }

        const existing = await db.query("select * from users where email = ?", [email]) 
        if(existing.length > 0) {
            return res.status(400).json({error : "Email already in use"})
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const result = await db.query("insert into users (name, email, password) values (?,?,?)", [name, email, passwordHash]);

        const token = generateToken(result.insertId);
        return res.status(200).json({token, user : {id : result.insertId, name, email}})
    }
    catch (err){
        console.log(err);
        return res.status(400).json({error : "Registeration Failed!!!"})
    }
};