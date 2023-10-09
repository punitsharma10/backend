const Todo=require("../models/Todo");

exports.getAllTodos=async (req, res) => {
 try {
  const userId=req.userData.userId;
  const todos=await Todo.find({ user: userId });
  res.json(todos);
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
};



exports.getTodoById=async (req, res) => {
 try {
  const userId=req.userData.userId;
  const todoId=req.params.todoID;
  const todo=await Todo.findOne({ _id: todoId, user: userId });
  if(!todo)
  {
   return res.status(404).json({ message:"todo not found" });
  }
  res.json(todo);
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
};



exports.createTodo=async(req,res)=>{
 try {
  const userId=req.userData.userId;
  const { taskname, status, tag }=req.body;
  const newTodo = new Todo({
   taskname,
   status,
   tag,
   user: userId,
  });

  await newTodo.save();

  res.status(201).json(newTodo);
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
};



exports.deleteTodo = async (req, res) => {
 try {
  const userId = req.userData.userId;
  const todoId = req.params.todoID;
  const todo = await Todo.findOne({ _id: todoId, user: userId });
  if (!todo) {
   return res.status(404).json({ message: "Todo not found" });
  }
  await todo.remove();
  res.json({ message: "Todo deleted" });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
};



exports.updateTodo = async (req, res) => {
 try {
  const userId = req.userData.userId;
  const todoId = req.params.todoID;
  const todo = await Todo.findOne({ _id: todoId, user: userId });
  if (!todo) {
   return res.status(404).json({ message: "Todo not found" });
  }
  const { taskname, status, tag } = req.body;
  if (taskname) {
   todo.taskname = taskname;
  }
  if (status) {
   todo.status = status;
  }
  if (tag) {
   todo.tag = tag;
  }
  await todo.save();
  res.json(todo);
 } catch (error) {
  res.status(500).json({ error: error.message });
 }

};

