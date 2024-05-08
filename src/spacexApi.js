import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {useQuery, gql, InMemoryCache} from '@apollo/client';

const LAUNCHES = gql`
  query Launches($limit: Int, $keyword: String, $offset: Int, $sort: String, $page: Int, $upcoming: Boolean, $past: Boolean) {
      launches(limit: $limit, keyword: $keyword, offset: $offset, sort: $sort, page: $page, upcoming: $upcoming, past: $past) {
        id
        name
        launchpad {
          locality
        }
        payload {
          name
        }
        date_unix
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
`;


function SpaceXAPI({ keyword }) {
  //using the useQuery hook to fetch data from the server pull launches data from the server with a limit of ten
  const { loading, error, data, refetch, fetchMore } = useQuery(LAUNCHES, { 
    variables: { keyword, limit: 10, offset: 0, sort: "asc", page: 1 }
  });


  //if the data is loading display a loading message
  if (loading) return <p>Loading...</p>;
  //if there is an error display an error message
  if (error) return <p>Error : {error.message}</p>;

  //if there is no data display a message
  if (!data) return <p>No data</p>;
  
  //if there is data display the data using apollo pagination to fetch more data

  return (
    <div>
      <div className="App-header">
        <h1>
          SpaceX Launch Tracker
        </h1>
        <input
          onChange={(e) => {
            setTimeout(() => {
              refetch(
                {keyword: e.target.value}
              );
            }, 1000);
          }}
          type="text"
          placeholder="Keyword Search..."
          />
        <br />
        <label htmlFor="sort">Sort</label>
        <select
          onChange={(e) => {
            refetch(
              {sort: e.target.value}
            )
          }}
          id="sort"
          >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="App-Body">{data.launches.map(({ id, name, date_unix, launchpad, payload, details, success, links, rocket }) => (
          <div className="rocket-launch" key={id}>
            <h3>{name}</h3>
            <img width="250" height="250" alt="patch image" src={`${links.patch.small}`} />
            <br />
            <b>About this launch:</b>
            <p>Rocket: {rocket.name}</p>
            <p>Launch Date: {new Date(date_unix * 1000).toLocaleString()}</p>
            <p>Launch Site: {launchpad.locality}</p>
            <p>Launch Status: {success ? "Failure" : "Success"}</p>
            <p>{details}</p>
            <br />
          </div>
        ))}
      </div>
    </div>

  );
}

export default SpaceXAPI;