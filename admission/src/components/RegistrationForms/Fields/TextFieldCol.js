import React from "react"
import { Row, Col, Form } from "react-bootstrap"
import { useState, useContext } from "react"
import { FieldsContext } from "../../States/FieldStates"

export default function TextFieldCol({ title, placeholder, controlId }) {

    const { placeOfBirthState, religionState, casteNameState, nationalityState, cityState, districtState, guardianCityState, guardianDistrictState, PANNoState, CETScoreState, JEEMainsScoreState, JEEAdvancedScoreState } = useContext(FieldsContext)

    const [ placeOfBirth, setPlaceOfBirth] = placeOfBirthState
    const [ religion, setReligion] = religionState
    const [ casteName, setCasteName ] = casteNameState
    const [ nationality, setNationality] = nationalityState
    const [ city, setCity ] = cityState
    const [ district, setDistrict ] = districtState 
    const [ guardianCity, setGuardianCity ] = guardianCityState
    const [ guardianDistrict, setGuardianDistrict ] = guardianDistrictState
    const [ PANNo, setPANNo] = PANNoState
    const [ CETScore, setCETScore ] = CETScoreState
    const [ JEEMainsScore, setJEEMainsScore ] = JEEMainsScoreState
    const [ JEEAdvancedScore, setJEEAdvancedScore ] = JEEAdvancedScoreState
    
    return (
      <div>
        <Form.Group controlId={controlId}>
          <Form.Row>
            <Form.Label column sm={4}>
              {title}
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                placeholder={placeholder}
                onChange={(e) => handleChange(e, controlId)}
              />
            </Col>
          </Form.Row>
        </Form.Group>
      </div>
    )
  
    function handleChange(e, controlId) {
      switch (controlId) {
        case "PANNo":
          setPANNo(e.target.value)
          break
        case "placeOfBirth":
          setPlaceOfBirth(e.target.value)
          break
        case "religion":
          setReligion(e.target.value)
          break
        case "casteName":
          setCasteName(e.target.value)
          break
        case "nationality":
          setNationality(e.target.value)
          break
        case "city":
          setCity(e.target.value)
          break
        case "district":
          setDistrict(e.target.value)
          break
        case "guardianCity":
          setGuardianCity(e.target.value)
          break
        case "guardianDistrict":
          setGuardianDistrict(e.target.value)
          break
        // case "lastInstituteNameFE":
        //   setLastInstituteNameFE(e.target.value)
        //   break
        // case "lastInstituteAddressFE":
        //   setLastInstituteAddressFE(e.target.value)
        //   break
        // case "lastClassFE":
        //   setLastClassFE(e.target.value)
        //   break
        case "CETScore":
          setCETScore(e.target.value)
          break
        case "JEEMainsScore":
          setJEEMainsScore(e.target.value)
          break
        case "JEEAdvancedScore":
          setJEEAdvancedScore(e.target.value)
          console.log(JEEAdvancedScore)
          break
        default:
          console.log("No Match for TextFieldCol")
      }
    }
  }
  