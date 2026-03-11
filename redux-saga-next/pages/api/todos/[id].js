import connectDB from '../../../lib/db';
import Todo from '../../../lib/models/Todo';

export default async function handler(req, res) {
  try {
    await connectDB();

    const { title, userId } = req.query;

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' });
    }

    const decodedTitle = decodeURIComponent(title);

    if (req.method === 'PUT') {
      const { newTitle, description } = req.body;

      const updateData = {};
      if (newTitle) updateData.title = newTitle.trim();
      if (description !== undefined) updateData.description = description;

      const todo = await Todo.findOneAndUpdate(
        { title: decodedTitle, userId },
        updateData,
        { new: true, runValidators: true }
      );

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      return res.status(200).json({ todo });
    } 
    
    if (req.method === 'DELETE') {
      const todo = await Todo.findOneAndDelete({ title: decodedTitle, userId });

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      return res.status(200).json({ message: 'Todo deleted successfully', todo });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Todo API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
