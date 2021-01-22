import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { LocationCard } from "./location/LocationCard"
import { CustomerCard } from "./customer/CustomerCard"
import { EmployeeCard } from "./employee/EmployeeCard"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
        <AnimalProvider> 
            <Route exact path="/animals">
                <AnimalList />
            </Route>
        </AnimalProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            <Route path="/locations">
                <LocationCard />
            </Route>

             {/* Render the animal list when http://localhost:3000/animals */}
             <Route path="/customers">
                <CustomerCard />
            </Route>

             {/* Render the animal list when http://localhost:3000/animals */}
             <Route path="/employees">
                <EmployeeCard />
            </Route>

        </>
    )
}