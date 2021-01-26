import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const EmployeeContext = createContext()

// This component establishes what data can be used.
export const EmployeeProvider = (props) => {
    //this is the hook, below
    //employees is a state varialbe, when we change the state, with setEmployees,
    //react will update the DOM for us. Must be called setSomething
    //[employees, setEmployees] is array destructuring
    //So useState([]) returns two things in an array,and we have intialized
    //them employees and setEmployees
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch("http://localhost:8088/employees?_expand=location")
        .then(res => res.json())
        .then(setEmployees)
    }

    const addEmployee = employeeObj => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeObj)
        })
        .then(getEmployees)
    }
    const getEmployeeById = (id) => {
        return fetch(`http://localhost:8088/employees/${id}?_expand=location`)
            .then(res => res.json())
    }

    /*
        You return a context provider which has the
        `employee` state, `getEmployees` function,
        and the `addEmployee` function as keys. This
        allows any child elements to access them.
    */
    return (
        <EmployeeContext.Provider value={{
            employees, getEmployees, addEmployee, getEmployeeById
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}