import { useState, useEffect, useContext } from 'react'
import { Input } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer   
  } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react';
import { MdDeleteForever } from "react-icons/md";


export const EditTasksForm = ({task, updateTasks, deleteTask}) => {
    const [currentTask, setCurrentTask] = useState(task)

    const handleChange = ({target}) => {
        const newTask = {...currentTask}
        newTask[target.name] = target.value        
        setCurrentTask(newTask);
        updateTasks(newTask);
    }

    const handleDeletetask = () => {
        deleteTask(currentTask);
    }

    useEffect(() =>{
        setCurrentTask(task)
      }, [task])

    return (

                <Tr>
                    <Td><IconButton icon={<MdDeleteForever/>} onClick={handleDeletetask} /></Td>
                    <Td>{currentTask.id}</Td>
                    <Td><Input name='name' value={currentTask.name} onChange={handleChange}/></Td>                    
                    <Td><Input type='date' name='start' value={currentTask.start} onChange={handleChange} onKeyDown={(e) => e.preventDefault()}/></Td>
                    <Td><Input type='date'  name='end' value={currentTask.end} onChange={handleChange} onKeyDown={(e) => e.preventDefault()}/></Td>
                    <Td><Input name='dependencies' value={currentTask.dependencies} onChange={handleChange}/></Td>
                </Tr>
        
    )
}