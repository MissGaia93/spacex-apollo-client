import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, gql, InMemoryCache, ApolloProvider } from '@apollo/client';
//import { cache } from './cache'
import SpaceXAPI from './spacexApi';


//query my graphql server at localhost :4000 for launch data

const client = new ApolloClient({
  uri: 'https://4a03-71-178-47-228.ngrok-free.app',
  cache: new InMemoryCache()
});


client.query({
  query: gql`
    query Launches($limit: Int, $keyword: String, $offset: Int, $sort: String) {
      launches(limit: $limit, keyword: $keyword, offset: $offset, sort: $sort) {
        id
        launchpad {
          locality
        }
        payload {
          name
        }
        details
        success
        links {
          patch {
            small
          }
          flickr {
            original
          }
        }
        rocket {
          name
        }
      }
    }
  `, variables: {
  limit: 10,
  keyword: "crs",
  offset: 0,
  sort: "asc"
}
}).then(result => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <SpaceXAPI />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
