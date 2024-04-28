// TODO: Let's write something here
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// ?? Initial data users
const users = [
	{
		id: 1,
		name: "Leanne Graham",
		username: "Bret",
		password: "123456",
		email: "halo@mail.com",
	},
	{
		id: 2,
		name: "Ervin Howell",
		username: "Antonette",
		password: "123456",
		email: "admin@mail.com",
	},
	{
		id: 3,
		name: "Clementine Bauch",
		username: "Samantha",
		password: "123456",
		email: "other@mail.com",
	},
];

// ?? Initial data todos
const todos = [
	{
		userId: 1,
		id: 1,
		title: "delectus aut autem",
		completed: false,
	},
	{
		userId: 2,
		id: 2,
		title: "quis ut nam facilis et officia qui",
		completed: false,
	},
	{
		userId: 3,
		id: 3,
		title: "fugiat veniam minus",
		completed: false,
	},
	{
		userId: 1,
		id: 4,
		title: "et porro tempora",
		completed: true,
	},
	{
		userId: 2,
		id: 5,
		title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
		completed: false,
	},
	{
		userId: 3,
		id: 6,
		title: "qui ullam ratione quibusdam voluptatem quia omnis",
		completed: false,
	},
	{
		userId: 1,
		id: 7,
		title: "illo expedita consequatur quia in",
		completed: false,
	},
	{
		userId: 2,
		id: 8,
		title: "quo adipisci enim quam ut ab",
		completed: true,
	},
	{
		userId: 3,
		id: 9,
		title: "molestiae perspiciatis ipsa",
		completed: false,
	},
	{
		userId: 1,
		id: 10,
		title: "illo est ratione doloremque quia maiores aut",
		completed: true,
	},
	{
		userId: 2,
		id: 11,
		title: "vero rerum temporibus dolor",
		completed: true,
	},
	{
		userId: 3,
		id: 12,
		title: "ipsa repellendus fugit nisi",
		completed: true,
	},
	{
		userId: 1,
		id: 13,
		title: "et doloremque nulla",
		completed: false,
	},
	{
		userId: 2,
		id: 14,
		title: "repellendus sunt dolores architecto voluptatum",
		completed: true,
	},
	{
		userId: 3,
		id: 15,
		title: "ab voluptatum amet voluptas",
		completed: true,
	},
];

/*
  List of Queries:
  - todoList
  - userByEmail
  - userLogin
  
  List of Mutation:
  - todoCreate
  - todoDelete
*/
