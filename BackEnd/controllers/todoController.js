import Todo from "../models/Todo.js";

// helper to ensure ownership
const ensureOwner = (todo, userId) => {
  if (!todo) return false;
  if (!todo.user) return false;
  return todo.user.toString() === userId;
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const { title, description, priority, status } = req.body;
    const todo = new Todo({
      title,
      description,
      priority,
      status,
      user: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all todos
const getTodos = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: "i" };

    // restrict todos to the authenticated user
    if (req.userId) filter.user = req.userId;
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single todo
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (!ensureOwner(todo, req.userId))
      return res.status(403).json({ message: "Forbidden" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const update = req.body;
    // keep completed boolean in sync with status if provided
    if (update.status) {
      update.completed = update.status === "completed";
    }

    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (!ensureOwner(todo, req.userId))
      return res.status(403).json({ message: "Forbidden" });

    Object.assign(todo, update);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (!ensureOwner(todo, req.userId))
      return res.status(403).json({ message: "Forbidden" });

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };

// Stats: counts and percentage
const getStats = async (req, res) => {
  try {
    const filterBase = {};
    if (req.userId) filterBase.user = req.userId;

    const total = await Todo.countDocuments(filterBase);
    const pending = await Todo.countDocuments({
      ...filterBase,
      status: "pending",
    });
    const underprocess = await Todo.countDocuments({
      ...filterBase,
      status: "underprocess",
    });
    const completed = await Todo.countDocuments({
      ...filterBase,
      status: "completed",
    });

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.json({ total, pending, underprocess, completed, percentage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getStats };
