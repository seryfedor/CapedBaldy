var mongoose = require("mongoose");
require("dotenv").config();

mongoose.connection.on("connected", () => {
  console.log("db is connected");
});
const MONGO = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/chinaTown";

mongoose.connection.on("error", (err) => {
  console.log(`can not connect to db ${err}`);
  process.exit(1);
});

exports.connect = async (mongoURL = MONGO) => {
  mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
