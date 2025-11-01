import cookie from 'cookie'
export default function handler(req,res){
  res.setHeader('Set-Cookie', cookie.serialize('auth','', { path: '/', maxAge: -1 }))
  res.json({ ok: true })
}
