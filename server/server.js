const express = require("express")
const app = express()
const mongoose = require('mongoose')
const router =  require("./routes/router")
const cors = require('cors')
let port = express - process.env.PORT || 3021;

app.use(cors())
app.use(express.json());
app.use('/', router)

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://Samandar0321:Samandar0321@restoranmenu.lyhrknz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
  console.log(`server started at port ${port}`)
})
})

.catch(error => {
console.log('Error connecting to database:', error.message);
});
