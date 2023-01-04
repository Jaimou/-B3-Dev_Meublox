import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLog = () => {


    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');


    const responseFacebook = (response) => {
        console.log(response);
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }


    return (
        <div>
            {!login}
            {login}

            {data.name}
            {data.email}

        </div>
    );
}
export default FacebookLog