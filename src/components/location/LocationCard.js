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
        <div className="location__num__employees">{location.employees.length} employees</div>
        <div className="location__num__animals">{location.animals.length} boarders</div>
    </section>
  )}
