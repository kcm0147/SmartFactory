const {User} = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err)  throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next(); // next가 없으면 이 미들웨어에 갖혀버림 

    }) // User 모델에 메소드를 만들어서 사용

    // 유저가 있으면 인증 OK

    // 유저가 없으면 인증 NO!

}
module.exports = {auth};