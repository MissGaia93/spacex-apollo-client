import React, { useState } from 'react';
import './App.css';
import { ApolloClient, useQuery, gql, InMemoryCache, ApolloProvider } from '@apollo/client';
//import SpaceXHeader from './SpaceXHeader.js';
import SpaceXAPI from './spacexApi.js';



function SpaceXHeader() {
    return (
        <header className="App-header">
            <h1>
                SpaceX Launch Tracker
            </h1>
            <input
                type="text"
                placeholder="Search..."
            />
        </header>
    );
}


function App() {
  const [keywords, setKeyword] = useState(null);

  return (
    <div className="App">
      <SpaceXAPI/>
    </div>
  );
}

export default App;
