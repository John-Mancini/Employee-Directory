import { filter } from 'minimatch';
import React, { useState, useEffect } from 'react';
import apiService from '../../utils/API'


function Table() {
    const [count, setCount] = useState(0);//[0,function]
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let resultsToDisplay = [...results]
    console.log(apiService)
    useEffect(() => {
        apiService.getEmp().then(response =>{
            console.log(response.data.results)
            setResults(response.data.results)
        })
      }, []);
      if(searchTerm){
          resultsToDisplay = resultsToDisplay.filter(emp =>{
              let fullname = emp.name.first + emp.name.last
              return fullname.includes(searchTerm)
            
          })
      }

    return (
        <div>
           <h1>Hello World!</h1> 
           <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <input onKeyUp={(event)=>{
          console.log(event.target.value)
          setSearchTerm(event.target.value)
      }}></input>
      <button onClick={()=>filter()}>Search</button>
        {
            resultsToDisplay.map(emp =>{
                return (<div>{emp.name.first} {emp.name.last}</div>)
            })
        }

        </div>
    )
}

export default Table
