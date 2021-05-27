import React, { useEffect, useState, useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider";
import ScoreDisplay from "./ScoreDisplay"

const ResultsView = ({ result, game, viewResult }) => {
    const [userProfile, setUserProfile] = useState({})
    const { getCurrentUser } = useContext(UserProfileContext);

    useEffect(() => {
        setUserProfile(getCurrentUser())

    }, [])


    return (
        <>
            {
                result.outcomes ?
                    <>
                        <h3>Great job taking the time to study</h3>
                        <h2> {userProfile.firstName}!</h2>
                        <h4>you got {result.outcomes.filter(Boolean).length} right out of {result.outcomes.length} question</h4>
                        <ScoreDisplay result={result} game={game} viewResult={viewResult} />
                    </>
                    : null
            }
        </>
    )
}
export default ResultsView;
