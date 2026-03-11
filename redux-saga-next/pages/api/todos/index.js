import connectDB from '../../../lib/db';
import Todo from '../../../lib/models/Todo';

export default async function handler(req, res) {
  try {
    await connectDB();

    const { userId, title } = req.query;

    if (req.method === 'GET') {
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
      return res.status(200).json({ todos });
    }

    if (req.method === 'POST') {
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      const { title, description, dueDate, priority } = req.body;

      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
      }

      const trimmedTitle = title.trim();

      // Check for duplicate
      const existingTodo = await Todo.findOne({ userId, title: trimmedTitle });
      if (existingTodo) {
        return res.status(409).json({ error: 'Todo already exists' });
      }

      const todo = new Todo({
        userId,
        title: trimmedTitle,
        description: description || '',
        dueDate: dueDate || null,
        priority: priority || 'medium',
      });

      await todo.save();
      return res.status(201).json({ todo });
    }

    if (req.method === 'PUT') {
      if (!userId || !title) {
        return res.status(400).json({ error: 'userId and title are required' });
      }

      const decodedTitle = decodeURIComponent(title);
      const { newTitle, description, completed, dueDate, priority } = req.body;

      const updateData = {};
      if (newTitle && newTitle.trim()) updateData.title = newTitle.trim();
      if (description !== undefined) updateData.description = description;
      if (completed !== undefined) updateData.completed = completed;
      if (dueDate !== undefined) updateData.dueDate = dueDate || null;
      if (priority !== undefined) updateData.priority = priority || 'medium';

      console.log('Updating todo:', { decodedTitle, userId, updateData });

      const todo = await Todo.findOneAndUpdate(
        { title: decodedTitle, userId },
        updateData,
        { new: true, runValidators: true }
      );

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      console.log('Todo updated:', todo);
      return res.status(200).json({ todo });
    }

    if (req.method === 'DELETE') {
      if (!userId || !title) {
        return res.status(400).json({ error: 'userId and title are required' });
      }

      const decodedTitle = decodeURIComponent(title);
      console.log('Deleting todo:', { decodedTitle, userId });

      const todo = await Todo.findOneAndDelete({ title: decodedTitle, userId });

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      console.log('Todo deleted:', todo);
      return res.status(200).json({ message: 'Todo deleted successfully', todo });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Todo API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
