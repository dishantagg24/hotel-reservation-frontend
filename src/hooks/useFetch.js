import axios from "axios";
import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const reFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        }
        fetchData();
    }, [url])

    return { data, loading, error, reFetch };

}

export default useFetch;