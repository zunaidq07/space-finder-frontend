import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserAttribute } from '../model/Model';
import { AuthService } from '../services/AuthService';


interface ProfileProps {
    user: User | undefined
    authService: AuthService
}

interface ProfileState {
    userAttributes: UserAttribute[]
}
export class Profile extends React.Component<ProfileProps, ProfileState>{

    async componentDidMount() {
        if(this.props.user) {
            const userAttr = await this.props.authService.getUserAttribute(this.props.user);
            this.setState({
                userAttributes: userAttr
            })
        }
    }

    state: ProfileState = {
        userAttributes: []
    }

    private renderUserAttributes() {
        let rows = [];
        for (const userAttribute of this.state.userAttributes) {
            rows.push(<tr key={userAttribute.name}>
                <td>{userAttribute.name}</td>
                <td>{userAttribute.value}</td>
            </tr>)
        }
        return <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    }

    render(){
        let profileSpace: any;
        profileSpace = this.props.user ? 
            <div>
                <h3>Hello {this.props.user.userName} </h3>
                Here are you some Attributes:
                {this.renderUserAttributes()}
            </div>
             :
            <div>Please <Link to="/login">login</Link></div>
        return (
            <div>
                <h3>Welcome to the Profile Page!</h3>
                {profileSpace}
            </div>
            
        )
    }
}