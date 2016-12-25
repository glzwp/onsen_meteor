import React, { PropTypes } from 'react';
import { ListItem, Input, Icon } from 'react-onsenui';
import TaskActions from '../actions/TaskActions';

const Task = ({task, onClick}) => {
    const toggleChecked = () => {
        /*
        Tasks.update(task.id, {
            $set: { checked: !task.checked }
        });
        */
        console.log('Task toggled..');
    };

    const deleteThisTask = () => {
        TaskActions.delete(task.id);
    };

    return (
            <ListItem modifier="longdivider" tappable>
                <label className="left">
                    <Input
                        type="checkbox"
                        checked={task.checked}
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
                        {task.todo}
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