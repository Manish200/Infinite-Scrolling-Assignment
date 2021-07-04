import React, { useState, useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  //useEffect hook for ComponentDidMount
  useEffect(() => {
    infiniteScrolling(page);
  }, []);

  //Get API call
  const infiniteScrolling = (page) => {
    fetch(`https://randomuser.me/api/?page=${page}&results=10`)
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          return Promise.reject({
            status: data.status,
            statusText: data.statusText
          });
        }
      })
      .then((result) => {
        // console.log(data.results);
        if (page > 1) {
          let scrollData = [...data, ...result.results];
          setData(scrollData);
        } else {
          setData(result.results);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log("Error : ", err.statusText);
      });
  };

  // Scrolling
  function loadData(e) {
    let height =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 100;
    if (height) {
      let page1 = page + 1;
      infiniteScrolling(page1);
      setLoader(true);
      setPage(page1);
    }
  }

  return (
    <div class="jumbotron jumbotron-fluid">
      <h3 style={{ textAlign: "center" }}>Infinite-Scrolling-Assignment</h3><br />
      <div class="container">
        <div onScroll={loadData} style={{ height: "600px", overflowY: "auto" }}>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col"> Name </th>
                <th scope="col"> Gender </th>
                <th scope="col"> Profile </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => {
                return (
                  <tr scope="row" key={key}>
                    <td>{item.name["first"]}</td>
                    <td>{item.gender}</td>
                    <td>
                      <img src={item.picture["thumbnail"]} />
                    </td>
                  </tr>
                );
              })}
              {loader ?
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                :
                <React.Fragment></React.Fragment>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
