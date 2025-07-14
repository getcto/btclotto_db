# DragoorBz API Documentation

## Base Information
- Base URL: `http://localhost:3001`
- Authentication: Twitter OAuth
- Default Response Format: JSON

## Authentication Endpoints

### Initiate Twitter Authentication 
```http
GET /auth/twitter
```
**Description:** Initiates Twitter OAuth authentication flow
**Authentication:** None required

### Twitter OAuth Callback
```http
GET /auth/twitter/callback
```
**Description:** Handles Twitter OAuth callback
**Response Cookies:**
- `twitter.username`
- `twitter.profile_image_url`

### Disconnect Authentication
```http
GET /auth/disconnect
```
**Description:** Clears all Twitter authentication cookies

## User Endpoints

### Create User
```http
POST /users
```
**Request Body:**
```json
{
  "wallet_address": "string",
  "referral_address": "string (optional)",
  "twitter_handle": "string (optional)",
  "twitter_pic": "string (optional)"
}
```

### Get User by Wallet Address
```http
GET /users/:walletAddress
```
**Parameters:**
- `walletAddress` (path): User's wallet address

### Get All Users
```http
GET /users
```

### Get User Referrals
```http
POST /users/:walletAddress
```
**Parameters:**
- `walletAddress` (path): Wallet address to get referrals for

### Update User
```http
PUT /users
```
**Request Body:**
```json
{
  "walletAddress": "string",
  "twitter_handle": "string",
  "twitter_pic": "string"
}
```

## Ticket Results Endpoints

### Get All Ticket Results
```http
GET /ticket-results
```

### Update Mega Ticket Result
```http
POST /ticket-results/mega
```
**Request Body:**
```json
{
  "sessionId": "number"
}
```

### Update Million Ticket Result
```http
POST /ticket-results/million
```
**Request Body:**
```json
{
  "sessionId": "number"
}
```

### Get Normal Ticket Results
```http
GET /ticket-results/get-normal-ticket/:sessionId
```
**Parameters:**
- `sessionId` (path): Session ID

## User Entries Endpoints

### Create User Entry
```http
POST /user-entries
```
**Request Body:** Prisma.user_entriesCreateInput

### Get Top Entries
```http
GET /user-entries/top-entries/:sessionId
```
**Parameters:**
- `sessionId` (path): Session ID

### Get All Entries
```http
GET /user-entries
```

### Get Total Entries Statistics
```http
GET /user-entries/total-entries
```

### Get User Entry History
```http
GET /user-entries/history/:walletAddress
```
**Parameters:**
- `walletAddress` (path): Wallet address

## Response Formats

### Success Response
```json
{
  "message": "success",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Notes
- All requests that return data will be in JSON format
- Dates are returned in ISO 8601 format
- Authentication errors will return 401 Unauthorized
- Invalid requests will return 400 Bad Request
- Not found errors will return 404 Not Found