const { verifytoken } = require("../helper/jwt_token");

// response
const response = require("../helper/response");
// response

const user_model = require("../model/user.model");


module.exports = {

    authjwt:(req,res,next)=>{
        // const token = req.headers.authorization?.split(' ')[1];
        const authorization = req.headers.authorization || "";
        let token = authorization.replace("Basic ", "");
        token = token.replace("Bearer ", "");
        verifytoken(token, async(err, payload) => {
            // console.log(payload);
            if (err) {
                return response.unauthorized({
                    isTokenExpired: true,
                    message: "You are not authorized to access this endpoint, token is invalid or expired"
                }, res);
            } else {
                let user = await user_model.getAccount({id:payload.id});
                if (!user) {
                    return response.unauthorized({
                        isTokenExpired: true,
                        message: "Account not found, please register first"
                    }, res);
                }else{
                    req.decoded = payload;
                    // console.log(payload.id," ID USER");
                    next();
                }
            }
        });
    },

    authIsAdmin:(req,res,next)=>{
        if (req.decoded.is_admin === 1) {
            next();
        } else {
            return response.unauthorized({
                isTokenExpired: true,
                message: "You role is not authorized to access this endpoint, this by admin only"
            }, res);
        }
    },

};
