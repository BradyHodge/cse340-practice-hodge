import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import baseRoute from './src/routes/index.js';
import layouts from './src/middleware/layouts.js';
import staticPaths from './src/middleware/static-paths.js';
import { notFoundHandler, globalErrorHandler } from './src/middleware/error-handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(staticPaths);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.set('layout default', 'default');
app.set('layouts', path.join(__dirname, 'src/views/layouts'));
app.use(layouts);

app.use('/', baseRoute);

app.use(notFoundHandler);
app.use(globalErrorHandler);

const MODE = process.env.MODE || 'production';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});