import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"

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
        <LocationProvider>
            <Route exact path="/locations">
                <LocationList />
            </Route>
        </LocationProvider>

             {/* Render the animal list when http://localhost:3000/animals */}
        <CustomerProvider>
             <Route exact path="/customers">
                <CustomerList />
            </Route>
        </CustomerProvider>

             {/* Render the animal list when http://localhost:3000/animals */}
        <EmployeeProvider>
             <Route exact path="/employees">
                <EmployeeList />
            </Route>
        </EmployeeProvider>

        </>
    )
}