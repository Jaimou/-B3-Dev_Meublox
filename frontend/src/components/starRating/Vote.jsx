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
        if (allVotes == []) {
            return
        }
        if (allVotes.length > 0) {
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
        let finalUsersNotes = users_notes
        let finalUsersId = users_id

        let newNote = Number(setNewNote() + rate)


        if (users_id != null && users_id != []) {

            finalNewNote = newNote / (users_id.length + 1)
            finalUsersNotes.push(rate)
            finalUsersId.push(userId)


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
            await fetch(`http://localhost:8000/votes/`, requestOptionsFirst)
                .then(response => {
                    response.json();
                })

            // modification de la note produit
            await fetch(`http://localhost:8000/products/${productId}`, requestOptionsSecond)
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
                    <input type="number" name="vote" min={0} max={5} step={1} onChange={(e) => { setRate(e.target.value) }} />
                    <button type="button" onClick={createVote}> Voter</button>
                </div>
                :
                <p>Merci pour votre notation</p>

            }
        </div>
    )

}

export default Vote;