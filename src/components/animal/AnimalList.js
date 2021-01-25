import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below

  //“useContext” hook is used to create common data that can be accessed 
  //throughout the component hierarchy without passing the 
  //props down manually to each level. 
  //Context defined will be available to all the child components 
  //without involving “props”.
  const { animals, getAnimals } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

  //useEffect - reach out to the world for something - is like an event Listener
  //it takes two arguments - first a function and then an array
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getCustomers()
    .then(getLocations)
    .then(getAnimals)
}, [])

//useHistory is a hook that gives us access to all the routes. It gives us a history of all the paths
//that we followed to this point. If we push something to it, that thing goes into the history.  It will look
//for the routes in ApplicationViews.
const history = useHistory()

return (
    <>
        <h2>Animals</h2>
		<button onClick={() => {history.push("/animals/create")}}>
            Add Animal
        </button>
        <div className="animals">
        {
			animals.map(animal => {
        const owner = customers.find(c => c.id === animal.customerId)
        const clinic = locations.find(l => l.id === animal.locationId)
      //creating a new object with React by adding new properties to animalcard
        return <AnimalCard key={animal.id}
                    location={clinic}
                    customer={owner}
                    animal={animal} />
      })
        }
        </div>
    </>
)}
