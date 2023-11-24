// TODO: Let's write something here
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

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

// ?? Schema / Type Definition / "Model" User
const userTypeDefs = `#graphql
  # Write the schema for User here
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    email: String!
  }

  # Remember for every type definition, we will need to write the "contract" function for the resolver
  # Usually we will use type "Query" for HTTP GET request
  type Query {
    # This will be the "contract" function for resolver "userByEmail"
    # This function have to input email and will return UserResponse
    userByEmail(email: String!): UserResponse 

    # This will be the "contract" function for resolver "userLogin"
    # This function have to input username and password and will return UserLoginResponse
    userLogin(username: String!, password: String!): UserLoginResponse
  }
  # And we will use type "Mutation" for HTTP POST, PUT, DELETE request
`;
const userResolvers = {
  Query: {
    userByEmail: (_, args) => {
      const { email } = args;
      const user = users.find((user) => user.email === email);

      // If user found we will return UserResponse
      return {
        statusCode: 200,
        data: user,
      };
    },

    // Implementation of "contract" function for resolver "userLogin"
    userLogin: (_, args) => {
      const { username, password } = args;

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      // If user not found
      // We will throw graphql error
      if (!user) {
        throw new GraphQLError("Invalid username or password", {
          extensions: {
            http: {
              status: 401,
            },
          },
        });
      }

      // If user found we will return UserLoginResponse
      return {
        statusCode: 200,
        data: {
          token: "this-is-a-token",
        },
      };
    },
  },
};

// ?? Schema / Type Definition / "Model" Todo
const todoTypeDefs = `#graphql
  # Write the schema for Todo here
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    userId: ID!
  }

  # Since Mutation todoCreate will have many input, we can use "input" keyword
  # to create a new type definition for the input
  input TodoCreateInput {
    userId: ID!
    title: String!
    completed: Boolean!
  }

  # Remember for every type definition, we will need to write the "contract" function for the resolver
  # Usually we will use type "Query" for HTTP GET request
  type Query {
    # This will be the "contract" function for resolver "todoList"
    # This function have to input userId and will return TodoResponse
    todoList: TodoResponse
  }

  # And we will use type "Mutation" for HTTP POST, PUT, DELETE request
  type Mutation {
    # This will be the "contract" function for resolver "todoCreate"
    # This function have to input userId, title, and completed via input TodoCreateInput
    # and will return TodoResponse
    todoCreate(input: TodoCreateInput): TodoMutationResponse

    # This will be the "contract" function for resolver "todoDelete"
    # This function have to input id
    # and will return TodoResponse
    todoDelete(id: ID!): TodoMutationResponse
  }
`;

const todoResolvers = {
  Query: {
    // Implementation of "contract" function for resolver "todoList"
    todoList: () => {
      // If todoList found we will return TodoResponse
      return {
        statusCode: 200,
        data: todos,
      };
    },
  },
  Mutation: {
    // Implementation of "contract" function for resolver "todoCreate"
    todoCreate: (_, args) => {
      const { input } = args;
      const { userId, title, completed } = input;

      const id = todos.length + 1;

      // We will create new todo
      const newTodo = {
        userId: Number(userId),
        // We will use the fastest way to generate id (will have duplicate !)
        id,
        title,
        completed,
      };

      // We will push new todo to todos
      todos.push(newTodo);

      // If todoList found we will return TodoResponse
      return {
        statusCode: 200,
        message: `Todo with id ${id} created successfully`,
      };
    },

    // Implementation of "contract" function for resolver "todoDelete"
    todoDelete: (_, args) => {
      const { id } = args;

      // We will filter todos and remove the todo with id
      todos = todos.filter((todo) => todo.id !== Number(id));

      // If todoList found we will return TodoResponse
      return {
        statusCode: 200,
        message: `Todo with id ${id} deleted successfully`,
      };
    },
  },
};

const responseTypeDefs = `#graphql
  # Write the schema for Response here
  interface Response {
    # status will be flagged as required
    statusCode: String!

    # message is optional
    message: String

    # error is optional
    error: String
  }

  # We will create a new type definition for UserLoginData
  # This type definition will be used for UserLoginResponse
  type UserLoginData {
    token: String
  }

  # We will "extend" the Response interface to create a new type definition
  # Using keyword "implements"
  type UserResponse implements Response {
    statusCode: String!
    message: String
    error: String
    data: User
  }

  # We will create a new type definition for UserResponse
  type UserLoginResponse implements Response {
    statusCode: String!
    message: String
    error: String
    data: UserLoginData
  }

  type TodoResponse implements Response {
    statusCode: String!
    message: String
    error: String
    data: [Todo]
  }

  type TodoMutationResponse implements Response {
    statusCode: String!
    message: String
    error: String
  }

  # For this type definition, we will not make any resolver
  # Because this type definition is only used for response
`;

const server = new ApolloServer({
  typeDefs: [responseTypeDefs, userTypeDefs, todoTypeDefs],
  resolvers: [userResolvers, todoResolvers],
});

// IIFE
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: 4000,
  });

  console.log(`🚀 Server ready at ${url}`);
})();
