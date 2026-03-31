const express=require('express');
const cors=require('cors');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const {exec}=require('child_process');
const app=express();
app.use(cors());
app.use(express.json());
const uploadDir=path.join(__dirname,'uploads');
if(!fs.existsSync(uploadDir)){fs.mkdirSync(uploadDir,{recursive:true})}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const userDir=path.join(uploadDir,req.params.userId);
        if(!fs.existsSync(userDir)){fs.mkdirSync(userDir,{recursive:true})}
        cb(null,userDir);
    },
    filename:(req,file,cb)=>{cb(null,'mozeg.py')}
});
const upload=multer({storage:storage,fileFilter:(req,file,cb)=>{if(file.originalname!=='mozeg.py'){return cb(new Error('يجب أن يكون اسم الملف mozeg.py'))}cb(null,true)}});
app.post('/api/upload/:userId',upload.single('file'),(req,res)=>{
    if(!req.file){return res.status(400).json({success:false,error:'لم يتم رفع أي ملف'})}
    const userDir=path.join(uploadDir,req.params.userId);
    const reqPath=path.join(userDir,'requirements.txt');
    if(fs.existsSync(reqPath)){exec(`pip install -r ${reqPath} --target=${userDir}/libs`,(error)=>{if(error)console.error('Error:',error)})}
    res.json({success:true,message:'تم رفع الملف بنجاح'});
});
app.post('/api/run/:userId',(req,res)=>{
    const userDir=path.join(uploadDir,req.params.userId);
    exec(`cd ${userDir} && python mozeg.py`,(error,stdout,stderr)=>{
        if(error){return res.status(500).json({error:error.message})}
        res.json({success:true,output:stdout});
    });
});
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{console.log(`✅ Server running on port ${PORT}`)});
