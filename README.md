

## 📚 School Management API (Node.js + Express + MySQL)

### ✅ Objective

Build a RESTful API using **Node.js**, **Express.js**, and **MySQL** that allows users to:

* **Add a new school** to the database
* **List schools** based on proximity to a user's location (latitude & longitude)

---

### 🗂️ Database Setup

Create a MySQL table named `schools` with the following schema:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

---

### 🚀 API Endpoints

#### 🔸 1. Add School

* **Endpoint:** `/addSchool`
* **Method:** `POST`
* **Payload Example:**

```json
{
  "name": "Greenwood High",
  "address": "12 Oak Street",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

* **Functionality:**

  * Validates input fields (non-empty, correct types)
  * Inserts the school into the `schools` table

---

#### 🔸 2. List Schools by Proximity

* **Endpoint:** `/listSchools`
* **Method:** `GET`
* **Query Parameters:**

  * `latitude`: User's current latitude
  * `longitude`: User's current longitude
* **Example:**

  ```
  GET /listSchools?latitude=40.7128&longitude=-74.0060
  ```
* **Functionality:**

  * Retrieves all schools from the database
  * Calculates the distance between user's location and each school
  * Sorts and returns the schools by proximity



