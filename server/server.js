import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'intellishield';
// const COLLECTION_NAME = 'users';
const WHO_AM_I = "6937a91d72fe8fe0a23e66ae" // object ID of current user "Alice West"

const client = new MongoClient(MONGO_URL);

let db;
let usersCollection;

// mount static directory to endpoint prefix static. (e.g. file under static "./static/img.png" can be requested with a GET request targeting BASE/static/img.png)
// please place images in /static/images/ and link to this directory
app.use('/static', express.static('static'))

async function connectToMongoDB() {
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

// generic functions should not perform route specific behaviors
// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//     db = client.db(DB_NAME);
//     usersCollection = db.collection(COLLECTION_NAME);
//     
//     const userCount = await usersCollection.countDocuments();
//     if (userCount === 0) {
//       console.log('Seeding initial user data...');
//       const initialData = getUsersDataFromFile();
//       if (initialData.length > 0) {
//         await usersCollection.insertMany(initialData);
//         console.log(`Inserted ${initialData.length} users into MongoDB`);
//       }
//     }
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }

// this has been entered to the DB manually and this is no longer required. you can delete this after reading this comment.
// function getUsersDataFromFile() {
//   try {
//     const dataPath = path.join(__dirname, '..', 'web', 'data.json');
//     const data = fs.readFileSync(dataPath, 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading data.json:', error);
//     return [];
//   }
// }

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// please fix your route
app.get('/users', async (req, res) => {
  try {
    if (!usersCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }

    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/settings", async (req, res) => {
  try {
    let db = await connectToMongoDB();
    let collection = db.collection("settings")
    let settings = await collection.findOne({ _id: WHO_AM_I });

    return res.send(settings);
  }
  catch (error) {
    console.error('Error fetching settings for current user: ', error)
    res.status(500).json({ error: 'Generic Exception' })
  }
})

app.post("/settings", async (req, res) => {
  try {
    let db = await connectToMongoDB();
    let collection = db.collection("settings")
    await collection.updateOne({ _id: WHO_AM_I }, req.body);

    return res.statusCode(200).json({ message: "ok" });
  }
  catch (error) {
    console.error('Error updating settings for current user: ', error)
    res.status(500).json({ error: 'Generic Exception' })
  }
})

// this route should grab/set the user state for the current user (normally 
// this would reference the session key to find this but you can just use 
// the hardcoded "current" user WHO_AM_I)
app.post('/me', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const testCredentials = {
      'test@intellishield.com': 'password123'
    };

    if (testCredentials[email] !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!usersCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }

    const user = await usersCollection.findOne({});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      email: email,
      ...user
    });
  } catch (error) {
    console.error('Error in POST /me:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`GET /users endpoint available at http://localhost:${PORT}/users`); // why
      console.log(`MongoDB database: ${DB_NAME}, collection: ${COLLECTION_NAME}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await client.close();
  process.exit(0);
});

