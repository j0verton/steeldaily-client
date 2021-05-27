import React, { useEffect, useState } from "react";
import "./FindUnisonNotes.css"

function FindUnisonNotes({ result, answers, setAnswers, updateOutcomes }) {
    const [noteTarget, setNoteTarget] = useState()

    useEffect(() => {
        if (result.chromaticFretboard) {
            const coordinates = result.question;
            const coordiNote = result.chromaticFretboard.fretboard[coordinates[0]][coordinates[1]]
            setNoteTarget(coordiNote)
        }
    }, [result])

    const handleNoteClick = e => {
        e.target.style.visibility = "visible"
        const [prefix, coords] = e.target.id.split("--");
        let updatedAnswers = ''
        if (answers.length === 0) {
            updatedAnswers = coords;
        } else if (answers.length >= 1) {

            updatedAnswers = answers += `,${coords}`;
        }
        setAnswers(updatedAnswers);
        if (e.target.classList.contains("incorrect")) {
            updateOutcomes(false)
        } else if (e.target.classList.contains("correct")) {
            updateOutcomes(true)
        }
    }

    return (
        <>
            {result.chromaticFretboard ? result.chromaticFretboard.fretboard.map((fret, i) => {
                return fret.map((note, j) => {
                    return (
                        <circle
                            pointerEvents="bounding-box"
                            key={`${i}-${j}`}
                            id={`note--${i},${j}`}
                            className={noteTarget === result.chromaticFretboard.fretboard[i][j] ? "correct" : "incorrect"}
                            //add a class correct or incorrect based on note
                            cx={21 + (110 * i)} cy={25 + (34 * j)} r="15"
                            //change fill color based on correct incorrect
                            visibility={(i === result.question[0] && j === result.question[1]) ? "visible" : "hidden"}
                            // maybe saves wrong guesses or total guesses til all have been found?
                            onClick={handleNoteClick}
                        />
                    )
                });
            }) : null}
        </>
    )
}
export default FindUnisonNotes;
