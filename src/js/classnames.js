export const classnames = obj => {
    const classnames = [];

    for (const key of Object.keys(obj)) {
        if (obj[key]) {
            classnames.push(key);
        }
    }

    return classnames.join(' ');
};
