import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './FacebookLog.scss'

export default class FacebookLog extends Component {
    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
    };

    responseFacebook = (response) => {
        console.log(response);
        if (response.status !== "unknown") {
            this.setState({
                isLoggedIn: true,
                userID: response.userID,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url
            });
        }
    };

    componentClicked = () => {
        console.log("clicked");
    };

    render() {
        const { email, isLoggedIn, name, picture } = this.state;
        let fbContent;

        if (isLoggedIn) {
            fbContent = (
                <div>
                    <img src={picture} alt={name} />
                    <h2>Welcome {name}</h2>
                    Email: {email}
                </div>
            );
        } else {
            fbContent = (
                <FacebookLogin
                    appId="2193887884135559"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    icon="fa-facebook"
                />
            );
        }
        return <div>{fbContent}</div>;
    }
}
