const joi= require('joi');
const adminSignupValidation=(req,res,next)=>{
    const schema= joi.object({
        username: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).max(30).required()
    });
    const { error }= schema.validate(req.body);
    if(error){
        return res.status(400).json({ message: "BAD REQUEST",error});
    }
    next();
}

const adminLoginValidation=(req,res,next)=>{
    const schema= joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(3).max(30).required()
    });
    const { error }= schema.validate(req.body);
    if(error){
        return res.status(400).json({ message: "BAD REQUEST",error});
    }
    next();
}
module.exports= {adminSignupValidation,adminLoginValidation};