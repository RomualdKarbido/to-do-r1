class Router {
    constructor(routes, root) {
        this.routes = routes;
        this.root = document.getElementById(root);
    }

    init() {
        window.addEventListener('hashchange', () => this.hashChange());
        this.hashChange();
    }

    hashChange() {
        if (location.hash.length > 0) {

            this.routes.forEach((i) => {
                if (i.acivePath(location.hash)) {
                    this.follow(i.htmlFname);
                }
            });
        }
        else {

            this.routes.forEach((i) => {
                if (i.isHome) {
                    this.follow(i.htmlFname);
                }
            });
        }
    }

    follow(path) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${path}`);
        xhr.onloadend = () => {
            this.root.innerHTML = xhr.responseText;
            if (location.hash == '#login') {
                reload();
            }
            else if (location.hash == '#reg') {
                reload4();
            }
            else if (location.hash == '' || location.hash == '#home') {
                reload5();
            }
            else if (location.hash == '#edit') {
                reload3();
            }
            else {
                reload2();
            }
        }
        xhr.onerror = () => {
            console.log(xhr.status);
        }
        xhr.send();
    }
}
