import { useState }from 'react'

import { FrappeGantt } from 'frappe-gantt-react'



let basetasks = [
    {
      id: 'Task 1',
      name: 'Redesign website',
      start: '2016-12-28',
      end: '2016-12-31',
      progress: 20,
      dependencies: ''
    },
    {
        id: 'Task 2',
        name: 'Redesign website',
        start: '2016-12-31',
        end: '2017-01-30',
        progress: 20,
        dependencies: 'Task 1'
      },
      {
        id: 'Task 3',
        name: 'Redesign website',
        start: '2016-12-31',
        end: '2017-01-30',
        
        dependencies: 'Task 1'
      }
    
  ]



export function Gantt({steps})  {

    const [ mode, setMode] = useState('Week')
    const [ tasks, setTasks] = useState(basetasks)

    const handleDateChange = (task, start, end) => {
        let newTasks = [...tasks]
        const editedTask = newTasks.find((item) => item.id === task.id);
        editedTask.start = start;
        editedTask.end = end;
        setTasks(newTasks)
    }

    return (
        
        <div>
            <FrappeGantt
                tasks={tasks}
                viewMode={mode}
                onClick={tasks => console.log('click')}                
                onDateChange={(task, start, end) => handleDateChange(task, start, end)}
                onProgressChange={(tasks) => console.log('progress')}
                onTasksChange={tasks => console.log('no')}
            />
        </div>
        

    )
}