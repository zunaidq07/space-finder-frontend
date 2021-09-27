import React, { SyntheticEvent } from 'react';
import { AuthService } from '../services/AuthService';
import { User } from '../model/Model';
import history from '../utils/history';

interface LoginProps {
    authorService: AuthService
    setUser: (user: User) => void
}

interface LoginState {
    userName: string,
    password: string,
    loginAttempted: boolean,
    loginSuccesful: boolean
}

interface customEvent {
    target: HTMLInputElement
}
export class Login extends React.Component<LoginProps, LoginState> {

    state: LoginState = {
        userName: '',
        password: '',
        loginAttempted: false,
        loginSuccesful: false
    }

    private setUserName(event: customEvent) {
        this.setState({userName: event.target.value});
    }

    private setPassword(event: customEvent) {
        this.setState({password: event.target.value});
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        this.setState({loginAttempted: true})
        const result = await this.props.authorService.login(
            this.state.userName,
            this.state.password
        );
        if(result){
            this.setState({loginSuccesful: true})
            this.props.setUser(result);
            history.push('/profile');
        }
        else{
            this.setState({loginSuccesful: false})
        }
    }

    render() {
        let loginMessage: any;
        if(this.state.loginAttempted) {
            loginMessage = this.state.loginSuccesful ? 
                <label style={{float: "right"}}>Login Succesful!!!</label> : 
                <label style={{float: "right"}}>Login fail</label>;
        }
        return (
            <div>
                <h1>Please Login!</h1>
                <form onSubmit={e=>this.handleSubmit(e)}>
                    <input value={this.state.userName} onChange={e => this.setUserName(e)} /><br/>
                    <input value={this.state.password} type="password" onChange={e => this.setPassword(e)}/><br/>
                    <input type="submit" value="Login" />
                </form>
                {loginMessage}
            </div>
        )
    }
}