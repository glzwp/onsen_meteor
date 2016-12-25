import uuid from 'uuid';
import alt from '../libs/alt';
import TaskActions from '../actions/TaskActions';
class TaskStore {
    constructor() {
        this.bindActions(TaskActions);
        this.tasks = [];
        //this.exportPublicMethods({
        //    getTasksByIds: this.getTasksByIds.bind(this)
        //});
    }
    create(task) {
        const tasks = this.tasks;
        task.id = uuid.v4();
        task.checked = false;
        //It is a feature of Alt that allows us to signify that we are going to alter the store state.
        //Alt will signal the change to possible listeners
        this.setState({
            tasks: tasks.concat(task)
        });
        return task;
    }
    delete(id) {
        this.setState({
            tasks: this.tasks.filter(task => task.id !== id)
        });
    }
    /*
    update(updatedTask) {
        const tasks = this.tasks.map(task => {
            if (note.id === updatedNote.id) {
                // Object.assign is used to patch the note data here. It
                // mutates target (first parameter). In order to avoid that,
                // I use {} as its target and apply data on it.
                //
                // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
                //
                // You can pass as many objects to the method as you want.
                return Object.assign({}, task, updatedTask);
            }
            return task;
        });
        // This is same as `this.setState({tasks: tasks})`
        this.setState({ tasks });
    }
        getTasksByIds(ids) {
        // 1. Make sure we are operating on an array and
        // map over the ids
        // [id, id, id, ...] -> [[Note], [], [Note], ...]
        return (ids || []).map(
            // 2. Extract matching notes
            // [Note, Note, Note] -> [Note, ...] (match) or [] (no match)
            id => this.tasks.filter(task => task.id === id)
            // 3. Filter out possible empty arrays and get notes
            // [[Note], [], [Note]] -> [[Note], [Note]] -> [Note, Note]
        ).filter(a => a.length).map(a => a[0]);
    }
    */


}
export default alt.createStore(TaskStore, 'TaskStore');