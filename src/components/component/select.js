import { Select } from '@chakra-ui/react'



export function SelectProjet(props) {

    const handleSelect = (e) => {
        props.onChange(e.target.value)        
    }

    return (
    <Select placeholder='Select projet' onChange={handleSelect} w='fit-content'>
        {props.projets.map(item => <option key={item.id} value={item.id} >{item.no_projet} -- {item.desc}</option>)}
    </Select>
    )
}

export function SelectEvent(props) {
    const handleSelect = (e) => {
        props.onChange(e.target.value)        
    }

    return (
    <Select placeholder='Select évènement' onChange={handleSelect} w='30%'>
        {props.events.map(item => <option key={item.id} value={item.id} >{item.date} -- {item.title}</option>)}
    </Select>
    )


}