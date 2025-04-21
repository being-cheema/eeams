# Attendance System

A Django-based attendance management system for educational institutions.

## Prerequisites

- Python 3.x
- pip (Python package installer)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Siddid-Soni/attendance_system.git
cd <project folder>
```

### 2. Set Up Virtual Environment

```bash
# Create virtual environment
python3 -m venv .env

# Activate virtual environment
# On Linux/macOS:
source .env/bin/activate
# On Windows:
# .env\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Database Setup

```bash
# Apply database migrations
python manage.py migrate
```

### 5. Run Development Server

```bash
python manage.py runserver
```

The application will be available at `http://127.0.0.1:8000/`

## API Endpoints

### Authentication

#### Get Token
```http
POST /api/token/
Content-Type: application/json

{
    "email": "your_username",
    "password": "your_password"
}
```

Response:
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Refresh Token
```http
POST /api/token/refresh/
Content-Type: application/json

{
    "refresh": "your_refresh_token"
}
```

Response:
```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### User Management

#### Create User
```http
POST /api/user/create/
Content-Type: application/json
Authorization: Bearer your_access_token

{
    "email": "user@example.com",
    "password": "userpassword",
    "first_name": "name",
    "last_name": "name"  
}
```

Response:
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get User Info
```http
GET /api/user/info/
Authorization: Bearer your_access_token
```

Response:
```json
{
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "role": "STU"  // STU: Student, TEA: Teacher
}
```

### Attendance Management

#### Get Attendance Report
```http
GET /api/get-report/?start_date=2025-01-01&end_date=2025-03-30&output=pdf
Authorization: Bearer your_access_token
```
Output options - pdf/csv/json

Response (JSON format):
```json
[
    {
        "id": 1,
        "date": "2025-01-15",
        "student": 3,
        "batch": 1,
        "status": "P",
        "remarks": "On time",
        "marked_by": 2,
        "created_at": "2025-01-15T10:30:00Z"
    }
]
```

### Teacher Endpoints

#### Get Teacher Dashboard
```http
GET /api/teacher/dashboard/
Authorization: Bearer your_access_token
```

Response:
```json
{
    "batches": [
        {
            "id": 1,
            "name": "Morning Batch",
            "student_count": 25,
            "students": [
                {
                    "id": 3,
                    "name": "John Doe",
                    "attendance_percentage": 85.5,
                    "present_classes": 17,
                    "total_classes": 20
                }
            ],
            "fee_projection": 25000
        }
    ]
}
```

#### Get Batch Students
```http
GET /api/teacher/batch/1/students/
Authorization: Bearer your_access_token
```

Response:
```json
{
    "batch_id": 1,
    "batch_name": "Morning Batch",
    "students": [
        {
            "id": 3,
            "name": "John Doe",
            "email": "john@example.com"
        }
    ]
}
```

#### Mark Attendance
```http
POST /api/teacher/attendance/mark/
Content-Type: application/json
Authorization: Bearer your_access_token

{
    "batch_id": 1,
    "date": "2025-03-22",
    "attendance_data": [
        {
            "student_id": 1,
            "status": "P",  // P: Present, A: Absent, L: Late
            "remarks": "Optional remarks"
        }
    ],
    "class_remark": "somehrieh"
}
```

Response:
```json
{
    "message": "Attendance marked successfully",
    "records": [
        {
            "student_id": 1,
            "status": "P",
            "created": true
        }
    ]
}
```

#### Get Attendance Reports (Daily)
```http
GET /api/teacher/attendance/reports/?view=daily&month=2025-03
Authorization: Bearer your_access_token
```

Response:
```json
{
    "records": [
        {
            "name": "John Doe",
            "batch": "Morning Batch",
            "date": "2025-03-15",
            "time": "10:00 AM",
            "status": "Present",
            "status_code": "P"
        },
        {
            "name": "Jane Smith",
            "batch": "Evening Batch",
            "date": "2025-03-15",
            "time": "4:00 PM",
            "status": "Absent",
            "status_code": "A"
        }
    ]
}
```

#### Get Attendance Reports (Monthly)
```http
GET /api/teacher/attendance/reports/?view=monthly&month=2025-03
Authorization: Bearer your_access_token
```

Response:
```json
{
    "summary": [
        {
            "name": "John Doe",
            "batch": "Morning Batch",
            "total_classes": 20,
            "classes_attended": 18,
            "attendance_percentage": 90.0
        },
        {
            "name": "Jane Smith",
            "batch": "Evening Batch",
            "total_classes": 15,
            "classes_attended": 12,
            "attendance_percentage": 80.0
        }
    ]
}
```

#### Export Attendance Reports
```http
GET /api/teacher/attendance/export/?view=monthly&format=pdf&month=2025-03
Authorization: Bearer your_access_token
```

Response: PDF or CSV file download

### Student Endpoints

#### Get Student Dashboard
```http
GET /api/student/dashboard/
Authorization: Bearer your_access_token
```

Response:
```json
{
    "student_name": "John Doe",
    "email": "john@example.com",
    "attendance_rate": 85.5,
    "total_classes": 20,
    "present_classes": 17,
    "batches": [
        {
            "id": 1,
            "name": "Batch A"
        }
    ],
    "pending_payments_count": 1,
    "approved_payments_count": 2,
    "rejected_payments_count": 0,
    "total_paid": 2000.00,
    "active_payment_windows": [
        {
            "window_id": 3,
            "batch_name": "Batch A",
            "start_date": "2025-04-01T00:00:00Z",
            "end_date": "2025-04-30T23:59:59Z",
            "amount": 1000.00
        }
    ]
}
```

#### Get Payment History
```http
GET /api/student/payment/history/
Authorization: Bearer your_access_token
```

Response:
```json
{
    "student_name": "John Doe",
    "email": "john@example.com",
    "payment_history": [
        {
            "payment_id": 5,
            "batch_name": "Batch A",
            "amount": 1000.00,
            "status": "Approved",
            "date": "2025-03-15 14:30:22",
            "window_period": "2025-03-01 to 2025-03-31"
        },
        {
            "payment_id": 3,
            "batch_name": "Batch A",
            "amount": 1000.00,
            "status": "Approved",
            "date": "2025-02-10 09:15:43",
            "window_period": "2025-02-01 to 2025-02-28"
        }
    ],
    "total_payments": 2,
    "total_paid": 2000.00
}
```

### Payment Management

#### Get Active Payment Windows
```http
GET /api/student/payment/
Authorization: Bearer your_access_token
```

Response:
```json
{
    "payment_windows": [
        {
            "window_id": 1,
            "batch_name": "Batch A",
            "start_date": "2025-03-01T00:00:00Z",
            "end_date": "2025-03-31T23:59:59Z",
            "amount": 1000.00,
            "payment_status": "Not Paid",
            "payment_id": null
        }
    ],
    "total_pending_fee": 900
}
```

#### Submit Payment
```http
POST /api/student/payment/
Content-Type: multipart/form-data
Authorization: Bearer your_access_token

{
    "window_id": 1,
    "image_proof": <file>
}
```

Response:
```json
{
    "message": "Payment submitted successfully",
    "payment_id": 7,
    "batch": "Batch A",
    "amount": 1000.00,
    "status": "Pending"
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.