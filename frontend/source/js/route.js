class Route {
  constructor(name, htmlFname, isHome) {
    this.name = name;
    this.htmlFname = htmlFname;
    this.isHome = isHome;
  }
  acivePath(path) {
    return path.replace('#', '') == this.name;
  }
}
