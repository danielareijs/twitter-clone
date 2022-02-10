import React from "react";
import { getLoginToken } from "../services/token";

class Login extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    async handleLogin(e){
        e.preventDefault();
        const { history } = this.props;

        try {
        const { token } = await getLoginToken({
            username: this.state.username,
            password: this.state.password,
        });

        if (!token) {
            throw new Error('Unsuccessful login');
        }

        localStorage.setItem('twitter_clone_token', token);

        history.goBack();
        } catch (error) {
        console.log(error);
        }
    }

    handleChange(e, field){
        this.setState({
            [field]: e.target.value
          });
    }

    render(){
        return(
            <div className="content-container">
                <form className="login-form" onSubmit={(e) => this.handleLogin(e)}>
                    <div>
                        <label>Username:
                            <input type="text" onChange={(e) => this.handleChange(e, 'username')}/>
                        </label>
                    </div>
                    <div>
                        <label>Password:
                            <input type="text" onChange={(e) => this.handleChange(e, 'password')}/>
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>
        )
    }
}




export default Login;