import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const AnimalContext = createContext()

// This component establishes what data can be used.
export const AnimalProvider = (props) => {
    
    const [animals, setAnimals] = useState([])
    /* Returns a "stateful" value - a value whose state will mutate - (animals), and a function to update it (setAnimals).
    During the initial render, the returned state (animals) is the same as the value passed
    as the first argument (animals).  The setAnimals function is used to update the state.
    It accepts a new state value and queues up a re-render of the component.
    If a new state if computed during using the previous state, you can pass a function
    to setState. The function receives the previous value, and returns
    an updated value */

    /* gets animals from API. This fetch is expanded to append the location data to each animal */
    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location")
        .then(res => res.json())
        .then(setAnimals)
    }

        /* uses POST method to add new animals to database.json, then gets the new (updated) animal data */
    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(getAnimals)
    }
    const getAnimalById = (id) => {
        return fetch(`http://localhost:8088/animals/${id}?_expand=location&_expand=customer`)
            .then(res => res.json())
    }

    const releaseAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
            .then(getAnimals)
    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.

        This return statement allows exposure to this data objects 
        listed (animals, getAnimals, and addAnimal).
    */
    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, addAnimal, getAnimalById, releaseAnimal
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}