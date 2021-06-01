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

#### Clone the project with:

  ```bash
  $ git clone https://github.com/kaanersoy/slicer-fun.git
  ```

#### Go to path of project

  ```bash
  $ cd projectpath && npm install
  ```

#### Fill the `env` variables

  ```
  DB_URL=example.url
  PORT=1523
  ```

#### Run the project

  ```bash
  # for developer mode
  $ npm run dev
  # for production mode
  $ npm run start
  ```

## API Usage

API URI: https://slicer.fun

### Create Shortened URL

`slug` is optional, you can generate random slugs if you don't send slug.

Example Request:

```js
fetch('https://slicer.fun/url', {
  method: 'POST',
  headers: {
    headers: {
      'Content-Type': 'application/json'
    },
  }
  body: JSON.stringify({
    url: 'https://google.com',
    slug: 'google' // optional
  })
})
```
Response: 
```json
{
  "_id": "60ab36s7b1ee4cc2dd9e3b576",
  "url": "https://google.com",
  "slug": "google"
}
```

### Redirection:

Just do a simple get request from client.

Example: 
```
https://slicer.fun/:slug
```
