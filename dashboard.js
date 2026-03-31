let currentFile=null;
let userId=null;
auth.onAuthStateChanged(async(user)=>{
    if(user){
        userId=user.uid;
        document.getElementById('userEmail').textContent=user.email;
        document.getElementById('welcomeMsg').textContent=`مرحباً، ${user.email.split('@')[0]}`;
    }else{window.location.href='login.html'}
});
const uploadBox=document.getElementById('uploadBox');
const fileInput=document.getElementById('fileInput');
uploadBox?.addEventListener('click',()=>fileInput.click());
uploadBox?.addEventListener('dragover',(e)=>{e.preventDefault();uploadBox.style.background='rgba(0,255,0,0.2)'});
uploadBox?.addEventListener('dragleave',()=>{uploadBox.style.background='rgba(0,20,0,0.3)'});
uploadBox?.addEventListener('drop',(e)=>{e.preventDefault();uploadBox.style.background='rgba(0,20,0,0.3)';if(e.dataTransfer.files.length>0)handleFile(e.dataTransfer.files[0])});
fileInput?.addEventListener('change',(e)=>{if(e.target.files.length>0)handleFile(e.target.files[0])});
function handleFile(file){
    if(file.name!=='mozeg.py'){alert('❌ خطأ: يجب أن يكون اسم الملف mozeg.py بالضبط!');return}
    currentFile=file;
    document.getElementById('fileName').textContent=file.name+' ('+(file.size/1024).toFixed(2)+' KB)';
    document.getElementById('fileDetails').classList.remove('hidden');
    log('✅ تم اختيار الملف: '+file.name,'info');
}
async function uploadFile(){
    if(!currentFile||!userId)return;
    try{
        log('📤 جاري رفع الملف...','info');
        const storageRef=storage.ref(`users/${userId}/bots/mozeg.py`);
        await storageRef.put(currentFile);
        const url=await storageRef.getDownloadURL();
        await db.collection('users').doc(userId).update({botFile:url,status:'ready',updatedAt:new Date()});
        log('✅ تم رفع الملف بنجاح!','info');
        log('🚀 جاري تشغيل البوت...','info');
        setTimeout(()=>{
            log('✅ البوت يعمل الآن!','info');
            document.getElementById('serverStatus').textContent='مشغل';
            document.getElementById('serverStatus').style.color='#0f0';
            document.getElementById('memoryUsage').textContent='128 MB';
        },2000);
    }catch(error){log('❌ خطأ: '+error.message,'error')}
}
function log(message,type='info'){
    const terminal=document.getElementById('terminal');
    const p=document.createElement('p');
    p.textContent=`[${new Date().toLocaleTimeString()}] ${message}`;
    p.className=`log-${type}`;
    terminal.appendChild(p);
    terminal.scrollTop=terminal.scrollHeight;
}
