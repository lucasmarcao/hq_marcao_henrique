if (process.env.NODE_ENV == "production") {
  module.exports = { MongoURI: "mongodb://localhost/blogmarcao" }
} else {
  module.exports = { MongoURI: 
    "mongodb+srv://marcaozitos:enquebravel1@cluster0.zub3f.mongodb.net/test" }
}