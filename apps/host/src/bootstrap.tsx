import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { init, preloadRemote } from '@module-federation/enhanced/runtime';
import dynamicplugin from './dynamic-loader-plugin';

init({
  name: 'mfe_monorepo',
  remotes: [],
});
init({
    name: 'host',
    remotes: [],
});
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<App />);
