const router = new Router ([
  new Route('home', 'pages/home.html' , true),
  new Route('login', 'pages/login.html'),
  new Route('reg', 'pages/reg.html'),
  new Route('todo', 'pages/todo.html'),
  new Route('edit', 'pages/edit.html')
], 'app');
router.init();
