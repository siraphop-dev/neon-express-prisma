import express from 'express'
import { neon } from '@neondatabase/serverless'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const sql = neon(process.env.DATABASE_URL)
const adapter = new PrismaNeonHTTP(sql)
const prisma = new PrismaClient({ adapter })

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// CRUD APIs
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
