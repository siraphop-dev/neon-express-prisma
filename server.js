import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

let prisma

async function initPrisma() {
  if (process.env.DATABASE_PROVIDER === 'neon') {
    const { PrismaNeon } = await import('@prisma/adapter-neon')
    const { Pool } = await import('@neondatabase/serverless')
    const { PrismaClient } = await import('@prisma/client')

    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaNeon(pool)

    prisma = new PrismaClient({ adapter })
  } else {
    const { PrismaClient } = await import('@prisma/client')
    prisma = new PrismaClient()
  }
}

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
