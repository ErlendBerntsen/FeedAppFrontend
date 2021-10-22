import axios from "axios";
import React from "react";
import useSWR from "swr";
 
function Polls () {
    const {polls,  isLoading} = GetPolls()
    if(isLoading) return <p>Fetching data...</p>
    return (
        <div>
            <h2>Polls</h2>
            <ul>
            {polls.map(poll => (
                <li key={poll.id}>{JSON.stringify(poll)}</li>
            ))}
        </ul>
        </div>
    );
}

function GetPolls () {

    const url = "http://localhost:8080/polls"
    const fetcher = () => axios.get(url).then(res => res.data)
    const { data, error } = useSWR(url, fetcher)
    return {
        polls: data,
        isLoading: !error && !data,
        isError: error
     }
}
 
export default Polls;