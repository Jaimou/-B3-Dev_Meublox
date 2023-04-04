import { useState } from 'react';
import './Contact.scss';

const Contact = (props) => {

    const [status, setStatus] = useState("Submit");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };

        let response = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });

        setStatus("Submit");

        let result = await response.json();
        alert(result.status);
    };


    return (
        <div className='contact-page'>
            <h1>Contactez-nous !</h1>
            <div className='trait'></div>

            <form className='contact' onSubmit={handleSubmit}>
                <div className='form-div'>
                    <label htmlFor="name">Nom :</label>
                    <input className='contact-input' type="text" id="name" required />
                </div>
                <div className='form-div'>
                    <label htmlFor="email">Email :</label>
                    <input className='contact-input' type="email" id="email" required />
                </div>
                <div className='form-div'>
                    <label htmlFor="message">Message:</label>
                    <textarea className='contact-input' id="message" required />
                </div>
                <button type="submit">{status}</button>
            </form>
        </div>
    );
};

export default Contact