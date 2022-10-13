import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init(socket);
  root.render(vdom);
};

app();
