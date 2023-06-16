import React, { useState } from 'react';
import './UsersTable.scss'

const UserTable = (props) => {

    let users = props.users;
    const setUserId = props.setUserId;
    const setInputs = props.setInputs;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);

    // Calcul du numéro de la dernière page
    const lastPageIndex = currentPage * usersPerPage;
    const firstPageIndex = lastPageIndex - usersPerPage;

    // Pagination : Récupération des utilisateurs actuels
    const currentUsers = users.slice(firstPageIndex, lastPageIndex);


    // Changement de page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const deleteUser = async (userId) => {

        let request = await fetch(`http://localhost:8000/users/${userId}`, {
            method: 'DELETE',
        })
        let responseProfile = await request.json();
    }

    const chooseUser = (user) => {
        let selectedUser = { email: user.email, is_admin: user.role, password: "" }
        setInputs(selectedUser)
        setUserId(user._id);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Administrateur</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <>
                            <tr key={user._id}>
                                <td>
                                    <button onClick={() => chooseUser(user)}>Selectionner</button>
                                </td>
                                <td>{user._id}</td>
                                <td >{user.email}</td>
                                <td>
                                    <input className='checkbox' type="checkbox" checked={user.role == "admin"} disabled />
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(user._id)}>Supprimer</button>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>

            <div>
                {users.length > usersPerPage && (
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => {
                            if (currentPage == index + 1) {
                                return (

                                    <li className='is-selected' key={index} onClick={() => paginate(index + 1)}>
                                        <a href="#!" >{index + 1}</a>
                                    </li>
                                )
                            }
                            else {
                                return (

                                    <li key={index} onClick={() => paginate(index + 1)}>
                                        <a href="#!">{index + 1}</a>
                                    </li>
                                )
                            }

                        }
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserTable;
