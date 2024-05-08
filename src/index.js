import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, gql, InMemoryCache, ApolloProvider } from '@apollo/client';
//import { cache } from './cache'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(
    {typePolicies: {
      Query: {
        fields: {
          launches: {
            keyArgs: false,
            merge(existing, incoming) {
              let launches = [];
              if (existing && existing.launches) {
                launches = launches.concat(existing.launches);
              }
              if (incoming && incoming.launches) {
                launches = launches.concat(incoming.launches);
              }
              return {
                ...incoming,
                launches
              };
            }
          }
        }
      }
    }}
  )
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
