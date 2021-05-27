import react from "react"
import { Col, Row } from "reactstrap";
import Star from "../Star";
// import 'bootstrap/dist/css/bootstrap.min.css';


const ScoreDisplay = ({ result, game, outcomes, viewResult }) => {

    return (
        <>
            {
                result.result && outcomes ?
                    <>
                        <h3>{result.result.tuning.name}{result.result.gameId === 1 || result.result.gameId === 2 ? `- Key of ${result.result.key}` : null}</h3>
                        <Row m="5">
                            <Col sm={{ size: 12, order: 2, offset: 1 }} className="d-flex flex-nowrap">
                                {outcomes.map((outcome, i) => {
                                    return <Star key={i} outcome={outcome} />
                                })}
                            </Col>
                        </Row>
                    </>
                    : game ? <h3>{result.result.tuning.name}{result.result.gameId === 1 || result.result.gameId === 2 ? `- Key of ${result.result.key}` : null}</h3> : viewResult ? null : <h3>Select A Key and a Tuning Then Begin</h3>
            }
        </>
    )
};
export default ScoreDisplay;