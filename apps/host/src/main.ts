import { registerRemotes } from '@module-federation/enhanced/runtime';

import('./bootstrap').catch((err) => console.error(err));

// fetch('./assets/mf-remote-manifest.local.json')
//     .then((res) => res.json())
//     .then((remotes) => {
//         return registerRemotes(remotes, { force: true });
//     })
//     .then(() => import('./bootstrap').catch((err) => console.error(err)));
