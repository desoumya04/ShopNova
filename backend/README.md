# Shopping Backend API

## POST /seller/register

### Description
Creates a new seller account with authentication token.

---

## Input

### Request Body
```json
{
  "name": "John Doe",
  "mobile": "+1234567890",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "gstIn": "29ABCDE1234F1Z5",
  "role": "SELLER"
}
```

### Required Fields
| Field | Type | Description |
|-------|------|-------------|
| name | string | Seller's full name |
| mobile | string | Contact number |
| email | string | Unique email address |
| password | string | Account password (will be hashed) |
| gstIn | string | GST Identification Number |

### Optional Fields
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| role | string | SELLER | User role |

---

## Outcome

### Success Response (201 Created)
```json
{
  "statusCode": 201,
  "data": {
    "newSeller": {
      "id": "clx1234567890",
      "name": "John Doe",
      "mobile": "+1234567890",
      "email": "john.doe@example.com",
      "gstIn": "29ABCDE1234F1Z5",
      "role": "SELLER",
      "createdAt": "2026-02-09T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Seller created successfully"
}
```

**Additional:** JWT token is set as an HTTP-only cookie named `token`

### Error Responses

**400 Bad Request** - Missing required fields
```json
{
  "statusCode": 400,
  "message": "Missing required fields: name, mobile, email, password, gstIn"
}
```

**400 Bad Request** - Seller already exists
```json
{
  "statusCode": 400,
  "message": "Seller with this email already exists"
}
```

---

## POST /seller/add_bank_details

### Description
Adds bank details for an authenticated seller.

---

## Input

### Request Body
```json
{
  "bankName": "State Bank of India",
  "accountHolderName": "John Doe",
  "accountNumber": "123456789012",
  "ifcCode": "SBIN0001234"
}
```

### Required Fields
| Field | Type | Description |
|-------|------|-------------|
| bankName | string | Name of the bank |
| accountHolderName | string | Name of the account holder |
| accountNumber | string | Bank account number |
| ifcCode | string | IFSC code of the bank |

### Headers
- `Cookie`: `token=<JWT_TOKEN>` (Authentication token)

---

## Outcome

### Success Response (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx9876543210",
    "bankName": "State Bank of India",
    "accountHolderName": "John Doe",
    "accountNumber": "123456789012",
    "ifcCode": "SBIN0001234",
    "sellerId": "clx1234567890"
  },
  "message": "Bank details added successfully"
}
```

### Error Responses

**400 Bad Request** - Missing required fields
```json
{
  "statusCode": 400,
  "message": "Missing required fields: bankName, accountHolderName, accountNumber, ifcCode"
}
```

**400 Bad Request** - Bank details already exist
```json
{
  "statusCode": 400,
  "message": "Bank details with this account number already exists"
}
```

**401 Unauthorized** - Invalid or missing token
```json
{
  "statusCode": 401,
  "message": "Unauthorized: Invalid token"
}
```

---

## Example Request

```bash
curl -X POST http://localhost:3000/seller/add_bank_details \
  -H "Content-Type: application/json" \
  -H "Cookie: token=<JWT_TOKEN>" \
  -d '{
    "bankName": "State Bank of India",
    "accountHolderName": "John Doe",
    "accountNumber": "123456789012",
    "ifcCode": "SBIN0001234"
  }'
```

---

## POST /seller/add_business_details

### Description
Adds business details for an authenticated seller.

---

## Input

### Request Body
```json
{
  "businessName": "JD Enterprises",
  "businessEmail": "contact@jdenterprises.com",
  "businessPhone": "+19876543210",
  "locality": "Main Street",
  "pinCode": "123456",
  "state": "California",
  "address": "123, Main Street, Near City Hall"
}
```

### Required Fields
| Field | Type | Description |
|-------|------|-------------|
| businessName | string | Name of the business |
| businessEmail | string | Official email of the business |
| businessPhone | string | Contact number for the business |
| locality | string | Locality of the business |
| pinCode | string | Pin code of the business address |
| state | string | State where the business is located |
| address | string | Full address of the business |

### Headers
- `Cookie`: `token=<JWT_TOKEN>` (Authentication token)

---

## Outcome

### Success Response (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx5432109876",
    "name": "JD Enterprises",
    "email": "contact@jdenterprises.com",
    "phone": "+19876543210",
    "locality": "Main Street",
    "pinCode": "123456",
    "state": "California",
    "address": "123, Main Street, Near City Hall",
    "sellerId": "clx1234567890"
  },
  "message": "Business details added successfully"
}
```

### Error Responses

**400 Bad Request** - Missing required fields
```json
{
  "statusCode": 400,
  "message": "Missing required fields: businessName, businessEmail, businessPhone, locality, pinCode, state, address"
}
```

**401 Unauthorized** - Invalid or missing token
```json
{
  "statusCode": 401,
  "message": "Unauthorized: Invalid token"
}
```

---

## Example Request

```bash
curl -X POST http://localhost:3000/seller/add_business_details \
  -H "Content-Type: application/json" \
  -H "Cookie: token=<JWT_TOKEN>" \
  -d '{
    "businessName": "JD Enterprises",
    "businessEmail": "contact@jdenterprises.com",
    "businessPhone": "+19876543210",
    "locality": "Main Street",
    "pinCode": "123456",
    "state": "California",
    "address": "123, Main Street, Near City Hall"
  }'
```
