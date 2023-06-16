import { useRef, useState } from "react";
import { decodeToken } from "react-jwt";
import './Users.scss'
import UserTable from "./UsersTable";

const Users = (props) => {
    let users = props.users;



    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("")
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        is_admin: false
    });

    const profilForm = useRef();

    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    const validate = () => {
        let errors = {};
        if (!inputs.email) {
            errors.email = 'L\'adresse email est obligatoire';
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            errors.email = 'L\'adresse email est invalide';
        }
        return errors;
    };




    const modifySubmit = () => {

        let adminValue = false

        if (inputs.is_admin == "admin") {
            adminValue = true
        }
        else {
            adminValue = false
        }

        // methode put pour modifier le user
        const requestOptionsFirst = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password,
            })
        };

        const requestOptionsSecond = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                is_admin: adminValue,
                role: inputs.is_admin,
            })
        };
        fetch(`http://localhost:8000/users/${userId}`, requestOptionsFirst)
            .then(response => {
                response.json();
            })

        fetch(`http://localhost:8000/users/${userId}/admin`, requestOptionsSecond)
            .then(response => {
                response.json();
            })

    }

    return (
        <>
            <div className="profil-infos">
                <div className="profil-form">
                    <form ref={profilForm} className="profil-form" onSubmit={modifySubmit}>
                        <div className="form-div">
                            <label htmlFor="email">Email: </label>
                            <input
                                className="contact-input"
                                type="email"
                                required={true}
                                id="email"
                                name="email"
                                value={inputs.email}
                                onChange={() => { handleInputChange(); validate() }}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="form-div">
                            <label htmlFor="password">Password: </label>
                            <input
                                className="contact-input"
                                type="password"
                                required={true}
                                id="password"
                                name="password"
                                value={inputs.password}
                                onChange={() => { handleInputChange(); validate() }}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div >
                            <label htmlFor="is_admin">Administrateur</label>
                            <input className="checkbox" type="checkbox" id="is_admin" name="is_admin" value={inputs.is_admin} />
                        </div>

                        <button type="button" onClick={modifySubmit}>Valider</button>
                    </form>
                </div>
                <div className="users-table">
                    <UserTable users={users} setInputs={setInputs} setUserId={setUserId} />

                </div>

            </div>
        </>
    )
}

export default Users