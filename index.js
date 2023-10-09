const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const authController = require("./controllers/authController");

const authMiddleware = require("./utils/auth");

const todoController = require("./controllers/todoController");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());



mongoose
 .connect(
  `mongodb+srv://ppcommercial31:punit12@cluster0.ogkgxal.mongodb.net/mernstack?retryWrites=true&w=majority&appName=AtlasApp`,
  { useNewUrlParser: true, useUnifiedTopology: true }
 )
 .then(() => {
  console.log("connected to database");
 })
 .catch((error) => {
  console.error("error connecting to database:", error);
 });



app.post("/signup", authController.signup);

app.post("/login", authController.login);

app.post("/todos/create", authMiddleware, todoController.createTodo);

app.get("/todos", authMiddleware, todoController.getAllTodos);

app.get("/todos/:todoID", authMiddleware, todoController.getTodoById);

app.delete("/todos/delete/:todoID", authMiddleware, todoController.deleteTodo);

app.put("/todos/update/:todoID", authMiddleware, todoController.updateTodo);



app.listen(PORT);

