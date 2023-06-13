import Jokes from "../pages/jokes/Jokes";
import AddJoke from "../pages/jokes/AddJoke";
import Login from "../pages/Login";

const routes = [
  {
    path: "/app/jokes",
    exact: true,
    name: "Jokes List",
    component: Jokes,
  },
  {
    path: "/app/create-joke",
    exact: true,
    name: "Create Joke",
    component: AddJoke,
  },
  {
    path: "/app/edit-joke/:id",
    exact: true,
    name: "Edit Joke",
    component: AddJoke,
  },
  {
    path: "/",
    exact: true,
    name: "Login",
    component: Login,
  },
];

/* Some text */

export default routes;
