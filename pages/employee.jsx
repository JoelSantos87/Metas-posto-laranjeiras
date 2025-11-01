import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Emoji from '../components/Emoji'

export default function Employee(){
  const [todayValue,setTodayValue] = useState(0)
  const [targets,setTargets] = useState([])
  const [records,setRecords] = useState([])
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth()+1).padStart(2,'0')
  const d = today.getDate()
  const month = `${y}-${m}`
  const todayISO = new Date(y,m-1,d).toISOString()

  useEffect(()=>{ load() },[])
  async function load(){
    const t = await (await fetch(`/api/targets?month=${month}`)).json()
    setTargets(t)
    const r = await (await fetch(`/api/records?date=${todayISO}`)).json()
    setRecords(r)
  }

  async function submit(e){
    e.preventDefault()
    await fetch('/api/records',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ date: todayISO, value: Number(todayValue) }) })
    setTodayValue(0)
    load()
  }

  const todayTarget = targets.find(t=> t.day === d)
  const totalToday = records.reduce((s,r)=> s + r.value, 0) + Number(todayValue)
  const met = todayTarget ? totalToday >= todayTarget.value : false

  return (
    <Layout>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        <h2 style={{fontWeight:700}}>Painel Funcionário</h2>
        <div style={{fontSize:20}}>Meta de hoje: R$ {todayTarget ? todayTarget.value.toFixed(2) : '—'}</div>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{fontSize:18}}>Acumulado hoje: R$ {totalToday.toFixed(2)}</div>
          <Emoji happy={met} />
        </div>

        <form onSubmit={submit} style={{marginTop:8}}>
          <input type="number" step="0.01" value={todayValue} onChange={e=>setTodayValue(e.target.value)} style={{padding:8, borderRadius:6}} placeholder="Valor venda" />
          <button style={{marginLeft:8, padding:'8px 12px', borderRadius:6, background:'#0ea5e9', color:'#fff', border:'none'}}>Registrar Venda</button>
        </form>
      </div>
    </Layout>
  )
}
