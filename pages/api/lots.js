// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const lots = [
  { enterprise: 1, court: 'A', lot: '100', price: 10000 },
  { enterprise: 1, court: 'A', lot: '101', price: 10000 }
]
export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      res.json({ status: 200, name: 'success', message: lots})
    } else if (req.method === 'POST') {
      const errors = bodyValidation(req.body)
      if (errors) {
        return res.json({ status: 422, name: 'VALIDATION_ERROR', message: errors})
      }
      const lot = {
        enterprise: Number(req.body.enterprise),
        court: String(req.body.court),
        lot: String(req.body.lot),
        price: Number(req.body.price)
      }
      lots.push(lot)
      if (lots.length > 5) {
        lots.splice(0, 5)
        await fetch('https://hooks.zapier.com/hooks/catch/8499808/owhfanc/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ status: 'Os primeiros 5 lotes foram removidos' })
        })
      }
      res.json({ status: 200, name: 'success', message: 'Lote adicionado com sucesso'})
    } else {
      res.json({ status: 404, name: 'NOT_FOUND', message: `${req.method} não está disponível`})
    }
  } catch (err) {
    res.json({ status: 500, name: err.name, message: err.message })
  }
}

const bodyValidation = (body) => {
  let errors = ''
  if (!body.enterprise || !body.court || !body.lot || !body.price) {
    errors += 'enterprise/court/lot/price are required'
  }
  return errors
}