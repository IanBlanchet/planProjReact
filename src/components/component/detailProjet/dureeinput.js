import { useState, useEffect, useContext } from 'react';

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
import {modJalon} from "../../util";

export function InputDuree(props) {

    const [duree, setDuree] = useState(props.jalon.duree?props.jalon.duree:0)

    const handleChange = (e) => {        
        const value = e?e:0
        setDuree(value);
        const jalonModify = {...props.jalon, duree:value}
        modJalon(`/api/v1/jalon/${props.jalon.id}`, {}, jalonModify, 'PUT');
        
    }

    return (
        <NumberInput step={5} value={duree} defaultValue='0' min={0} size='xs' width='14' onChange={handleChange}>
        <NumberInputField width='16' />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
        </NumberInput>        
        
    )
}