import { Select } from '@chakra-ui/react'
import  SearchSelect from 'react-select' 


export function SelectProjet(props) {

    let options = [];       
    
    props.projets.map(item => options.push({value:item.id, label:item.no_projet + ' -- ' + item.desc}))

    const handleSelect = (e) => {
         
        props.onChange(e.value) 
             
    }

    return (
    <SearchSelect isSearchable placeholder='Choisir un projet ou écrire un mot clé' onChange={handleSelect} w='fit-content' defaultValue={props.defaultValue} size='sm' 
            options={options} 
             />        
    
    )
}



export function SelectContrat(props) {

    let options = [];       
    
    props.contrats.map(item => options.push({value:item.id, label:item.no + ' -- ' + item.desc}))


    const handleSelect = (e) => {
        props.onChange(e.target.value)        
    }

    return (
    <SearchSelect isSearchable placeholder='Choisir un contrat ou écrire un mot clé' onChange={handleSelect} w='fit-content' defaultValue={props.defaultValue} size='sm'
                    options={options}         
    />
       
    
    )
}

export function SelectEvent(props) {
    const handleSelect = (e) => {
        props.onChange(e.target.value)
             
    }

    return (
    <Select placeholder='Select évènement' onChange={handleSelect} w='30%' >
        {props.events.map(item => <option key={item.id} value={item.id} >{item.date} -- {item.title}</option>)}
    </Select>
    )


}

export function SelectCat(props) {
    const handleSelect = (e) => {
        props.onChange(e.target.value)
                
    }

    return (
    <Select placeholder='Filtre par catégorie' onChange={handleSelect} w='30%'>
        {props.cat.map(item => <option key={item} value={item} >{item}</option>)}
    </Select>
    )


}
