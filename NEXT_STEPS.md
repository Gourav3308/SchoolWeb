# Next Steps - Testing Your Application

## ✅ Step 1: Verify Database & Collection in MongoDB Atlas

1. **Go to MongoDB Atlas Dashboard**
   - Click on "Browse Collections" in the left sidebar
   - If you see `schoolweb_db` database with `students` collection, you're done!
   - If not, click "Create Database":
     - Database Name: `schoolweb_db`
     - Collection Name: `students`
     - Click "Create"

## 🚀 Step 2: Start the Backend Server

Open a **new terminal/command prompt** and run:

```bash
cd C:\Users\goura\OneDrive\Desktop\schoolweb\backend
mvn spring-boot:run
```

**Wait for:**
- "Started SchoolwebBackendApplication" message
- Server running on port 8080
- No MongoDB connection errors

**If you see connection errors:**
- Check if your IP address is whitelisted in MongoDB Atlas
- Verify the password in `application.properties` is correct
- Make sure there are no special characters in the password that need URL encoding

## 🌐 Step 3: Start the Frontend Server

Open **another terminal/command prompt** and run:

```bash
cd C:\Users\goura\OneDrive\Desktop\schoolweb\frontend
npm start
```

**Wait for:**
- Angular dev server to start
- Browser opens automatically at `http://localhost:4200`
- No compilation errors

## ✅ Step 4: Test the Application

### Test 1: Submit Admission Form
1. Go to `http://localhost:4200/admissions` (or click "Apply Now" button)
2. Fill in all the required fields:
   - Personal info (First Name, Last Name, DOB, Gender, Aadhar)
   - Admission details (Class, Previous School)
   - Parent info (Father's Name, Mother's Name, Occupations)
   - Contact info (Address, City, State, Pin, Phone, Email)
3. Click "Submit Application"
4. You should see: **"Application submitted successfully. Please wait for approval."**

### Test 2: Check MongoDB Atlas
1. Go back to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Navigate to `schoolweb_db` → `students`
4. You should see your submitted student record!

### Test 3: Admin Login
1. Click "Admin Login" button in the header
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You should see the admin panel with all submitted applications

### Test 4: Approve a Student
1. In admin panel, find a student with "PENDING" status
2. Click "Approve" button
3. Student status changes to "APPROVED"
4. Check the student's email - they should receive a confirmation email!

## 🎉 Success!

If all tests pass, your application is working perfectly!

---

## ⚠️ Troubleshooting

### Backend won't start:
- Check MongoDB connection string format
- Ensure password is correct
- Verify IP is whitelisted in Atlas

### Frontend won't start:
- Run `npm install` first
- Check if port 4200 is already in use

### Can't see data in Atlas:
- Wait a few seconds after submission
- Refresh the collections view
- Check backend console for errors

### Email not sending:
- Verify Gmail app password is correct
- Check backend console for email errors
- Make sure SMTP settings are correct

