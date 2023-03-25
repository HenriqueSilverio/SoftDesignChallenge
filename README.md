# SoftDesign Back-End Challenge

## Prerequisites

- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Database

This project uses <a target="_blank" href="https://www.mongodb.com">MongoDB</a> for data storege, and <a target="_blank" href="https://www.prisma.io">Prisma</a> as a ORM.

The Prisma's MongoDB database connector uses transactions to support nested writes. Transactions **require** a <a target="_blank" href="https://docs.mongodb.com/manual/tutorial/deploy-replica-set">replica set</a> deployment. The easiest way to deploy a replica set is with <a target="_blank" href="https://www.mongodb.com/cloud/atlas">Atlas</a>. It's free to get started.

Make sure you have your database <a target="_blank" href="https://www.prisma.io/docs/concepts/database-connectors/mongodb#connection-url">connection URL</a> at hand.

## Environment variables

In the project's root directory, create a `.env` file:

```
cp .env.example .env
```

Then fill the values in your `.env` file accordingly.

| Variable         | Description |
| :--------------- | :---------- |
| `DATABASE_URL`   | String. MongoDB <a target="_blank" href="https://www.prisma.io/docs/concepts/database-connectors/mongodb#connection-url">connection URL</a>. |
| `JWT_SECRET`     | String. JWT sign secret.  |
| `WEBSERVER_PORT` | Number. HTTP server port. |

## Database seeding

The build step of the Docker image runs a database seed.

Those are the documents created by the seed:

### User

```javascript
{
  "_id": ObjectId("641b16c92e3a54c71a80db5c"),
  "uuid": "06a4c49e-4659-485d-b656-247c58a21605",
  "email": "admin@mail.com",
  "password": "$2b$10$GQtDOkAybsuKHasCS99V7uPG86CHvmtn0hqFfIre6YIhbCAmm1PSC"
}
```

**Shhh!** Don't tell anyone that this user's `password` here is the hash of `secret` string!

### Books

```javascript
[{
  "_id": ObjectId("641b9ab9e22b4e7aaf548b90"),
  "uuid": "c788a92f-9254-414e-806a-1ad2b7a4b863",
  "title": "Object-oriented Software Construction",
  "author": "Bertrand Meyer",
  "summary": "The comprehensive reference on all aspects of object technology."
}, {
  "_id": ObjectId("641b9ac3b0ffeb5fa5271c18"),
  "uuid": "0cb208d9-2c32-404d-8adb-45a194a73fe6",
  "title": "Object Oriented Software Engineering: A Use Case Driven Approach",
  "author": "Ivar Jacobson",
  "summary": "This book is based on Objectory. An extensible industrial process for building large systems."
}]
```

### Rental

```javascript
{
  "_id": ObjectId("641b9d221a1554cda570bc74"),
  "uuid": "3f3faa5e-8939-4fa3-929b-3e2e791e5987",
  "userID": ObjectId("641b16c92e3a54c71a80db5c"),
  "bookID": ObjectId("641b9ab9e22b4e7aaf548b90"),
  "rentedAt": Date("2023-03-22T00:00:00.000+00:00")
}
```

## Running with Docker

Spin-up the application:

```bash
docker-compose up
```

Useful commands:

SSH into the application container:

```bash
docker-compose exec softdesign /bin/sh
```

(Re)build the application image:

```bash
docker-compose build
```

## HTTP Endpoints

By default, server listens to `http://localhost:3000`.

| Verb     | URI                  | Description                           |
| :------- | :------------------- | :------------------------------------ |
| `POST`   | `/signin`            | User's sign in.                       |
| `POST`   | `/books`             | Create book.                          |
| `GET`    | `/books?search=term` | List books. Optional: `search` query. |
| `GET`    | `/books/:id`         | Show book details.                    |
| `PUT`    | `/books/:id`         | Update book.                          |
| `DELETE` | `/books/:id`         | Delete book.                          |
| `POST`   | `/books/:id/rent`    | Rent book.                            |

### Testing with Insomnia

In the `docs` directory, there is a <a target="_blank" href="https://insomnia.rest">Insomnia</a> exported collection, so that you can <a target="_blank" href="https://docs.insomnia.rest/insomnia/import-export-data">import it</a> and try out the requests.

## Unit tests

In order to run the unit tests, you'll need Node.js ^18.15 and npm ^9.5. To install them, I recommend using <a target="_blank" href="https://github.com/nvm-sh/nvm">nvm</a>.

Install the dependencies:

```bash
npm i
```

Run the tests:

```bash
npm test
```

## References

My coding style and what I've tried to give a demo here, is heavily inspired on patterns and pratices that was documented by hard work of some great guys of our industry. Just to mention a few:

- Object-oriented Software Construction (Bertrand Meyer)
- Object-oriented Software Engineering (Ivar Jacobson)
- Patterns of Enterprise Application Architecture (Martin Fowler)
- Design Patterns: Elements of Reusable Object-Oriented Software (Erich Gamma, Richard Helm, Ralph Johnson Dr, John Vlissides)
- Domain-Driven Design (Eric Evans)
- Implementing Domain-Driven Design (Vaughn Vernon)
- Clean Architecture (Robert C. Martin)
