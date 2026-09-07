// Vercel serverless entry point. Vercel's Node runtime calls a default-exported
// (req, res) handler — an Express app already has that exact signature, so it
// can be exported directly with no adapter. Local/other-host deployment still
// goes through src/server.js, which wraps the same app in app.listen().
import {app} from '../src/app.js';

export default app;

//ignore
