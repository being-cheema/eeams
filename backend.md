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
GET /api/get-report/??start_date=2025-01-01&end_date=2025-03-30&output=pdf
Authorization: Bearer your_access_token
```
Output options - pdf/csv/json

### Teacher Endpoints

#### Get Teacher Dashboard
```http
GET /api/teacher/dashboard/
Authorization: Bearer your_access_token
```

#### Get Batch Students
```http
GET /api/teacher/batch/{batch_id}/students/
Authorization: Bearer your_access_token
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
            "status": "P",  // P: Present, A: Absent, L: Leave
            "remarks": "Optional remarks"
        }
        // ... more students
    ]
}
```

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
    ]
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

## License

This project is licensed under the MIT License - see the LICENSE file for details.