# Task App Server
Task App is an application to manage your your list of agenda. This app has : 
* RESTful endpoint for Task's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /task

> Create new Task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Bikin backend kamban",
  "description": "Disesuaikan dengan yang ada dari API Doc",
  "category": <can be declare or default backlog>
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "title": "Bikin backend kamban",
    "description": "Disesuaikan dengan yang ada dari API Doc",
    "category": "Development",
    "UserId": 1,
    "updatedAt": "2021-04-06T10:45:14.044Z",
    "createdAt": "2021-04-06T10:45:14.044Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error", detailError: err"
}
```

### GET /task

> Show all Task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
[
    {
        "id": 1,
        "title": "Bikin backend kamban",
        "description": "Disesuaikan dengan yang ada dari API Doc",
        "category": "Development",
        "createdAt": "2021-04-06T10:45:14.044Z",
        "updatedAt": "2021-04-06T10:45:14.044Z",
        "UserId": 1,
        "User": {
            "id": 1,
            "name": "Aman"
        }
    }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error", detailError: err"
}
```

### GET /task/:id

> Show selected Task with same UserId and same from user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{
  id: 1
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "Bikin backend kamban",
    "description": "Disesuaikan dengan yang ada dari API Doc",
    "category": "Development",
    "createdAt": "2021-04-06T10:45:14.044Z",
    "updatedAt": "2021-04-06T10:45:14.044Z",
    "UserId": 1,
    "User": {
        "id": 1,
        "name": "Aman"
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error", detailError: err"
}
```

### PUT /task/:id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{
  id: 1
}
```

_Request Body_
```
{
    "title": "Bikin backend kamban",
    "description": "Disesuaikan dengan yang ada dari API Doc",
    "category": "Development",
}
```

_Response (200 - OK)_
```
[
    1,
    [
        {
            "id": 1,
            "title": "Bikin backend kamban",
            "description": "Disesuaikan dengan yang ada dari API Doc",
            "category": "Development",
            "createdAt": "2021-04-06T10:45:14.044Z",
            "updatedAt": "2021-04-06T13:48:59.266Z",
            "UserId": 1
        }
    ]
]
```

_Response (404)_
```
{
  "message": "<validation error>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error", detailError: err"
}
```

### PATCH /task/:id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  id: 1
}
```

_Request Body_
```
{
    "category": "Done"
}
```

_Response (200 - OK)_
```
[
    1,
    [
        {
            "id": 1,
            "title": "Bikin backend kamban",
            "description": "Disesuaikan dengan yang ada dari API Doc",
            "category": "Done",
            "createdAt": "2021-04-06T10:45:14.044Z",
            "updatedAt": "2021-04-06T13:50:59.448Z",
            "UserId": 1
        }
    ]
]
```

_Response (404)_
```
{
  "message": "<validation error>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error", detailError: err"
}
```

### DELETE /task/:id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  id: 1
}
```

_Request Body_
```
{
not needed
}
```

_Response (200 - OK)_
```
{
   "message": "Task success to delete"
}
```

_Response (404)_
```
{
  "message": "<validation error>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error", detailError: err"
}
```

### POST /register

> Create new user

_Request Header_
```
{
  null
}
```

_Request Body_
```
{
  "name": "Aman",
  "email": "aman@kak.com",
  "password": "aman"
}
```

_Response (201 - Created)_
```
{
    "name": "Aman",
    "email": "aman@kak.com"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error"
}
```



### POST /login

> Login for User

_Request Body_
```
{
  "email": "aman@kak.com",
  "password": "aman"
}
```

_Response (200 - OK)_
```
{
    "id": 1,
    "name": "Aman",
    "email": "aman@kak.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFtYW4iLCJlbWFpbCI6ImFtYW5Aa2FrLmNvbSIsImlhdCI6MTYxNzcxNjEyNH0.dvvGWw5EzduNmy6DBS-NPqZbAuHV3GA4neMVosySCoA"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<invalid email or password>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error"
}
```


