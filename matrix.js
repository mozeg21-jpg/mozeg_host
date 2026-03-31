const canvas=document.getElementById('matrix');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const fontSize=14;
const columns=canvas.width/fontSize;
const drops=[];
for(let i=0;i<columns;i++){drops[i]=Math.random()*-100}
function drawMatrix(){
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#0F0';
    ctx.font=fontSize+'px monospace';
    for(let i=0;i<drops.length;i++){
        const text=chars[Math.floor(Math.random()*chars.length)];
        ctx.fillText(text,i*fontSize,drops[i]*fontSize);
        if(drops[i]*fontSize>canvas.height&&Math.random()>0.975){drops[i]=0}
        drops[i]++;
    }
}
let progress=0;
const progressBar=document.getElementById('progress');
const percentage=document.getElementById('percentage');
const status=document.getElementById('status');
const loadingTexts=["جاري تهيئة النظام...","تحميل الوحدات...","إعداد قاعدة البيانات...","تهيئة Docker...","جاري التشغيل..."];
function updateLoading(){
    if(progress<100){
        progress+=Math.random()*2;
        if(progress>100)progress=100;
        if(progressBar)progressBar.style.width=progress+'%';
        if(percentage)percentage.textContent=Math.floor(progress);
        const textIndex=Math.floor((progress/100)*loadingTexts.length);
        if(status)status.textContent=loadingTexts[Math.min(textIndex,loadingTexts.length-1)];
        setTimeout(updateLoading,50);
    }
}
setInterval(drawMatrix,35);
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight});
if(document.getElementById('progress')){updateLoading()}
