import { useState, useEffect} from 'react';

/**
 * take an array and filter that array with an object containing filter criteria
 * @param {Object } filterDict 
 * @param {Array } list 
 * @returns {Array}
 */
export const useFilter = (filterDict, list) => {

    const [filterElements, setFilterElements] = useState(list);

    useEffect(() => {
        let filterList = [...list]        
        for (const key in filterDict) {
            if (filterDict[key]) {                
                filterList = [...filterList.filter(item => item[key] === filterDict[key])]       
                
        }};        
                
        setFilterElements(filterList)
    },[filterDict, list])

    return filterElements
}