import './build.mjs'
import http from 'node:http'
import {Readable} from 'node:stream'
import worker from './dist/server/index.js'

http.createServer(async(req,res)=>{
  try{
    const init={method:req.method,headers:req.headers}
    if(!['GET','HEAD'].includes(req.method)){
      init.body=Readable.toWeb(req)
      init.duplex='half'
    }
    const response=await worker.fetch(new Request('http://localhost'+req.url,init))
    res.writeHead(response.status,Object.fromEntries(response.headers))
    if(response.body)Readable.fromWeb(response.body).pipe(res)
    else res.end()
  }catch(error){console.error(error.message);res.writeHead(500);res.end()}
}).listen(Number(process.argv[process.argv.indexOf('--port')+1])||Number(process.env.PORT)||3000,'0.0.0.0')
