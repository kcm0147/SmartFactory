import React, {useState} from 'react';
import './Registerform.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function Registerform(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    alert("회원가입에 성공하였습니다.");
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
    }

    return (
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                            <div class="card-body">
                                <h4 class="card-title text-center">Smart Factory Platform</h4>
                                <h5 class="card-title text-center">Sign Up</h5>
                                <form class="form-signin" style={{ display: 'flex', flexDirection: 'column' }}
                                    onSubmit={onSubmitHandler}>
                                    <div class="form-label-group">
                                        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" value={Email} onChange={onEmailHandler}/>
                                        <label for="inputEmail">Email address</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="text" id="inputName" class="form-control" placeholder="Name" value={Name} onChange={onNameHandler} required autofocus />
                                        <label for="inputName">Name</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="password" id="inputPassword" class="form-control" placeholder="Password" value={Password} onChange={onPasswordHandler} required />
                                        <label for="inputPassword">Password</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="password" id="inputConfirmPassword" class="form-control" placeholder="Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} required />
                                        <label for="inputConfirmPassword">Confirm Password</label>
                                    </div>
                                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Un</button>
                                    {/* <hr class="my-4">
                    <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                    <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                  </hr> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
export default withRouter(Registerform)
