import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import dotenv from "dotenv";
dotenv.config();

const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

store.on("error", (error) => {
  console.log("Error in session store", error);
});

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
});

export default sessionConfig;
