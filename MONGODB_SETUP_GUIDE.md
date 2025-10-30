# MongoDB Setup Guide for School Application

## Step 1: MongoDB Atlas Setup (Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Create an account (you can use Google account)

### 1.2 Create a Cluster
1. After login, click "Build a Database"
2. Choose **FREE tier (M0 Sandbox)**
3. Select your preferred cloud provider and region (choose closest to you)
4. Cluster name: `schoolweb-cluster` (or any name)
5. Click "Create"

### 1.3 Create Database User
1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `schoolweb-admin` (or your choice)
5. Password: Create a strong password (save it securely!)
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### 1.4 Set Up Network Access
1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. For development:
   - Click "Allow Access from Anywhere" (0.0.0.0/0) - **ONLY for development**
   - For production, add only your server IP
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to **Database** (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Driver: **Java** and Version: **4.1 or later**
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@schoolweb-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` with your database user (e.g., `schoolweb-admin`)
7. Replace `<password>` with your database password
8. Save this connection string - you'll need it!

### 1.6 Create Database and Collection
1. In MongoDB Atlas, click "Browse Collections"
2. Click "Create Database"
3. Database Name: `schoolweb_db`
4. Collection Name: `students`
5. Click "Create"

---

## Step 2: Local MongoDB Compass Setup

### 2.1 Download MongoDB Compass
1. Go to https://www.mongodb.com/products/compass
2. Download MongoDB Compass for Windows
3. Install it

### 2.2 Connect to MongoDB Atlas from Compass
1. Open MongoDB Compass
2. Paste your Atlas connection string (from Step 1.5)
3. Replace `<username>` and `<password>` with actual values
4. Click "Connect"
5. You should see your `schoolweb_db` database

### 2.3 Connect to Local MongoDB (Optional)
If you have MongoDB installed locally:
1. Default connection string: `mongodb://localhost:27017`
2. Click "New Connection" in Compass
3. Enter: `mongodb://localhost:27017`
4. Click "Connect"

### 2.4 Verify Connection
- You should see your databases listed
- Navigate to `schoolweb_db` > `students` collection

---

## Step 3: Connection String Configuration

### For Development (Spring Boot Application)
You'll use the Atlas connection string in `application.properties`:
```
spring.data.mongodb.uri=mongodb+srv://schoolweb-admin:YOUR_PASSWORD@schoolweb-cluster.xxxxx.mongodb.net/schoolweb_db?retryWrites=true&w=majority
```

### For Local Testing (Optional)
If you want to use local MongoDB:
```
spring.data.mongodb.uri=mongodb://localhost:27017/schoolweb_db
```

---

## Important Notes:
- **Keep your database password secure** - never commit it to Git
- **Atlas connection string** will be used in Spring Boot `application.properties`
- **Database name**: `schoolweb_db`
- **Collection name**: `students` (will be created automatically)

---

## Next Steps:
After completing these steps, tell me and I'll:
1. Configure Spring Boot with MongoDB dependencies
2. Set up the connection in `application.properties`
3. Create the Student entity and repository
4. Build the booking form
5. Implement admin panel and email service

