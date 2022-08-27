import { Select } from '@chakra-ui/react'



export function SelectProjet(props) {

    const handleSelect = (e) => {
        props.onChange(e.target.value)        
    }

    return (
    <Select placeholder='Select projet' onChange={handleSelect} w='fit-content' defaultValue={props.defaultValue} size='sm'>
        {props.projets.map(item => <option key={item.id} value={item.id} >{item.no_projet} -- {item.desc}</option>)}
    </Select>
    )
}



export function SelectContrat(props) {

    const handleSelect = (e) => {
        props.onChange(e.target.value)        
    }

    return (
    <Select placeholder='Select contrat' onChange={handleSelect} w='fit-content' defaultValue={props.defaultValue} size='sm'>
        {props.contrats.map(item => <option key={item.id} value={item.id} >{item.no} -- {item.desc}</option>)}
    </Select>
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
