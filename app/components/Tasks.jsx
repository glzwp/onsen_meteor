import React, { PropTypes } from 'react';
import { List, ListHeader } from 'react-onsenui';
import Task from './Task';


const Tasks = ({tasks,navigator}) => {
    const taskClickHandler = index => {
        /*
        navigator.pushPage({
            component: TaskDetailsPage,
            key: 'TASK_DETAILS_PAGE',
            task: tasks[index],
            props: {
                task: tasks[index]
            }
        });
        */
        console.log('Task is clicked..');
    };
    const renderTask = (task, index) => {
        return (
                    <Task key={task.id} onClick={() => taskClickHandler(index)} task={task} />
               );
    };

    return (
                <List   dataSource={tasks}
                        renderRow={renderTask}
                        renderHeader={() => <ListHeader>To Do</ListHeader>}
                />
    );
};

Tasks.propTypes = {
        tasks: PropTypes.array.isRequired,
        navigator: PropTypes.object
};

export default Tasks;
