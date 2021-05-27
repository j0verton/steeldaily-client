import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProfileContext } from "../providers/UserProfileProvider";
import Fretboard from "../components/games/Fretboard";
import FindUnisonNotes from "../components/games/FindUnisonNotes";
import ResultsView from "../components/games/ResultsView";
import ScoreDisplay from "../components/games/ScoreDisplay";


const UnisonFinderGame = () => {
    const { getToken } = useContext(UserProfileContext)
    const [game, setGame] = useState(false)
    const [viewResult, setViewResult] = useState(false);
    const [result, setResult] = useState({})
    const [answers, setAnswers] = useState([])
    const [outcomes, setOutcomes] = useState([])


    const startGame = () => {
        return getToken()
            .then(token =>
                fetch(`/api/game/unison`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).then(res => res.json())
            .then(res => {
                setResult(res)
            })
    }

    const updateOutcomes = (bool) => {
        const newOutcomes = outcomes.slice();
        newOutcomes.push(bool)
        setOutcomes(newOutcomes);
    }

    const submitAnswer = () => {
        const gameReturn = {
            resultId: result.result.id,
            answer: answers
        }
        return getToken()
            .then(token =>
                fetch(`/api/game/unison`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(gameReturn)
                })
            ).then(res => res.json())
            .then(res => {
                if (res.result.complete === true) {
                    setViewResult(true)
                    setGame(false)
                }
                setResult(res)
            })
    }

    async function startHandler() {
        await startGame()
        setGame(true)
    }

    return (
        <div className="game-area">
            {viewResult ? <>
                <ResultsView result={result} game={game} />
                <Button
                    onClick={() => {
                        setGame(false)
                        setViewResult(false)
                        setAnswers([])
                        setOutcomes(null)
                    }}>
                    Play Again
                        </Button>
            </> :
                <>
                    <div m="5" className="score-container">

                        <ScoreDisplay result={result} game={game} outcomes={outcomes} />
                    </div>
                    <div className="fretboard-container">
                        {game ? answers.length > 0 ? null : <h2>You will be scored based on your first 10 answers</h2>
                            : <>
                                <Button onClick={startHandler}>Start Game</Button>
                            </>
                        }
                        <Fretboard result={result} ><FindUnisonNotes updateOutcomes={updateOutcomes} result={result} answers={answers} setAnswers={setAnswers} /></Fretboard>
                    </div>

                    { answers.length > 1 ? answers.split(",").length > 18 ? <Button onClick={submitAnswer}>Submit</Button> : null : null}
                </>
            }
        </div >
    )
};
export default UnisonFinderGame;