# How to Access Browse Collections in MongoDB Atlas

## Method 1: Click on Your Cluster Name (Easiest)

1. **On the Project Overview page**, you can see your cluster `schoolweb-cluster` in the "Clusters" card
2. **Click directly on the cluster name** `schoolweb-cluster` (the blue/clickable text)
3. This will take you to the cluster details page
4. Look for **"Collections"** or **"Browse Collections"** button/tab at the top
5. Click it to see your databases and collections

## Method 2: Use the Left Sidebar

1. In the **left sidebar**, look under **"DATABASE"** section
2. Click on **"Clusters"** (not "Collections" - that doesn't exist at top level)
3. This will show all your clusters
4. Click on **"schoolweb-cluster"**
5. You'll see tabs like: Overview, Collections, Metrics, etc.
6. Click the **"Collections"** tab
7. Here you can create database/collection or browse existing ones

## Method 3: Create Database First (If collections don't exist)

If you don't see the "Browse Collections" option, it might be because no database exists yet:

1. Click on your cluster `schoolweb-cluster`
2. Click the **"Collections"** tab
3. You'll see a button **"Create Database"** 
4. Click it
5. Enter:
   - **Database Name:** `schoolweb_db`
   - **Collection Name:** `students`
6. Click **"Create"**
7. Now you can browse collections!

## Quick Visual Guide:

```
Project Overview
    ↓
Click "schoolweb-cluster" (the cluster name)
    ↓
You'll see tabs: [Overview] [Collections] [Metrics] [Performance]
    ↓
Click [Collections] tab
    ↓
You'll see "Create Database" button OR existing databases
    ↓
Create database `schoolweb_db` with collection `students` if needed
```

## What You Should See After Clicking Cluster:

- A page with cluster details
- Multiple tabs including "Collections"
- If no database exists: "Create Database" button
- If database exists: You'll see it listed and can expand to see collections

## Note:

The "Browse Collections" option only appears **after** you:
1. Navigate to your cluster (click on `schoolweb-cluster`)
2. Go to the Collections tab
3. Have at least one database created

If you haven't created the database yet, you'll see a "Create Database" button instead. That's normal!

