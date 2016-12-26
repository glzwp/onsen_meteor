import { createClass } from 'asteroid';


const Asteroid = createClass();
// Connect to a Meteor backend
const asteroid = new Asteroid({
    endpoint: 'ws://localhost:9000/websocket',
});

export default asteroid;