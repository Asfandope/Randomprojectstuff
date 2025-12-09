# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Users

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### Delete Account
```http
DELETE /api/users/account
Authorization: Bearer <token>
```

### Data

#### Get All Data
```http
GET /api/data?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Data by ID
```http
GET /api/data/:id
Authorization: Bearer <token>
```

#### Create Data
```http
POST /api/data
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Data",
  "content": "Some content",
  "metadata": {}
}
```

#### Update Data
```http
PUT /api/data/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title"
}
```

#### Delete Data
```http
DELETE /api/data/:id
Authorization: Bearer <token>
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "message": "Error message here"
  }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

