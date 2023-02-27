const FiltreAlphabetique = (props) => {

    const data = props.data;

    const triAlphabetique = () => {
        let inputAlpha = document.getElementById("alphabetique");
        if (inputAlpha.value === 1) {
            data.sort();
            inputAlpha.value = 0
            return data
        }
        else {
            data.sort((a, b) => a.Index - b.Index);
            inputAlpha.value = 1
            return data
        }
    }




    return (
        <div className="filtre">
            <div className="alphabetique">
                <input id="alphabetique" type="checkbox" value={1} onInput={triAlphabetique} />
                <p>A-Z</p>
            </div>
        </div>
    )
}

export default FiltreAlphabetique