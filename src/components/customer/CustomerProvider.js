import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CustomerContext = createContext()

// This component establishes what data can be used.
export const CustomerProvider = (props) => {
    //this is the hook, below
    //animals is a state varialbe, when we change the state, with setAnimals,
    //react will update the DOM for us. Must be called setSomething
    //[animals, setAnimals] is array destructuring
    //So useState([]) returns two things in an array,and we have intialized
    //them customers and setCustomers
    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers?_embed=animals")
        .then(res => res.json())
        .then(setCustomers)
    }

    const addCustomer = customerObj => {
        return fetch("http://localhost:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(getCustomers)
    }

    /*
        You return a context provider which has the
        `customers` state, `getCustomers` function,
        and the `addCustomer` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CustomerContext.Provider value={{
            customers, getCustomers, addCustomer
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}