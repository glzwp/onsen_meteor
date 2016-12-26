import asteroid from './Connect';
import React, { PropTypes } from 'react';
import { ListItem, Input, Icon } from 'react-onsenui';
import TaskActions from '../actions/TaskActions';

const Task = ({task, onClick}) => {
    const toggleChecked = () => {

        asteroid.call('editTodo',task.id,!task.finished)
            .then(() => {
                        /*We subscribe to ToDo collection. So do not call the update action below.It will update twice.*/
                        /*If we don't subscribe, we need to call the update action..*/
                        //TaskActions.update(task.id);
                        console.log('Toggled Success');
                        })
            .catch(error => {
                        console.log('Toggle Error');
                        console.error(error);
            });

    };

    const deleteThisTask = () => {
        asteroid.call('removeTodo', task.id)
            .then(() => {
                /*We subscribe to ToDo collection. So do not call the update action below.It will call delete twice.*/
                /*If we don't subscribe, we need to call the delete action..*/
                //TaskActions.delete(task.id);
                console.log('Delete Success');
            })
            .catch(error => {
                console.log('Delete Error');
                console.error(error);
            });
    };

    return (
            <ListItem modifier="longdivider" tappable>
                <label className="left">
                    <Input
                        type="checkbox"
                        checked={task.finished}
                        onClick={toggleChecked}
                    />
                </label>
                <div
                    className="center"
                    onClick={onClick}
                >
                    <div
                        style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: 'calc(100vw - 110px)'
                                }}
                    >
                        {task.message}
                    </div>
                </div>
                <label className="right">
                    <Icon
                        icon={{default: 'ion-ios-trash-outline', material: 'md-delete'}}
                        onClick={deleteThisTask}
                    />
                </label>
            </ListItem>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default Task;