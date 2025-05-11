import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

let prisma

async function initPrisma() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL)

  if (process.env.DATABASE_PROVIDER === 'neon') {
    const ws = (await import('ws')).default
    global.WebSocket = ws

    const { PrismaNeon } = await import('@prisma/adapter-neon')
    const { PrismaClient } = await import('@prisma/client')

    const connectionString = `${process.env.DATABASE_URL}`
    const adapter = new PrismaNeon({ connectionString })

    prisma = new PrismaClient({ adapter })
  } else {
    const { PrismaClient } = await import('@prisma/client')
    prisma = new PrismaClient()
  }
}



async function startServer() {
  await initPrisma()

  app.use(cors())
  app.use(express.json())
  app.use(express.static('public'))

  app.get('/api/items', async (req, res) => {
    const items = await prisma.item.findMany()
    res.json(items)
  })

  app.post('/api/items', async (req, res) => {
    const { name, price } = req.body
    const item = await prisma.item.create({ data: { name, price } })
    res.json(item)
  })

  app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params
    const { name, price } = req.body
    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: { name, price }
    })
    res.json(item)
  })

  app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params
    await prisma.item.delete({ where: { id: Number(id) } })
    res.json({ success: true })
  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

startServer()
