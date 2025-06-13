import User from '../models/User.js'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role avatar_url')
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body
    const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
