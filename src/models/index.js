import { dbPromise } from '../database/index.js';

export const getNavigationLinks = async () => {
    const db = await dbPromise;
    const links = await db.all('SELECT * FROM nav');
    console.log(links)
    return links;
};