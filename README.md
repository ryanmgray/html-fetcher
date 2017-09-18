# HTML Fetcher

## Description
A job queue whose workers fetch HTML contents from a URL and store the results in a database.

## Getting Started

### Install Dependencies
```	
npm install
```

### Start MongoDB
```
mongod.exe
```

### Start Server
```	
npm start
```

## API

### POST /job
Creates a new job with the specified URL.

#### Example Request
```HTTP
POST /job
Host: http://localhost:8000
Content-Type: application/json

{"url": "www.cnn.com"}
```

#### Example Response
```JSON
{
  "id": "59bf593147541f04e0ec9cf9",
  "createdAt": "2017-09-18T05:27:13.889Z",
  "status": "pending",
  "url": "www.cnn.com"
}
```

### GET /job/:id
Returns job data for the specified job id. 

#### Example Request
```HTTP
GET /job/59bf593147541f04e0ec9cf9
Host: http://localhost:8000
```

#### Example Response
```JSON
{
  "id": "59bf593147541f04e0ec9cf9",
  "createdAt": "2017-09-18T05:27:13.889Z",
  "status": "complete",
  "url": "www.cnn.com",
  "data": "<!DOCTYPE html>..."
}
```