const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/Key');
const {auth} = require('./middleware/auth');
const {User} = require("./models/User");
const port = 5000

//새로운 컴포넌트 = higherOrderComponent(다른 컴포넌트) 


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//apllication/json 분석해서 가져올 수 있음
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {//'mongodb+srv://ggolong:kwon0879@ggolong.rxnj0.mongodb.net/ggolong?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world~ '));
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    }); // mongoDB 함수

})
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return res.json({
            loginSuccess: false,
            messagge: "제공된 이메일에 해당하는 유저가 없습니다."
        })

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 같은지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) // isMatch를 가져오기 위해서 User.js 에서 처리해놓고 받음
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            // 비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err); // 400 -> 에러, err메세지도 함께 send
                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지... F12눌러서 application에서 저장영역 확인 가능
                //일단 여기서는 쿠키에 저장한다
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            })

        }) // isMatch로 비교결과

    })
});

app.get('/api/users/auth', auth, (req, res) => { 
    // auth는 middle-ware. callback 함수를 호출하기 전에 실행
    
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말
    res.status(200).json({
        _id: req.user._id, // 미들웨어에서 req.user에 id값을 넣어놨기 때문에 이렇게 사용 가능
        isAdmin: req.user.role === 0 ? false: true, // role 0 : 일반유저, 나머지 : 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) =>{
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""} // 토큰을 지워줌.
        ,(err, user) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    ) // 미들웨어에서 가져와서 찾아줌
})

app.get('/api/hello', (req, res) => {
    res.send("안뇨오오오옹");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
