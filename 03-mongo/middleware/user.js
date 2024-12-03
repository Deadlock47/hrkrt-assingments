async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = res.headers.username;
    const password = res.headers.password;
    const result = await User.find({
        username : username,
        password : password
    })
    // console.log(result);
    if(result.length!=0)
    {
        next()
    }
    else{
        res.status(403).json({msg : "Not an Admin"});
    }
    
}

module.exports = userMiddleware;