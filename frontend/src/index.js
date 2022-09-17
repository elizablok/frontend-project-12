import ReactDOM from 'react-dom/client';
import init from './init';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(vdom);
};

app();
