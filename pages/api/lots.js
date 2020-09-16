// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const lots = [
  { enterprise: 1, court: 'A', lot: 100, price: 10000 },
  { enterprise: 1, court: 'A', lot: 101, price: 10000 }
]
export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      res.json({ status: 200, name: 'success', message: lots})
    } else if (req.method === 'POST') {
      const errors = bodyValidation(req.body)
      if (errors.length > 0) {
        return res.json({ status: 422, name: 'VALIDATION_ERROR', message: errors})
      }
      lots.push(req.body)
      res.json({ status: 200, name: 'success', message: 'Lote adicionado com sucesso'})
    } else {
      res.json({ status: 404, name: 'NOT_FOUND', message: `${req.method} não está disponível`})
    }
  } catch (err) {
    res.json({ status: 500, name: err.name, message: err.message })
  }
}

const bodyValidation = (body) => {
  const errors = []
  if (!body.enterprise) {
    errors.push('enterprise is required')
  }
  if (!body.court) {
    errors.push('court is required')
  }
  if (!body.lot) {
    errors.push('lot is required')
  }
  if (!body.price) {
    errors.push('price is required')
  }
  return errors
}