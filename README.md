# NODE TODO

The purpose of this repo is to demonstrate how to use NodeJS, TypeORM, TypeGraphQL to implement a simple todo list backend.

## Usage

* From your local computer's terminal, run `git clone https://github.com/smithaitufe/node-todo.git`
* Change to `node-todo` directory using `cd node-todo`
* Run `npm install` to download packages
* Run `npm start` to start both the express app and apollo server
* Go to your web browser address bar and type `http://localhost:3000`

## Example graphql request
1   Fetch all todos
```
query todos {
  todos {
    id
    description
    completed
    createdAt
    updatedAt
    deletedAt
  }
}
```
2   Fetch a todo item 
```
query todo {
  todo(id: 10){
    id
    description
    completed
    createdAt
    updatedAt
  }
}
```
3   Create a new todo item
```
mutation createTodo {
  createTodo(input: { description: "Have a meeting with the team"}) {
    id
    description
    completed
  }
}
```
4   Update existing todo
```
mutation editTodo {
  editTodo(id: 1, input: { description: "Have a meeting with the team", completed: true }) {
    id
    description
  }
}
```
5   Remove existing todo
```
mutation deleteTodo {
  deleteTodo(id: 1){
    id
    deletedAt
  }
}
```
