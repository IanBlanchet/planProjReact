import { useState, useEffect, useContext }from 'react'
import { Grid, GridItem, IconButton} from '@chakra-ui/react'
import { FrappeGantt } from 'frappe-gantt-react'
import { TableTasks } from './tableTask'
import { BaseDataContext } from '../../../../auth'
import { BsBarChartSteps, BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { modJalon } from '../../../util'



const transformDate = (date) => {
    const getYear = date.toLocaleDateString('default', {year:'numeric'});
    const getMonth = date.toLocaleDateString('default', {month:'2-digit'});
    const getDay = date.toLocaleDateString('default', {day:'2-digit'});
    return (getYear + '-' + getMonth + '-' + getDay)
}

export function Gantt({projet, updateNature})  {
    const {blanckNature} = useContext(BaseDataContext)
    const [ mode, setMode] = useState('Month')
    const [ tasks, setTasks] = useState(blanckNature.tasks)
    const [ tableauTaskOn, setTableauTaskOn] = useState(false)

    const handleDateChange = (updateTask, start, end) => {        
        let newTasks = [...tasks]
        const taskIndex = newTasks.findIndex(item => item.id === updateTask.id);        
        newTasks[taskIndex].start = transformDate(start);
        newTasks[taskIndex].end = transformDate(end);
        setTasks(newTasks);
        const newNature = {...projet.nature, ...{'tasks':newTasks}};        
        updateNature(newNature);
    }

    const handleProgessChange = (updateTask, progress) => {
        let newTasks = [...tasks]
        const taskIndex = newTasks.findIndex(item => item.id === updateTask.id);        
        newTasks[taskIndex].progress = progress;        
        setTasks(newTasks);
        const newNature = {...projet.nature, ...{'tasks':newTasks}};        
        updateNature(newNature);
    }

    const handleClickViewTableau = () => {

        tableauTaskOn?setTableauTaskOn(false):setTableauTaskOn(true)
    }

    const updateTasks = (updateTask) => {
        const newTasks = [...tasks]
        const taskIndex = newTasks.findIndex(item => item.id === updateTask.id);        
        newTasks[taskIndex] = updateTask;        
        setTasks(newTasks);
        const newNature = {...projet.nature, ...{'tasks':newTasks}};        
        updateNature(newNature);        
    }

    const addTask = (newtask) => {        
        const newTasks = [...tasks, newtask];
        setTasks(newTasks);
        const newNature = {...projet.nature, ...{'tasks':newTasks}};        
        updateNature(newNature); 
        
    } 

    const deleteTask = (taskToDelete) => {
        console.log(taskToDelete);
        let newTasks = [...tasks]
        newTasks = newTasks.filter(task => task !== taskToDelete)
        for (let i=0;  i < newTasks.length; i++) {
            newTasks[i].id = (i+1).toString()
        };
        console.log(newTasks)
        setTasks(newTasks);
        const newNature = {...projet.nature, ...{'tasks':newTasks}}; 
        updateNature(newNature); 

    }

    useEffect(() => {
        if (projet.nature.tasks) {
            setTasks(projet.nature.tasks)
        } 
        
    }       
    , [projet])


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
                    tableauTaskOn&&<TableTasks 
                                        tasks={tasks} 
                                        updateTasks={updateTasks} 
                                        addTask={addTask}
                                        deleteTask={deleteTask}/>
                }
                
            </GridItem>

            <GridItem  gridColumn='2 / span 2'>
                {

                    !tableauTaskOn&&
                    <FrappeGantt
                    tasks={tasks}
                    viewMode={mode}
                    //onClick={task => console.log('click')}                
                    onDateChange={(task, start, end) => handleDateChange(task, start, end)}
                    onProgressChange={(task, progress) => handleProgessChange(task, progress)}
                    //onTasksChange={tasks => console.log('ok')}
                />
                }
            </GridItem>
                
              
        </Grid>
        

    )
}