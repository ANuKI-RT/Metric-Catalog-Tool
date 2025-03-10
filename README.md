# Metric-catalog-tool

TODO: we need to update this README to make it more clear...

## How to set up the project

We have 2 parts in the project: server and client. Server is done with Nodejs and Kraken. Client is done with Vue.js.

To run the server you need to do the following:

```
cd backend
npm i
npm run start
```

### how to debug

To start the backend in a debugging session, run the `dev` npm script and attach a debugger to it, e.g. in visual Studio code

```shell
npm run dev
```

Additionally we need to set up the local database. You will find inside the folder Backend the file `.env.example`. Just make a copy of this file and rename it to `.env` and add the URL of the Database service of your choice (like mongodb).

A good way to do it is by using [MongoDB Compass](https://www.mongodb.com/products/tools/compass) to have a visual overview of the content of the db.

To run the client you need to do the following:

```
cd vue
npm i
npm run dev
```
