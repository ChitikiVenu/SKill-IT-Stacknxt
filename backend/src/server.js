import {app} from './app.js';
import {env} from './config/env.js';

app.listen(env.port, () => {
    console.log(`Skill IT Education API listening on port ${env.port}`);
});
