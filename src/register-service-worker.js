// Register service worker
if (process.env.NODE_ENV === 'production') {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register(
            '/intl-demo/sw.js',
            {
                scope: '/intl-demo/'
            }
        );
    }
}
