import React, {Children, useState} from 'react';

export const TaskCntxt= React.createContext();

const TaskContext = ({children}) =>
{
    const [taskList, setTasks] = useState([]);

    const addTask = (task) =>
    {
        setTasks(() => [...taskList, task]);
    }

    return(
        <TaskCntxt.Provider value = {{taskList, addTask}}>
            {children}
        </TaskCntxt.Provider>
    )
}

export default TaskContext;