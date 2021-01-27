import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { LocationContext } from "./LocationProvider"
import "./Location.css"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState(
        {
            employees: [],
            animals: []
        }
    )

    const {locationId} = useParams();
    const history = useHistory();



    useEffect(() => {
        console.log("useEffect", locationId)
        getLocationById(locationId)
        .then((response) => {
            setLocation(response)
        })
    }, [])

    return (
        <section className="location">
            <h3 className="location__name">{location.name}</h3>
            <div className="location__address">{location.address}</div>
            <h3 className="location__employees">Current Employees</h3>
            <div className="location__employee__name">{location.employees.map(employee => employee.name).join(", ")}</div>
            <h3 className="location__animals">Current Boarders</h3>
            <div className="location__animal__name">{location.animals.map(animal => animal.name).join(", ")}</div>
            <button onClick={() => {
                history.push(`/locations/edit/${location.id}`)
            }}>Edit</button>
        </section>
    )



}