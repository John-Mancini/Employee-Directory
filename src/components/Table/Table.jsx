import { filter , sort } from 'minimatch';
import React, { useState, useEffect } from 'react';
import apiService from '../../utils/API'



function Table() {
    const [count, setCount] = useState(0);//[0,function]
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder]= useState("")
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
     // if(sortTerm){
        //resultsToDisplay = resultsToDisplay.sort(emp =>{
          //  let fullname = emp.name.first + emp.name.last
      //      return emp
          
    //    })
   // }
    //   function sortEmployees(){
    //       results.sort(function (a,b){
    //           return a-b;
    //       })
    //       console.log(results)
    //       results.forEach(res =>{
    //         return (<div class = "employees">
                    
    //         <h1>First Name: <span>{res.name.first}</span></h1>
    //         <h1>Last Name: <span>{res.name.last}</span></h1>
    //         <h1>Gender: <span>{res.gender}</span></h1>
    //         <h1>Email: <span>{res.email}</span></h1>
    //         <h1>Cell: <span>{res.cell}</span></h1>
    //         <h1>Age: <span>{res.dob.age}</span></h1>
  
    //         </div>
    //         )
    //       })         
    //   }
   const sortByFName = () => {
        const sortedEmployees = results.sort((a, b) => {
          if (b.name.first > a.name.first) {
            return -1
          }
          if (a.name.first > b.name.first) {
            return 1
          }
          return 0;
        });
    
        if (sortOrder === "DESC") {
          sortedEmployees.reverse();
          setSortOrder("ASC" );
        } else {
          setSortOrder("DESC" );
        }
        setResults(sortedEmployees)
      }
    

    return (
        <div>
           <h1>Employee Tracker</h1> 
      <input onKeyUp={(event)=>{
          console.log(event.target.value)
          setSearchTerm(event.target.value)
      }}></input>
      <button onClick={()=>filter()}>Search</button>
        {
            resultsToDisplay.map(emp =>{
                return (<div class = "employees">
                    
                    <h1>First Name: <span onClick = {sortByFName}>{emp.name.first}</span></h1>
                    <h1>Last Name: <span>{emp.name.last}</span></h1>
                    <h1>Gender: <span>{emp.gender}</span></h1>
                    <h1>Email: <span>{emp.email}</span></h1>
                    <h1>Cell: <span>{emp.cell}</span></h1>
                    <h1>Age: <span>{emp.dob.age}</span></h1>
                    </div>)
            })
        }

        </div>
    )
}

export default Table
