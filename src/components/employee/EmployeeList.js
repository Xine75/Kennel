import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"

export const EmployeeList = () => {
  // This state changes when `getEmployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something - is something like an eventListener
  useEffect(() => {
    console.log("EmplyeeList: useEffect - getEmployees")
    getLocations()
    .then(getEmployees)
  }, [])
//useHistory is a hook that gives us access to all the routes. It gives us a history of all the paths
//that we followed to this point. If we push something to it, that thing goes into the history.  It will look
//for the routes in ApplicationViews.
const history = useHistory()

return (
  <>
      <h2>Employees</h2>
  <button onClick={() => {history.push("/employees/create")}}>
          Add Employee
      </button>
      <div className="employees">
      {
    employees.map(employee => {
      const clinic = locations.find(l => l.id === employee.locationId)
    //creating a new object with React by adding new properties to employeeCard
      return <EmployeeCard key={employee.id}
                  employee = {employee}
                  location={clinic}
                   />
    })
      }
      </div>
  </>
)




}

//   return (
//     <div className="employees">
//       {console.log("EmployeeList: Render", employees)}
//       {
//         employees.map(employee => {
//           return <EmployeeCard key={employee.id} employee={employee} />
//         })
//       }
//     </div>
//   )
// 