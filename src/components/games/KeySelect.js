import React from "react";
import { Col, Input } from "reactstrap";

const KeySelect = ({ setKey }) => {

    const handleSelect = e => {
        setKey(e.target.value)
    }


    const keys = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"]
    return (
        <Col sm="12" md={{ size: 2, offset: 5 }}>
            <Input type="select"
                name="keySelect"
                id="keySelect"
                className="form-select my-5"
                onChange={handleSelect}>
                {keys.map(key => (
                    <option value={key} key={key}>{key}</option>
                ))}
            </Input>
        </Col>

    )
};
export default KeySelect;