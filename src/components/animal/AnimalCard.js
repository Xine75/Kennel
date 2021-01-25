import React from "react"
import "./Animal.css"

//object destructuring - animal, customer, and location are all objects - the destructuring is what
//allows us to use {animals, customer, location} instead of props

export const AnimalCard = ({animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <div className="animal__breed">Breed: {animal.breed}</div>
        <address className="location__address">Location: {location.name}</address>
        <div className="animal__customer">Customer: {customer.name}</div>
    </section>
)