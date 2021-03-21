# SLICER | URL Shortener

![alt text](https://github.com/kaanersoy/slicer-fun/blob/main/public/assets/slicer-logo-purp.svg)

It is a URL shortener to get shortened URLs.

## Used Tecnologies

- Heroku(Hosting)
- MongoDB(Database)
- NodeJS(Serving HTML files and API)

## Usage

A youtube tutorial here: [SLICER | Easiest URL Shortener - Kaan Ersoy](https://youtu.be/42bQf-04q6Y)

## Install

- Clone the project with:

  ```bash
  $ git clone https://github.com/kaanersoy/slicer-fun.git
  ```

- Go to path of project

  ```bash
  $ cd projectpath && npm install
  ```

- Pass your **database connection string** and **production port** to .env file like:

  ```
  DB_URL=example.url
  PORT=1523
  ```

- Run the project

  ```bash
  # for developer mode
  $ npm run dev
  # for production mode
  $ npm run start
  ```

## API Usage

- **URL Creation:**

| -             | /url (POST)  |
| ------------- | ------------ |
| url (string)  | required     |
| slug (string) | not required |

- **Redirection:**

  `GET /:id`

  Auto redirects to URL inserted in DB.
