import AltContainer from 'alt-container';
import React, { PropTypes } from 'react';
import ons from 'onsenui';
import { Page, Toolbar, Input, Fab, Icon, ToolbarButton } from 'react-onsenui';
import asteroid from './Connect';
import TaskActions from '../actions/TaskActions';
import TaskStore from '../stores/TaskStore';
import Tasks from './Tasks';

const MainPage = ({navigator}) => {
  const handleNewTaskClick = () => {
    ons.notification.prompt({
      title: 'New Task',
      message: 'Include a task title.',
      placeholder: 'I want to...',
      cancelable: true,
      buttonLabel: 'Save Task'
    })
    .then(saveTask);
  };

  const saveTask = inputValue => {
    const text = inputValue.trim();

    if (text) {
        asteroid.call('addTodo', text)
            .then(result => {
                /*We subscribe to ToDo collection. So do not call the create action below.It will add two items with same id.*/
                /*If we don't subscribe, we need to call the create action..*/
                //TaskActions.create({ id: result,message: text }); 
                console.log('Server accepted the item. List will be updated from added event');
                console.log(result);
            })
            .catch(error => {
                console.log('Error');
                console.error(error);
            });

    } else {
      ons.notification.alert('You must provide a task title!')
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar>
        <div className="center">Todos</div>
        <div className="right">
          {ons.platform.isAndroid() ? null : 
          (<ToolbarButton onClick={handleNewTaskClick}>
            New
          </ToolbarButton>)
          }
        </div>
      </Toolbar>
    );
  };

  const renderFixed = () => {
    return ons.platform.isAndroid() ? (
      <Fab
        onClick={handleNewTaskClick}
        position='bottom right'
      >
        <Icon
          icon='md-edit'
        />
      </Fab>
    )
    : null;
  };

  return (
            <Page 
                renderToolbar={renderToolbar}
                renderFixed={renderFixed}
            >
               <AltContainer stores={[TaskStore]}
                             inject={{tasks: ()=>TaskStore.getState().tasks || []}}>
                    <Tasks navigator={navigator} />
                </AltContainer>
            </Page>
  );
};

MainPage.propTypes = {
  navigator: PropTypes.object
};

export default MainPage;


