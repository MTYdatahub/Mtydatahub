const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;
const BASE = "https://api.vtugate.com";
const KEY = process.env.VTUGATE_API_KEY;

function keyCheck(req,res,next){
  if(!KEY || KEY === "PASTE_TEST_API_KEY_HERE")
    return res.status(500).json({status:false,message:"VTUGATE_API_KEY is not configured."});
  next();
}

async function callVTU(path, body){
  const r = await fetch(BASE + path, {
    method:"POST",
    headers:{
      "Authorization":"Bearer " + KEY,
      "Content-Type":"application/x-www-form-urlencoded"
    },
    body:new URLSearchParams(body || {})
  });
  const text = await r.text();
  let data;
  try { data=JSON.parse(text); }
  catch { data={status:false,message:text || "Invalid VTUGATE response"}; }
  return {code:r.status,data};
}

app.get("/health",(req,res)=>res.json({
  status:true, app:"MTY DATA HUB", backend:"online", mode:"VTUGATE Sandbox/Test"
}));

app.get("/api/vtugate/account",keyCheck,async(req,res)=>{
  try {
    const x=await callVTU("/api/v1/accountdetails",{});
    res.status(x.code).json(x.data);
  } catch(e) {
    res.status(502).json({status:false,message:"Could not reach VTUGATE",error:e.message});
  }
});

app.post("/api/data/plans",keyCheck,async(req,res)=>{
  try {
    const x=await callVTU("/api/v1/fetchdataplans",req.body);
    res.status(x.code).json(x.data);
  } catch(e) {
    res.status(502).json({status:false,message:"Could not fetch data plans",error:e.message});
  }
});

app.post("/api/data/buy",keyCheck,async(req,res)=>{
  try {
    const x=await callVTU("/api/v1/buydata",req.body);
    res.status(x.code).json(x.data);
  } catch(e) {
    res.status(502).json({status:false,message:"Could not submit data purchase",error:e.message});
  }
});

app.post("/api/transaction/status",keyCheck,async(req,res)=>{
  try {
    const x=await callVTU("/api/v1/transactionstatus",req.body);
    res.status(x.code).json(x.data);
  } catch(e) {
    res.status(502).json({status:false,message:"Could not query transaction",error:e.message});
  }
});

app.listen(PORT,()=>console.log("MTY DATA HUB backend running on port "+PORT));
