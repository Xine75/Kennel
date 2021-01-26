import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const LocationContext = createContext()

// This component establishes what data can be used.
export const LocationProvider = (props) => {
    //this is the hook, below
    //animals is a state varialbe, when we change the state, with setAnimals,
    //react will update the DOM for us. Must be called setSomething
    //[animals, ] is array destructuring
    //So useState([]) returns two things in an array,and we have intialized
    //them as animals and setAnimals
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=animals&_embed=employees")
        .then(res => res.json())
        .then(setLocations)
    }

    const addLocation = locationObj => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(getLocations)
    }
    const getLocationById = (id) => {
        return fetch(`http://localhost:8088/locations/${id}?_embed=animals&_embed=employees`)
            .then(res => res.json())
    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, getLocationById
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}