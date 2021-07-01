
const productionErrors = (err,req,res,next)=>{
    res.status(err.status || 500).json({
        message : 'Internal server error.'
    });
}
const mongooseErrors = (err)=>{

    if(!err.errors)
        return next(err);
    const errorKeys = Object.keys(err.errors);
    let message="";
    errorKeys.forEach((key)=>(
        message+= err.errors[key].message + ', '));
    message = message.substr(0,message.length-2);
    return message;
}

const catchErrors = (fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            if(typeof err === "string" )
            {
                res.status(400).json({
                    message: err
                });
            }else{
                next(err);
            }
        });
    }
}
const notFound = (req,res,next)=>{
    res.status(404).json({
        message : 'Page not found.'
    });
}
module.exports = {
    mongooseErrors,
    productionErrors,
    catchErrors,
    notFound
}
