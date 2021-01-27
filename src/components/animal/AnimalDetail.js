import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"
// useParams is a hook that allows us to grab parameters inside the URL

export const AnimalDetail = () => {
  const { getAnimalById, releaseAnimal } = useContext(AnimalContext)
    //this time the state of animal is an object - it's just one animal, hence the {} inside useState
	const [animal, setAnimal] = useState({})

  const {animalId} = useParams();  //returns an object - grabs the id off the animal selected
  const history = useHistory()

  const handleRelease = () => {
    releaseAnimal(animal.id)
      .then(() => {
        history.push("/animals")
      })
  }
	

  useEffect(() => {
    console.log("useEffect", animalId)
    getAnimalById(animalId)
    .then((response) => {
      setAnimal(response)
    })
    }, [])

  return (
    <section className="animal">
      <h3 className="animal__name">{animal.name}</h3>
      <div className="animal__breed">{animal.breed}</div>
      {/* What's up with the question mark???? See below.*/}
      <div className="animal__location">Location: {animal.location?.name}</div>
      <div className="animal__owner">Customer: {animal.customer?.name}</div>
      <button onClick={() => {
          history.push(`/animals/edit/${animal.id}`)
      }}>Edit</button>
      <button onClick={handleRelease}>Release Animal</button>

    </section>
  )
}
// ? allows us to use optional chaining - it's a failsafe - 
// there may or may not be a prop called customer or location