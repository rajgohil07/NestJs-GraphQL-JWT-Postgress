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
# to get access of all registered user listing
query {
  findAllUserData {
    AllUserData {
      Name
      Email
      ID
    }
    CurrentUser {
      Name
      Email
      ID
    }
  }
}
# pass JWT token as headers as displayed below
{
  "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MywiTmFtZSI6InJhaiBnb2hpbCIsIkVtYWlsIjoicmFqLmZhbW91czAwMTFAZ21haWwuY29tIiwiaWF0IjoxNjUwOTc1MDQ1LCJleHAiOjE2NTA5Nzg2NDV9.bvONQt1qzGtFd7O5chQwETnhrwW1ixsB37AzbXIRIEA"
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
