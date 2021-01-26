import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"

//the entire rest of this component defines the function EmployeeForm
export const EmployeeForm = () => {
    //useContext allows you to share and pass data via the Context API (built into React)
    const { addEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
  /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    this get updated on the fly, keystroke by keystroke as the user inputs it */

    const [employee, setEmployee] = useState({
        name: "",
        locationId: 0
      });
  
      const history = useHistory();
 /*
    Reach out to the world and get customer state
    and location state on initialization, so we can provide their data on the form dropdowns
    */
   useEffect(() => {
       getLocations()
   }, [])

const handleControlledInputChange = (e) => {
    const newEmployee = {...employee }

    newEmployee[e.target.id] = e.target.value

    setEmployee(newEmployee)
}
const handleClickSaveEmployee = (e) => {
    e.preventDefault()

    const locationId = parseInt(employee.locationId)

    if (locationId === 0) {
        window.alert("Please select a location")
    } else {
        employee.locationId = locationId

    addEmployee(employee)
    .then(() => history.push("/employees"))
    }
}
return(
    <form className="employeeForm">
        <h2 className="employeeForm__title">New Employee</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Employee name:</label>
                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
            </div>
        </fieldset>
        <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>

                  <select defaultValue={employee.locationId} onChange={handleControlledInputChange} name="locationId" id="locationId" className="form-control" >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveEmployee}>
            Save Employee
          </button>
    </form>
    )
}