// mongo.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
console.log(uri);
let client;
let db;

async function connectDB() {
  if (db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("MongoDB connected");

    db = client.db(process.env.DB_NAME);
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

function getDB() {
  if (!db) throw new Error("DB not initialized");
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

module.exports = { connectDB, getDB, closeDB };
