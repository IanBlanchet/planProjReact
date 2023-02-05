import { useState, useEffect} from 'react';

/**
 * take an array and sort that array with  sort criteria
 * @param {Object } sortCriteria
 * @param {Array } list 
 * @returns {Array}
 */
export const useSort = (sortCriteria, list) => {

    const [sortArray, setSortArray] = useState(list);

    useEffect(() => {
        let sortList = [...list]        
        
        if (sortCriteria.criteria) { 
                switch (sortCriteria.level) {

                    case 'baseColumn' :
                        sortList = sortList.sort((a,b) => {
                            if (a[sortCriteria.criteria] < b[sortCriteria.criteria]){
                            return sortCriteria.direction?-1: 1
                            } 
                            if (a[sortCriteria.criteria] > b[sortCriteria.criteria]) {
                            return sortCriteria.direction?1: -1
                            }
                            return 0

                        });
                        break;
                    case 'natureLevel' :
                        sortList = sortList.sort((a,b) => {
                            if (a.nature[sortCriteria.criteria] < b.nature[sortCriteria.criteria]){
                            return sortCriteria.direction?-1: 1
                            } 
                            if (a.nature[sortCriteria.criteria] > b.nature[sortCriteria.criteria]) {
                            return sortCriteria.direction?1: -1
                            }
                            return 0

                        });
                        break;


                }
            
        };        
                
        setSortArray(sortList)
    },[sortCriteria, list])
    console.log(sortCriteria, sortArray)
    return sortArray
}