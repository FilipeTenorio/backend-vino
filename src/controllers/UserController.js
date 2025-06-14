import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' })
    }

    console.log('Login request:', { email, senha })

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Email não encontrado' })
    }

    // Senha simples (sem criptografia)
    if (senha.trim() !== user.senha) {
      return res.status(401).json({ message: 'Senha incorreta' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    )

    const { senha: _, ...userData } = user.toObject()
    res.json({ user: userData, token })
  } catch (error) {
    console.error('Erro no loginUser:', error)
    res.status(500).json({ message: 'Erro ao fazer login' })
  }
}

export const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Dados incompletos' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado' })
    }

    const newUser = new User({
      nome,
      email,
      senha: senha.trim() // salvando em texto puro
    })

    await newUser.save()

    const userResponse = newUser.toObject()
    delete userResponse.senha

    res.status(201).json({ message: 'Usuário criado com sucesso', user: userResponse })
  } catch (error) {
    console.error('Erro no registerUser:', error)
    res.status(500).json({ message: 'Erro interno no servidor' })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar dados' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    res.json({ message: 'Conta excluída com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar conta' })
  }
}
