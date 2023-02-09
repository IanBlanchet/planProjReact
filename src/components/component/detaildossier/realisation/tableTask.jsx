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
  import { Input, Box, Heading } from '@chakra-ui/react'



export const TableTasks = ({projet}) => {
    const {blanckNature} = useContext(BaseDataContext)
    const [tasks, setTasks] = useState(blanckNature.tasks)

    useEffect(() =>{
        if (projet.nature.tasks) {
            setTasks(projet.nature.tasks)
        }
    }, [])

    return (
        
        
        <TableContainer >
        <Table variant='simple' size="xs" overflowY='scroll' display='inline-block' >
          <Thead position='sticky' top='0' >
            <Tr bg='gray.200'>
              <Th >ID</Th>
              <Th >Description</Th>
              <Th >Dépendence</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map(task =>
                <Tr>
                    <Td>{task.id}</Td>
                    <Td><Input value={task.name}/></Td>
                    <Td><Input value={task.dependencies}/></Td>                    
                </Tr>
                )}
            </Tbody>
      
        </Table>
      </TableContainer>
      

    )
}

