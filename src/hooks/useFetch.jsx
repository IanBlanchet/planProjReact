import React, { useState, useEffect } from "react";


const domain = process.env.REACT_APP_URI

const myHeaders = new Headers();
myHeaders.append('HTTP_AUTHORIZATION',sessionStorage.getItem('token') ) 

const useFetch = async (url, options) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

 const optionWithToken = {...options, headers:myHeaders}
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const doFetch = async () => {
        setLoading(true);
        try {
            const res = await fetch(domain+url, optionWithToken);                     
            if (res.ok) {
                await res.json()
                
            } else {
                console.log('erreur');
                setResponse({'erreur':'erreur'})
            }
            
            if (!signal.aborted) {
                setResponse(json);
            }
            
            
        } catch (e) {            
            if (!signal.aborted) {
            setError(e);
            }
        } finally {
            if (!signal.aborted) {
            setLoading(false);
            }
        }
        };
        doFetch();

        return () => {
        abortController.abort();

        };
    }, []);
    return { response, error, loading };
    };

export default useFetch;