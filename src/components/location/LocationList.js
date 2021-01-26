import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./LocationCard"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { AnimalContex } from "../animal/AnimalProvider"
import "./Location.css"

export const LocationList = () => {
  // This state changes when `getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { animals, getAnimals } = useContext(AnimalContext)

  //useEffect - reach out to the world for something - is something like an eventListener
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getEmployees()
    .then(getAnimals)
    .then(getLocations)

  }, [])
const history = useHistory()

return (
  <>
      <h2>Locations</h2>
  <button onClick={() => {history.push("/locations/create")}}>
          Add Location
      </button>
      <div className="locations">
      {
    locations.map(location => {
      const worker = employees.filter(e => e.id === location.employees.id)
      const pet = animals.filter(a => a.id === location.animals.id)
    
    //creating a new object with React by adding new properties to animalcard
      return <LocationCard key={location.id}
                  employee={worker}
                  animal ={pet}
                  location={location}/>
    })
      }
      </div>
  </>
)









  
}
// return (
//   <div className="locations">
//     {console.log("LocationList: Render", locations)}
//     {
//       locations.map(location => {
//         return <LocationCard key={location.id} location={location} />
//       })
//     }
//   </div>
// )