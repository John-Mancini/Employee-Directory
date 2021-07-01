import { filter, sort } from "minimatch";
import React, { useState, useEffect } from "react";
import apiService from "../../utils/API";

function Table() {
  const [count, setCount] = useState(0); //[0,function]
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  let resultsToDisplay = [...results];
  console.log(apiService);
  useEffect(() => {
    apiService.getEmp().then((response) => {
      console.log(response.data.results);
      let modifiedResults = response.data.results.map((emp) => {
        emp.firstName = emp.name.first;
        emp.lastName = emp.name.last;

        return emp;
      });
      setResults(modifiedResults);
    });
  }, []);
  if (searchTerm) {
    resultsToDisplay = resultsToDisplay.filter((emp) => {
      let fullname = emp.name.first + emp.name.last;
      return fullname.includes(searchTerm);
    });
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
  const sortBy = (key) => {
    const sortedEmployees = results.sort((a, b) => {
      if (b[key] > a[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });

    if (sortOrder === "DESC") {
      sortedEmployees.reverse();
      setSortOrder("ASC");
    } else {
      setSortOrder("DESC");
    }
    setResults(sortedEmployees);
  };

  return (
    <div>
      <div className="input-group mb-3">
        {/* <span className="input-group-text" id="inputGroup-sizing-default">
          Default
        </span> */}
        <button
          className="btn btn-primary btn-lg"
          onClick={() => filter()}
          type="button"
        >
          Search
        </button>
        <input
          onKeyUp={(event) => {
            console.log(event.target.value);
            setSearchTerm(event.target.value);
          }}
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>

      <table class="table">
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => {
                sortBy("firstName");
              }}
            >
              <div className="btn btn-primary btn-sm">First</div>
            </th>
            <th
              scope="col"
              onClick={() => {
                sortBy("lastName");
              }}
            >
              <div className="btn btn-primary btn-sm">Last</div>
            </th>
            <th
              scope="col"
              onClick={() => {
                sortBy("email");
              }}
            >
              <div className="btn btn-primary btn-sm">Email</div>
            </th>
            <th scope="col">Cell</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {resultsToDisplay.map((emp) => {
            return (
              <tr>
                <td> {emp.name.first}</td>
                <td>{emp.name.last}</td>
                <td>{emp.email}</td>
                <td>{emp.cell}</td>
                <td>{emp.dob.age}</td>
                <td>{emp.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
