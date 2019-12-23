import './footer.scss';

export function Footer() {
    return (
        <div id="footer">
            <p>Made with</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M16.5,3C13.605,3,12,5.09,12,5.09S10.395,3,7.5,3C4.462,3,2,5.462,2,8.5c0,4.171,4.912,8.213,6.281,9.49 C9.858,19.46,12,21.35,12,21.35s2.142-1.89,3.719-3.36C17.088,16.713,22,12.671,22,8.5C22,5.462,19.538,3,16.5,3z"/>
            </svg>
            <p>by</p>
            <a href="https://github.com/Simonwep">Simon</a>
            <p> and published on</p>
            <a href="https://github.com/Simonwep/intl-demo">GitHub</a>
        </div>
    );
}
