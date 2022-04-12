import { useState, useEffect } from "react";


export function useTestHook() {
    const [ data, setData] = useState();

    useEffect(() => {
        setData(window.innerWidth);
    }, [])

    return data

}