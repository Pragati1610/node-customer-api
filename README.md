# Node.js server

This repository contains a dockerised node app with tests.

# 1. Get started

## 2.1. Running the project locally

You can run the project locally with your own local [Postgres](https://www.postgresql.org) instance.

```
npm run dev
```

Make sure to update the app with your database credentials in the `.env` file by following contents of `.env.sample` file.

## 2.2. Running with docker compose

### docker-compose up

Running:

```
docker-compose up
```

will spin up the express server (internally port `8080`) forwarded to port `8080` on the host machine

To run in detached mode, use

```
docker-compose up -d
```

### 2.2.2 clean docker-compose run

If you would like to do a clean run (i.e. remove all data in already stopped containers), you can run

```
docker container prune
```

to remove all unused containers

As an alternative you can run

```
docker system prune
```

to clean up all unused resources. Note that this removes all the unused images, volumens etc. on your host machine.

### 2.2.3 docker-compose stop vs docker-compose down

Note that typing `ctrl` + `c` when running `docker-compose up` will only stop the container, but not remove it - which is equivalent of running:

```
docker-compose stop
```

I.e. if you start up the container again, the database will contain the data you have put in before.

# 3 Testing

## 3.1. Testing with npm

Running

```
npm test
```

will then run all the tests with `mocha` as a test runner.

Note that this adds data to your local database.

## 3.2. Testing with docker-compose

```
docker-compose -f docker-compose.dev.yml run customer_api npm run test
```
