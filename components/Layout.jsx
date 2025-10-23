import Head from 'next/head'
export default function Layout({ children }){
  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0b2545'}}>
      <Head><title>Metas Posto Laranjeiras</title></Head>
      <main style={{width:'100%', maxWidth:900, padding:24}}>
        <div style={{borderRadius:16, overflow:'hidden', boxShadow:'0 10px 30px rgba(0,0,0,0.2)'}}>
          <div style={{padding:32, textAlign:'center', background:'#07203a', color:'#fff'}}>
            <h1 style={{fontSize:28, margin:0}}><span style={{color:'#f97316'}}>Metas Posto </span><span style={{color:'#0ea5e9'}}>Laranjeiras</span></h1>
            <div style={{marginTop:16}}>{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
