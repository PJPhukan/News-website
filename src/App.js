// import 'dotenv/config'

import React, { useState } from "react";

import Navber from "./Components/Navber";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, Setprogress] = useState(0);

  const setPrograss = (progress) => {
    Setprogress(progress);
  };

  return (
    <div>
      <Router>
        <Navber />
        <LoadingBar height={4} color="#f11946" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="general"
                pageSize={15}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="business"
                pageSize={15}
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="entertainment"
                pageSize={15}
                country="in"
                ategory="entertainment"
              />
            }
          ></Route>
          <Route
            exact
            path="/general"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="general"
                pageSize={15}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="health"
                pageSize={15}
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="science"
                pageSize={15}
                country="in"
                category="science"
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="sports"
                pageSize={15}
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setPrograss={setPrograss}
                apiKey={apiKey}
                key="technology"
                pageSize={15}
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
// a77010d6d7204f25b584d678362aca6b
