import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Col } from "reactstrap";
import ReactCardFlip from 'react-card-flip';
import "./NTIQuestionCard.css"


const NTIQuestionCard = ({ result, isFlipped, scale }) => {
    // const [isFlipped, setIsFlipped] = useState(false)

    const [vertFlip, setFlip] = useState(true)

    // const handleClick = (e) => {
    //     flipRandomizer()
    //     e.preventDefault();
    //     setCorrect(false);
    //     setIsFlipped(!isFlipped);
    // }
    const convertCharIntervalToNumericInterval = (intString) => {
        const correctObj = scale.find(interval => interval.stringName === intString)
        return correctObj.interval;
    }

    const convertHalfStepsToInterval = (intString) => {
        const correctObj = scale.find(interval => interval.stringName === intString)
        return correctObj.interval;
    }

    const flipRandomizer = () => {
        const num = Math.floor(Math.random() * 10)
        if (num >= 4) {
        } else {
            setFlip(!vertFlip);
        }
    }
    return (
        <Col className="d-flex justify-content-center">
            <ReactCardFlip
                // className="d-flex justify-content-center"
                isFlipped={isFlipped}
                flipDirection={vertFlip ? "vertical" : "horizontal"}>
                <Card className="gameCard d-flex justify-content-center">
                    What interval of <br />
                    <h2>{result.result.key}</h2>
                        is at<br />
                    <h2>fret {result.questions.slice(-1)[0][0]}</h2>
                        on<br />
                    <h2>string {result.questions.slice(-1)[0][1] + 1}</h2>
                </Card>

                {//Back of car with answer
                }
                <Card id="gameCard" className={result.outcomes ? result.outcomes.slice(-1)[0] ? "isCorrect gameCard pt-4 d-flex justify-content-center" : "isIncorrect gameCard  pt-2 d-flex justify-content-center" : null}>
                    {result.outcomes ? (<>
                        {result.outcomes.slice(-1)[0] ?
                            <h1>Correct!</h1>
                            : <h1>Incorrect!</h1>}
                        <h2>fret {result.questions.slice(-2, -1)[0][0]}, string {result.questions.slice(-2, -1)[0][1] + 1}</h2>
                        is the<br />
                        {result.outcomes.slice(-1)[0] ?
                            //display correct answer
                            (
                                <h2 className="isCorrectAns">
                                    {convertCharIntervalToNumericInterval(result.answerList.slice(-1)[0])}
                                </h2>) :
                            //displays incorrect and correct answer
                            (
                                <>
                                    <h2 className="isIncorrectAns">
                                        {convertCharIntervalToNumericInterval(result.answerList.slice(-1)[0])}
                                    </h2>
                                    <h2>
                                        {convertCharIntervalToNumericInterval(result.correctAnswerList.slice(-2, -1)[0])}
                                    </h2>
                                </>)}
                        <h4>degree of {result.result.key}</h4>
                    </>) : null}
                </Card>
            </ReactCardFlip>
        </Col >

        //give correct/incorrect via toast or a flipping card

    )
};
export default NTIQuestionCard