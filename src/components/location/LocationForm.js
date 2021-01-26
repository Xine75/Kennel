import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { LocationContext } from "./LocationProvider"
import "./Location.css"

export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)
    

    const [location, setLocation] = useState({
        name: "",
        address: ""
    });

    const history = useHistory();

    useEffect(() => {
        getLocations()
    }, [])

    const handleControlledInputChange = (e) => {
        const newLocation = { ...location }
        newLocation[e.target.id] = e.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (e) => {
        e.preventDefault()

        addLocation(location)
        .then(() => history.push("/locations"))
    }

    return(
        <form className="locationForm">
            <h2 className="locationForm__title">New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location address:</label>
                    <input type="text" id="address" onChange={handleControlledInputChange} required className="form-control" placeholder="Location address" value={location.address}/>
                </div>
            </fieldset>
            <button className="btn btn-primary"
            onClick={handleClickSaveLocation}>
            Save Location
          </button>

        </form>
    )

}