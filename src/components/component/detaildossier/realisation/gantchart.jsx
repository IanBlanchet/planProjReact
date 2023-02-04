import { useState, useEffect, useContext }from 'react'
import { Grid, GridItem} from '@chakra-ui/react'
import { FrappeGantt } from 'frappe-gantt-react'
import { TableTasks } from './tableTask'
import { BaseDataContext } from '../../../../auth'




export function Gantt({projet})  {
    const {blanckNature} = useContext(BaseDataContext)
    const [ mode, setMode] = useState('Month')
    const [ tasks, setTasks] = useState(blanckNature.tasks)

    const handleDateChange = (task, start, end) => {
        let newTasks = [...tasks]
        const editedTask = newTasks.find((item) => item.id === task.id);
        editedTask.start = start;
        editedTask.end = end;
        setTasks(newTasks)
    }

    useEffect(() => {
        if (projet.nature.tasks) {
            setTasks(projet.nature.tasks)
        } 

        
    }, [])


    return (
        
        <Grid             
            templateColumns='2fr 6fr'
            border='1px'
            padding='5px'
            margin='5px'
            borderRadius='5px'
            boxShadow='md'>

            <GridItem gridColumn='1 / span1'>
                
            </GridItem>

            <GridItem  gridColumn='2 / span1'>
                <FrappeGantt
                    tasks={tasks}
                    viewMode={mode}
                    onClick={task => console.log('click')}                
                    onDateChange={(task, start, end) => handleDateChange(task, start, end)}
                    onProgressChange={(task, progress) => console.log('ok')}
                    onTasksChange={tasks => console.log('ok')}
                />
            </GridItem>
        </Grid>
        

    )
}