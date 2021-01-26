import React from "react"
import { Link } from "react-router-dom"
import "./Location.css"

export const LocationCard = ({ location }) => {
    return (
      <section className="location">
        <h3 className="location__name">
          <Link to={`/locations/detail/${location.id}`}>
            { location.name }
          </Link>
        </h3>
        <div className="location__employees">Employees: {location.employees.map(employee => employee.name + ", ")}</div>
        <div className="location__animals">Boarders: {location.animals.map(animal => animal.name + ", ")}</div>
    </section>
  )}












// export const LocationCard = ({location}) => (
//     <section className="location">
//         <h3 className="location__name">{location.name}</h3>
//         <div className="location__address">{location.address}</div>
//     </section>
// )