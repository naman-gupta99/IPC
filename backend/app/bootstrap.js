import nodesInit from './bootstrap/nodes-init';
import mongoConnect from './bootstrap/mongodb';

const bootstrap = () => {
    nodesInit();
    mongoConnect();
}

export default bootstrap;