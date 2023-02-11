import { useState, useEffect, useContext }from 'react'
import { Grid, GridItem, IconButton} from '@chakra-ui/react'
import { FrappeGantt } from 'frappe-gantt-react'
import { TableTasks } from './tableTask'
import { BaseDataContext } from '../../../../auth'
import { BsBarChartSteps, BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { modJalon } from '../../../util'



export function Gantt({projet})  {
    const {blanckNature} = useContext(BaseDataContext)
    const [ mode, setMode] = useState('Month')
    const [ tasks, setTasks] = useState(blanckNature.tasks)
    const [ tableauTaskOn, setTableauTaskOn] = useState(false)

    const handleDateChange = (task, start, end) => {
        let newTasks = [...tasks]
        const editedTask = newTasks.find((item) => item.id === task.id);
        editedTask.start = start;
        editedTask.end = end;
        setTasks(newTasks)
    }

    const handleClickViewTableau = () => {

        tableauTaskOn?setTableauTaskOn(false):setTableauTaskOn(true)
    }

    const updateTasks = (updateTask) => {
        const newTasks = [...tasks]
        const taskIndex = tasks.findIndex(item => item.id = updateTask.id)
        newTasks[taskIndex] = updateTask
        setTasks(newTasks);
        const newNature = {...projet.nature, ...{'tasks':newTasks}}
        console.log(newNature)
        modJalon(`/api/v1/projet/${projet.id}`, {}, {'nature':newNature}, 'PUT')
    }

    useEffect(() => {
        if (projet.nature.tasks) {
            setTasks(projet.nature.tasks)
        } 

        
    }, [])


    return (
        
        <Grid             
            templateColumns='0.5fr 2fr 6fr'
            border='1px'
            padding='5px'
            margin='5px'
            borderRadius='5px'
            boxShadow='md'>
            
            <GridItem>
                <IconButton 
                    icon={tableauTaskOn?<BsBarChartSteps />:<BsReverseLayoutTextSidebarReverse />} 
                    onClick={handleClickViewTableau}                
                />
            </GridItem>

            
            <GridItem gridColumn='2 / span 2'>
                {
                    tableauTaskOn&&<TableTasks tasks={tasks} updateTasks={updateTasks}/>
                }
                
            </GridItem>

            <GridItem  gridColumn='2 / span 2'>
                {

                    !tableauTaskOn&&
                    <FrappeGantt
                    tasks={tasks}
                    viewMode={mode}
                    onClick={task => console.log('click')}                
                    onDateChange={(task, start, end) => handleDateChange(task, start, end)}
                    onProgressChange={(task, progress) => console.log('ok')}
                    onTasksChange={tasks => console.log('ok')}
                />
                }
            </GridItem>
                
              
        </Grid>
        

    )
}