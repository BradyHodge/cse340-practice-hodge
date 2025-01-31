import { renderFile } from 'ejs';
import path from 'path';

const layouts = (req, res, next) => {
    const layoutDir = req.app.get('layouts') || path.join(process.cwd(), 'views/layouts');
    const defaultLayout = req.app.get('layout default')?.replace(/\.ejs$/, '') || 'default';

    const originalRender = res.render;
    
    res.render = (view, options = {}, callback) => {
        if (options.layout === false) {
            return originalRender.call(res, view, options, callback);
        }

        const viewsDir = res.app.get('views');
        const viewPath = view.startsWith(viewsDir) ? view : path.join(viewsDir, `${view}.ejs`);

        renderFile(viewPath, options, (err, body) => {
            if (err) {
                return next(err);
            }

            options.body = body || '';

            const layoutFile = `${options.layout || defaultLayout}.ejs`;
            const layoutPath = path.join(layoutDir, layoutFile);

            originalRender.call(res, layoutPath, options, callback);
        });
    };

    if (!res.headersSent) {
        next();
    }
};

export default layouts;
