## Description

JWT with GraphQL using typeorm in Nestjs

## Installation

```bash
$ npm install
```

## Query

```bash
# to login into the system
query {
  userLogin(Email: "raj.famous007@gmail.com", Password: "123123Raj!") {
    Token
  }
}
# to findAll registered user listing
query {
  findAllUserData {
    ID
    DateCreated
    DateUpdated
    Name
    Email
  }
}

```

## Mutations

```bash
# to register the user
mutation {
  createUser(
    UserCreateObject: {
      Name: "raj gohil"
      Email: "raj.famous0011@gmail.com"
      Password: "123123Raj!"
    }
  ) {
    Name
    Email
    Password
    ID
  }
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
