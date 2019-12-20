const findLoaderByName = (rules, name) => {

    for (const {loaders} of rules) {
        for (const loader of loaders) {
            const loaderName = loader.loader;

            if (loaderName === 'proxy-loader') {
                if (loader.options.loader === name) {
                    return loader.options;
                }
            }
            else if (loaderName === name) {
                return loader;
            }
        }
    }

    return null;
};

export default (config, env, helpers) => {
    const sassLoader = findLoaderByName(helpers.getLoaders(config), 'sass-loader');
    sassLoader.options.data = `
        @import '~sassyfication';
        @import 'src/styles/global.scss';
    `;

    Object.assign(config.resolve.alias, {
        'react': 'preact/compat',
        'react-dom': 'preact/compat'
    });
};


