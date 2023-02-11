import { useState, useEffect, useContext } from 'react'
import { getRessources } from '../../../util'
import { BaseDataContext } from '../../../../auth'

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



export const TableTasks = ({tasks, updateTasks}) => {
    const {blanckNature} = useContext(BaseDataContext)
    const [currentTasks, setCurrentTasks] = useState(blanckNature.tasks);



    useEffect(() =>{
        if (tasks) {
            setCurrentTasks(tasks)
        }
    }, [tasks])

    return (
        
        
        <TableContainer >
        <Table variant='simple' size='xs' overflowY='scroll'  >
          <Thead position='sticky' top='0' >
            <Tr bg='gray.200' size='xs'>
              <Th >ID</Th>
              <Th >Description</Th>              
              <Th>Début</Th>
              <Th>Fin</Th>
              <Th >Dépendence</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentTasks.map(task =>
                <EditTasksForm key={task.id} task={task} updateTasks={updateTasks}/>
                )}
            </Tbody>
      
        </Table>
      </TableContainer>
      

    )
}

