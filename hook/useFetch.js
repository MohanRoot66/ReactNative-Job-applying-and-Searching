import { useEffect, useState } from 'react';
import axios from 'axios';
import {REACT_APP_APIHOST,REACT_APP_APIKEY} from "@env"

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
            'x-rapidapi-key': REACT_APP_APIKEY,
            'x-rapidapi-host': REACT_APP_APIHOST,
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data)
            setError(null);
        } catch (err) {
            setError(err);
            setData([]);
            alert("There is an error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
