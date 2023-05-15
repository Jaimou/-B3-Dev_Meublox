import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


import './Contact.scss';

const Contact = () => {

    emailjs.init('faOwZjoyYAE0l3C-f');

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        message: '',
        subject: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    const validate = (inputs) => {
        let errors = {};
        if (!inputs.name) {
            errors.name = 'Le nom est obligatoire';
        }
        if (!inputs.email) {
            errors.email = 'L\'adresse email est obligatoire';
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            errors.email = 'L\'adresse email est invalide';
        }
        if (!inputs.message) {
            errors.message = 'Le message est obligatoire';
        }
        if (!inputs.subject) {
            errors.message = 'Le Sujet du message est obligatoire';
        }
        return errors;
    };

    const form = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        emailjs.sendForm("service_i1xw8yu", "template_meublox", form, "faOwZjoyYAE0l3C-f").then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
    };


    return (
        <div className='contact-page'>
            <h1>Contactez-nous !</h1>
            <div className='trait'></div>

            <form ref={form} className="contact" onSubmit={handleSubmit}>
                <div className="form-div">
                    <label htmlFor="name">Nom: </label>
                    <input
                        className="contact-input"
                        type="text"
                        id="name"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-div">
                    <label htmlFor="email">Email: </label>
                    <input
                        className="contact-input"
                        type="email"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-div">
                    <label htmlFor="subject">Sujet: </label>
                    <input
                        className="contact-input"
                        type="text"
                        id="subject"
                        name="subject"
                        value={inputs.subject}
                        onChange={handleInputChange}
                    />
                    {errors.name && <span className="error">{errors.subject}</span>}
                </div>

                <div className="form-div">
                    <label htmlFor="message">Message: </label>
                    <textarea
                        className="contact-input"
                        id="message"
                        name="message"
                        value={inputs.message}
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default Contact