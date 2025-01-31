import express from 'express';

/** @type {Array<{route: string, dir: string}|string>} Static path configurations */
const staticPaths = [
   { route: '/css', dir: 'public/css' },
   { route: '/js', dir: 'public/js' },
   { route: '/images', dir: 'public/images' }
];

/**
 * Extracts the route path from either a string or path object
 * 
 * @param {Object|string} path - Path configuration object or direct path string
 * @returns {string} The route path
 */
const getPathKey = (path) => {
   if (typeof path === 'string') {
       return path;
   }
   return path.route;
};

const configureStaticPaths = (req, res, next) => {
    const app = req.app;
    
    // A    void duplicates
    const registeredPaths = new Set(app.get('staticPaths') || []);
    
    staticPaths.forEach((path) => {
        const pathKey = getPathKey(path);
        if (!registeredPaths.has(pathKey)) {
            registeredPaths.add(pathKey);
            if (typeof path === 'string') {
                express.static(path)(req, res, next);
            } else {
                express.static(path.dir)(req, res, next);
            }
        }
    });

    // Update registered paths
    app.set('staticPaths', Array.from(registeredPaths));
    next();
}

export default configureStaticPaths;