import { useState, useEffect }from 'react'
import { Grid, GridItem} from '@chakra-ui/react'
import { FrappeGantt } from 'frappe-gantt-react'
import { TableTasks } from './tableTask'



let basetasks = [
    {
      id: '1',
      name: 'debut des travaux fictif',
      start: '2023-01-28',
      end: '2023-03-31',
      progress: 10,
      dependencies: ''
    },
    {
        id: '2',
        name: 'fin des travaux fictif',
        start: '2023-03-31',
        end: '2023-04-30',
        progress: 20,
        dependencies: '1'
      },
      {
        id: '3',
        name: 'Réception fictive',
        start: '2023-05-01',
        end: '2023-05-12',        
        dependencies: '1'
      }
    
  ]



export function Gantt({projet})  {

    const [ mode, setMode] = useState('Month')
    const [ tasks, setTasks] = useState(basetasks)

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