# Remind Clone Web Server

## Start development server

```sh
npm run dev
```

## Start development server (debugging)

```sh
npm run debug
```

## Building the database in local MySQL Server

1. Edit `./config/knexfile.js` to configure database connection.

2. Run `npm run migrate:up` in your terminal.

## Add placeholder data

```sh
npm run seed:run
```
