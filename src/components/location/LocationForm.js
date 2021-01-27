import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { LocationContext } from "./LocationProvider"
import "./Location.css"

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)

    const [location, setLocation] = useState({
        name: "",
        address: ""
    });

//wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
    const [isLoading, setIsLoading] = useState(true);
    const { locationId } = useParams()
    const history = useHistory();

    const handleControlledInputChange = (e) => {
        const newLocation = { ...location }
        newLocation[e.target.id] = e.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (e) => {
        if (parseInt(locationId) === 0) {
            window.alert("Please select a location")
        } else {
            setIsLoading(true)
            if (locationId) {
                //PUT - update
                updateLocation({
                    id: location.id,
                    name: location.name,
                    address: location.address
                })
                .then(() => history.push(`/locations/detail/${location.id}`))
            } else {
                //POST - add
                addLocation({
                    id: location.id,
                    name: location.name,
                    address: location.address   
                })
                .then(() => history.push("/locations"))
            }
        }
    }

      useEffect(() => {
       if (locationId) {
           getLocationById(locationId)
           .then(location => {
               setLocation(location)
               setIsLoading(false)
           })
       } else {
           setIsLoading(false)
       }
    }, [])

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
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveLocation()
          }}>
        {locationId ? "Update Location" : "Add Location"}</button>
        </form>
    )
}