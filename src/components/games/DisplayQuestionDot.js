import React from "react"

const DisplayQuestionDot = ({ result }) => {

    if (!result.fretboard) { return null }
    return (
        <>
            {
                result.fretboard.intFretboard.map((fret, i) => {
                    return fret.map((note, j) => {
                        return (
                            <circle
                                key={`${i}-${j}`}
                                id={`note--${i}-${j}`}
                                cx={21 + (110 * i)} cy={25 + (34 * j)} r="15"
                                fill="#39FF14"
                                visibility={(i === result.questions.slice(-1)[0][0] && j === result.questions.slice(-1)[0][1]) ? "visible" : "hidden"}
                            />

                        )
                    });
                })
            }
        </>
    )

}
export default DisplayQuestionDot;