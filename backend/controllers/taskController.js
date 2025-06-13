import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

// CREATE Task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      status,
      priority,
      dueDate,
      assigneeIds,
    } = req.body;

    const task = new Task({
      title,
      description,
      project: projectId,
      status,
      priority,
      dueDate,
      assignees: assigneeIds,
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// GET ALL Tasks (optionally filtered by projectId)
export const getAllTasks = async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = projectId ? { project: projectId } : {};

    const tasks = await Task.find(filter)
      .populate('project', 'name')
      .populate('assignees', 'name email');

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// GET ONE Task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignees', 'name email');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};

// UPDATE Task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .populate('project', 'name')
      .populate('assignees', 'name email');

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

// DELETE Task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
