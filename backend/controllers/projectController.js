import Project from '../models/Project.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (admin only)
export const createProject = asyncHandler(async (req, res) => {
  const { name, description, status, startDate, dueDate, teamMembersIds } = req.body;

  if (!name || !description || !startDate || !dueDate) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const project = await Project.create({
    name,
    description,
    status,
    startDate,
    dueDate,
    created_by: req.user._id,
    teamMembers: teamMembersIds,
  });

  res.status(201).json(project);
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private (admin, manager, member)
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate('created_by', 'name email') .populate('teamMembers', 'name email');
  res.json(projects);
});

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('created_by', 'name email',) .populate('teamMembers', 'name email')  ;

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (admin only)
export const updateProject = asyncHandler(async (req, res) => {
  const { name, description, status, startDate, dueDate, teamMembersIds } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  project.name = name || project.name;
  project.description = description || project.description;
  project.status = status || project.status;
  project.startDate = startDate || project.startDate;
  project.dueDate = dueDate || project.dueDate;
  project.teamMembers = teamMembersIds || project.teamMembers;

  const updated = await project.save();
  res.json(updated);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (admin only)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  await project.deleteOne({ _id: req.params.id });
  res.json({ message: "Project removed" });
});
