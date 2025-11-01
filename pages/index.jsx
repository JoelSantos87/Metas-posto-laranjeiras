import { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/auth/login',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    if(res.ok){
      const user = await res.json()
      if(user.role === 'ADMIN') Router.push('/admin')
      else Router.push('/employee')
    }else{
      alert('Credenciais inválidas')
    }
  }

  return (
    <Layout>
      <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:12, alignItems:'center', justifyContent:'center', paddingTop:12}}>
        <input style={{width:'320px', padding:10, borderRadius:8}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={{width:'320px', padding:10, borderRadius:8}} placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button style={{padding:'10px 20px', borderRadius:8, background:'#f97316', color:'#fff', border:'none'}}>Entrar</button>
      </form>
    </Layout>
  )
}
