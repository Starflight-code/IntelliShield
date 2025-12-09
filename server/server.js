import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'

dotenv.config()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'intellishield';
const COLLECTION_NAME = 'users';
const WHO_AM_I = "6937a91d72fe8fe0a23e66ae";

const client = new MongoClient(MONGO_URL);

// mount static directory to endpoint prefix static. (e.g. file under static "./static/img.png" can be requested with a GET request targeting BASE/static/img.png)
// please place images in /static/images/ and link to this directory
app.use('/static', express.static('static'))

async function connectToMongoDB() {
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const database = await connectToMongoDB();
    const users = await database.collection(COLLECTION_NAME).find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/me', async (req, res) => {
  try {
    const database = await connectToMongoDB();
    const collection = database.collection(COLLECTION_NAME);

    const filter = req.query.email
      ? { email: req.query.email }
      : { _id: new ObjectId(WHO_AM_I) };

    const user = await collection.findOne(filter);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in GET /me:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

    const database = await connectToMongoDB();
    const user = await database.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(WHO_AM_I) });

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

app.get("/updates", async (req, res) => {
  const database = await connectToMongoDB();
  const collection = database.collection("updates");
  const updates = await collection.find({ userId: new ObjectId(WHO_AM_I) });
  res.json(updates);
});

app.post("/updates", async (req, res) => {
  const database = await connectToMongoDB();
  const collection = database.collection("updates");
  await collection.insertOne(JSON.parse(res.body));
  res.json({ "message": "ok" }).status(200);
});

app.get("/settings", async (req, res) => {
  try {
    const database = await connectToMongoDB();
    const collection = database.collection("settings");
    const settings = await collection.findOne({ userId: new ObjectId(WHO_AM_I) });

    return res.send(settings);
  }
  catch (error) {
    console.error('Error fetching settings for current user: ', error)
    res.status(500).json({ error: 'Generic Exception' })
  }
})

app.post("/settings", async (req, res) => {
  try {
    const database = await connectToMongoDB();
    const collection = database.collection("settings");
    await collection.updateOne({ userId: new ObjectId(WHO_AM_I) }, req.body);

    return res.statusCode(200).json({ message: "ok" });
  }
  catch (error) {
    console.error('Error updating settings for current user: ', error)
    res.status(500).json({ error: 'Generic Exception' })
  }
})

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
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

