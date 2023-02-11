import { useState, useEffect, useContext } from 'react'
import { getRessources } from '../../../util'
import { BaseDataContext } from '../../../../auth'
import { FcPlus } from "react-icons/fc";
import { IconButton } from '@chakra-ui/react';

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
  
  import { EditTasksForm } from './editTasksForm'



export const TableTasks = ({tasks, updateTasks, addTask, deleteTask}) => {
    
    const [currentTasks, setCurrentTasks] = useState(tasks);

    const handleAddTask = () => {
      let newtask = {
                  id:(currentTasks.length + 1).toString(),
                  name:'nouvelle étape', 
                  start:'2023-01-01', 
                  end:'2023-02-01',
                  progress:5, 
                  dependencies:'' 
                  }
      addTask(newtask)
    }

    useEffect(() =>{
      setCurrentTasks(tasks)
    }, [tasks])

    return (
        
        
        <TableContainer >
        <Table variant='simple' size='xs' overflowY='scroll'  >
          <Thead position='sticky' top='0' >
            <Tr bg='gray.200' size='xs'>
              <Th></Th>
              <Th >ID</Th>
              <Th >Description</Th>              
              <Th>Début</Th>
              <Th>Fin</Th>
              <Th >Dépendence</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentTasks.map((task, index) =>
                <EditTasksForm key={index} task={task} updateTasks={updateTasks} deleteTask={deleteTask}/>
                )}
              <Tr>
                <IconButton icon={<FcPlus/>} onClick={handleAddTask} />
              </Tr>
            </Tbody>
      
        </Table>
      </TableContainer>
      

    )
}

