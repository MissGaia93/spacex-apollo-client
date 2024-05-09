import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';
import './spacexApi.css';

import {useQuery, gql} from '@apollo/client';

const LAUNCHES = gql`
  query Launches($limit: Int, $keyword: String, $offset: Int, $page: Int, $upcoming: Boolean, $past: Boolean, $success: Boolean, $failure: Boolean) {
      launches(limit: $limit, keyword: $keyword, offset: $offset, page: $page, upcoming: $upcoming, past: $past, success: $success, failure: $failure) {
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
    variables: { keyword, limit: 20, offset: 0, sort: "asc", upcoming: true, past: true, success: true, failure: true}
  });

  console.log(data)

  const [pastState, setPastState] = useState(true);
  const [upcomingState, setUpcomingState] = useState(true);
  const [successState, setSuccessState] = useState(true);
  const [failureState, setFailureState] = useState(true);



  //if the data is loading display a loading message
  if (loading) return <p>Loading...</p>;
  //if there is an error display an error message
  if (error) return <p>Error : {error.message}</p>;

  //if there is no data display a message
  if (!data) return <p>No data</p>;

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
          className="search"
          placeholder="Keyword Search..."
          />
          <h2>Filters:</h2>
          <div className="filters">
            <div className="checkboxes">
              <div>
                <label htmlFor="upcoming" className="checkbox-label">Upcoming: </label>
                <input 
                type="checkbox" 
                id="upcoming"
                className="checkbox"
                defaultChecked={upcomingState}
                onClick={(e) => {
                  setUpcomingState((state) => !state);
                  refetch(
                    {upcoming: !upcomingState}
                  );
                  
                }}
                />
              </div>
              <div>
                <label htmlFor="past" className="checkbox-label">Past: </label>
                <input 
                type="checkbox" 
                id="past"
                className="checkbox"
                defaultChecked={pastState}
                onClick={(e) => {
                  setPastState((state) => !state);
                  refetch(
                    {past: !pastState}
                  );
                }}
                />
              </div>
              <div>
                <label htmlFor="failure" className="checkbox-label">Failure: </label>
                <input 
                type="checkbox" 
                id="failure"
                className="checkbox"
                defaultChecked={failureState}
                onClick={(e) => {
                  setFailureState ((state) => !state);
                  refetch(
                    {failure: e.target.checked}
                  );
                }}
                />
              </div>
              <div>
                <label htmlFor="success" className="checkbox-label">Success: </label>
                <input 
                type="checkbox" 
                id="success"
                className="checkbox"
                defaultChecked={successState}
                onClick={(e) => {
                  setSuccessState ((state) => !state);
                  refetch(
                    {success: e.target.checked}
                  );
                }}
                />
              </div>
            </div>
          </div>

        <br />
      </div>
      
        <InfiniteScroll
          dataLength={data.launches.length}
          next={() => {
            fetchMore({
              variables: {
                offset: data.launches.length
              }
            });
          }}
          hasMore={ data.launches.length != 0 && data.launches.length % 20 == 0}
          loader={<h4>Loading...</h4>}
          endMessage={
            <h4 className="end" style={{ textAlign: 'center' }}>
              <b>No more results</b>
            </h4>
          }
        >
        <div className="App-Body">
        {data.launches.map(({ id, name, date_unix, launchpad, payload, details, success, links, rocket }) => (
          <div className="rocket-launch" key={id}>
            <div className="rocket-title">
              <h3>{name}</h3>
              <img alt="patch image" className="rocket-image" src={`${links.patch.small}`} />
              <br />
            </div>
            <div className="rocket-info">
              <h3>Details:</h3>
              <p><b>Rocket:</b> {rocket.name}</p>
              <p><b>Launch Date:</b> {new Date(date_unix * 1000).toLocaleString()}</p>
              <p><b>Launch Site:</b> {launchpad.locality}</p>
              <p><b>Launch Status:</b> {success ? <div className="status success">Success</div> : (success === false ? <div className="status failure">Failure</div> : <div className="status upcoming">Upcoming</div>)}</p>
              <p><b>Payloads:</b> {payload.map(({ name }) => name).join(", ")}</p>
              <p><b>Description: </b>{details}</p>
            </div>
            <br />
          </div>
        ))}
        </div>
        </InfiniteScroll>
    </div>

  );
}

export default SpaceXAPI;