import asteroid from '../libs/asteroid';
import TaskActions from '../actions/TaskActions';

// if you want realitme updates in all connected clients
// subscribe to the publication
asteroid.subscribe('todo');
asteroid.ddp.on('added', (doc) => {
    // we need proper document object format here
    if (doc.collection === 'todo') {
        const docObj = Object.assign({}, doc.fields, { id: doc.id });
        TaskActions.create(docObj);
    }
});

asteroid.ddp.on('removed', (removedDoc) => {
    if (removedDoc.collection === 'todo') {
        TaskActions.delete(removedDoc.id);
    }
});

asteroid.ddp.on('changed', (updatedDoc) => {
    if (updatedDoc.collection === 'todo') {
        const docObj = Object.assign({}, updatedDoc.fields, { id: updatedDoc.id });
        TaskActions.update(docObj);
        console.log('doc changed..');
    }
});

export default asteroid;