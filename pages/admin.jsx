import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

export default function Admin(){
  const [month,setMonth] = useState(()=>{ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}` })
  const [targets,setTargets] = useState([])
  const [day,setDay] = useState(1)
  const [value,setValue] = useState(0)

  async function load(){
    const res = await fetch(`/api/targets?month=${month}`)
    const data = await res.json()
    setTargets(data)
  }

  async function create(e){
    e.preventDefault()
    await fetch('/api/targets',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ yearMonth: month, day, value }) })
    load()
  }

  useEffect(()=>{ load() },[month])

  return (
    <Layout>
      <div style={{textAlign:'left'}}>
        <h2 style={{fontWeight:700}}>Painel Admin</h2>
        <form onSubmit={create} style={{marginTop:12, display:'grid', gap:8}}>
          <div><label>Mês (YYYY-MM)</label><input value={month} onChange={e=>setMonth(e.target.value)} style={{marginLeft:8}} /></div>
          <div><label>Dia</label><input type="number" value={day} onChange={e=>setDay(Number(e.target.value))} style={{marginLeft:8, width:80}} /></div>
          <div><label>Valor alvo (R$)</label><input type="number" value={value} onChange={e=>setValue(Number(e.target.value))} style={{marginLeft:8, width:160}} /></div>
          <button style={{padding:8, background:'#f97316', color:'#fff', border:'none', borderRadius:6}}>Criar Meta</button>
        </form>

        <div style={{marginTop:16}}>
          <h3 style={{fontWeight:700}}>Metas do mês</h3>
          <ul>{targets.map(t=> <li key={t.id}>Dia {t.day} — R$ {t.value.toFixed(2)}</li>)}</ul>
        </div>
      </div>
    </Layout>
  )
}
