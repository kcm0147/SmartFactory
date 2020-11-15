const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10; // salt를 이용해서 비밀번호를 암호화, saltRounds 는 몇글자인지 지정.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, 
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 검사
        type: String
    },
    tokenExp: { // 토큰 유효기간
        type: Number
    },
})

userSchema.pre('save', function(next){ // 몽구스 메소드. userSchema를 save하기 전에 수행하는 함수.
    var user = this; // userSchema를 나타냄
    if(user.isModified('password')){ //  비밀번호를 바꿀 때만 시행
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err); // next하면 user.save로 그냥 넘어가버림.
            // hash(순수한 비밀번호, ,)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash; 
                next();
        })
    })
    } else{
        next();
    }
}); // user model에 정보를 저장하기 전에 함수를 수행

// index.js에서 comparePassword와 같이 바꿔야함.
userSchema.methods.comparePassword = function(plainPassword, cb){ // 입력하는 플레인 패스워드랑 콜백함수
    //plainPassword 1234567, 암호화된 비밀번호 ~~~~~ 같은지 체크
    // 암호화시켜서 디비 비밀번호와 같은지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return console.log(err);
        cb(null, isMatch); // isMath : true인지 false인지.. index.js의 compare에서 콜백으로 값을 받음
    })
}

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token을 생성하기
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken') // user._id를 'secretToken' 과 합쳐서 토큰 생성
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user) // cb(에러는 없고, user정보)
    })
    // user._id + 'secretToken' = token 생성, 나중에 'secretToken' 를 넣으면 user._id가 나옴
}

// static : 객체의 인스턴스가 없어도 사용 가능
// methods : 객체의 인스턴스를 생성 후 instance.메소드 처럼 호출
userSchema.statics.findByToken = function(token, cb){
    var user = this;
    
    // user._id + '' = token 형태였음
    //토큰을 decode한다.

    jwt.verify(token, 'secretToken', function(err, decoded){ // 만들때 secretToken을 써서 만들었기때문
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        }) // MongoDB 메소드

    })
}

const User = mongoose.model('User', userSchema); // model로 감싸줌
module.exports = {User};
