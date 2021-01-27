import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail} from "./animal/AnimalDetail"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { LocationDetail } from "./location/LocationDetail"
import { LocationForm } from "./location/LocationForm"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeForm } from "./employee/EmployeeForm"
import { EmployeeDetail } from "./employee/EmployeeDetail"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        {/* both these routes need access to all these providers */}
                        <Route exact path="/animals">
                            <AnimalList />
                        </Route>

                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>

                        <Route path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>

                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>
{/* :animalId(\d+) tells React to look for which animal chosen :  
(\d+) is a "regular expression" that means any digit of any length 
- it will then save the variable inside :animalId*/}
            <AnimalProvider>
                <Route exact path="/animals/detail/:animalId(\d+)">
                    <AnimalDetail />
                </Route>
            </AnimalProvider>


            {/* Render the location list when http://localhost:3000/locations */ }
    <LocationProvider>
        <EmployeeProvider>
            <AnimalProvider>

        <Route exact path="/locations">
            <LocationList />
        </Route>

        <Route exact path="/locations/create">
            <LocationForm />
        </Route>

        <Route path="/locations/edit/:locationId(\d+)">
            <LocationForm />
        </Route>


            </AnimalProvider>
        </EmployeeProvider>
    </LocationProvider>

    <LocationProvider>
        <Route exact path="/locations/detail/:locationId(\d+)">
		    <LocationDetail />
	    </Route>
    </LocationProvider>

    {/* Render the customer list when http://localhost:3000/customers */ }
    <CustomerProvider>
        <Route exact path="/customers">
            <CustomerList />
        </Route>
    </CustomerProvider>

    {/* Render the employee list when http://localhost:3000/employees */ }
    <EmployeeProvider>
        <LocationProvider>
             <Route exact path="/employees">
                 <EmployeeList />
            </Route>

            <Route exact path="/employees/create">
                 <EmployeeForm />
            </Route>

            <Route path="/employees/edit/:employeeId(\d+)">
                <EmployeeForm />
            </Route>
        </LocationProvider>
    </EmployeeProvider>

    <EmployeeProvider>
            <Route exact path="/employees/detail/:employeeId(\d+)">
                 <EmployeeDetail />
            </Route>
    </EmployeeProvider>

        </>
    )
}