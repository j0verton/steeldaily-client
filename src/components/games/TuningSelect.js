import React, { useEffect, useState, useContext } from "react";
import { Col, Input } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const TuningSelect = ({ setTuning }) => {
    const { getToken } = useContext(UserProfileContext);
    const [tunings, setTunings] = useState()

    const handleSelect = e => {
        setTuning(e.target.value)
    }

    const getTunings = () => {
        return getToken()
            .then(token =>
                fetch(`/api/game/tunings`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).then(res => res.json())
            .then(res => {
                setTunings(res)
            })
    }

    useEffect(() => {
        getTunings()
    }, [])
    return (
        <>
            {tunings ?
                <Col sm="12" md={{ size: 2, offset: 5 }}>
                    <Input type="select"
                        name="tuningSelect"
                        id="tuningSelect"
                        className="form-select my-5"
                        onChange={handleSelect}>
                        {tunings.map(tuning => (
                            <option value={tuning.id} key={tuning.id}>{tuning.name}</option>
                        ))}
                    </Input>
                </Col>
                : null
            }
        </>
    )
};
export default TuningSelect;