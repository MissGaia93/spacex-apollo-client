import React, { useState, useEffect } from "react";

const LAUNCHES = gql`
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
`;

function SpaceXAPI() {
    const { loading, error, data } = useQuery(LAUNCHES, {
    
    return (
        <div>
            <h2>Spacex Launch Data:</h2>
            
        </div>
    );
}

export default SpaceXAPI;