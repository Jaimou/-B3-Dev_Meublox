import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useParams } from "react-router-dom";

const Vote = (props) => {

    const productId = useParams().productId
    const token = sessionStorage.getItem("token");
    const myDecodedToken = decodeToken(token);
    const userId = myDecodedToken.user_id


    const [alreadyVoted, setAlreadyVoted] = useState(false)
    const [allVotes, setAllVotes] = useState([])
    const [rate, setRate] = useState(0)

    let note = props.note;
    let users_notes = props.users_notes;
    let users_id = props.users_id;

    useEffect(() => {
        callVotesApi();
    }, [])

    const checkVotes = () => {
        console.log(allVotes.length)
        if (allVotes == []) {
            return
        }
        if (allVotes.length > 0) {
            console.log(allVotes)
            allVotes.forEach(vote => {
                if (productId == vote.product_id) {
                    setAlreadyVoted(true)
                }
            });
        }
    }

    useEffect(() => {
        checkVotes()
    }, [allVotes])

    const callVotesApi = async () => {
        const requestOptionsFirst = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            let result = await fetch(`http://localhost:8000/votes`, requestOptionsFirst)
            let response = await result.json()
            setAllVotes(response);
        }
        catch (e) {
            console.log(e.message)
        }
    }


    const setNewNote = () => {
        console.log(users_notes)
        if (users_notes != null) {
            let newNote = 0
            users_notes.forEach(note => {
                newNote = newNote + note;
                return newNote
            });
        }
        return 0

    }


    const createVote = async () => {

        let finalNewNote = 0
        let finalUsersNotes = []
        let finalUsersId = []

        let newNote = setNewNote() + rate

        if (users_id != null) {

            finalNewNote = newNote / (users_id.length + 1)
            finalUsersNotes = users_notes.push(rate)
            finalUsersId = users_id.push(userId)

        }
        else {
            finalNewNote = newNote
            finalUsersNotes.push(rate)
            finalUsersId.push(userId)
        }

        const requestOptionsFirst = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
                rating: rate,
            })
        };

        const requestOptionsSecond = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                note: finalNewNote,
                users_notes: finalUsersNotes,
                users_id: finalUsersId
            })
        };

        // creation du VOTE
        try {
            fetch(`http://localhost:8000/votes`, requestOptionsFirst)
                .then(response => {
                    response.json();
                })

        }
        catch (e) {
            console.log(e.message)
        }

        // modification de la note produit
        try {
            fetch(`http://localhost:8000/products/${productId}`, requestOptionsSecond)
                .then(response => {
                    response.json();
                })
        }
        catch (e) {
            console.log(e.message)
        }

    }



    return (
        <div >
            {!alreadyVoted ?
                <div className="vote-div">
                    <label htmlFor="vote">Votre note :</label>
                    <input type="number" name="vote" min={0} max={5} step={0.5} onChange={(e) => { setRate(e.target.value) }} />
                    <button type="button" onClick={createVote}> Voter</button>
                </div>
                :
                <p>Merci pour votre notation</p>

            }
        </div>
    )

}

export default Vote;