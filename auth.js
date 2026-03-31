function showTab(tab){
    const loginForm=document.getElementById('loginForm');
    const registerForm=document.getElementById('registerForm');
    const tabs=document.querySelectorAll('.tab-btn');
    tabs.forEach(t=>t.classList.remove('active'));
    if(tab==='login'){
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        tabs[0].classList.add('active');
    }else{
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}
document.getElementById('loginForm')?.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email=document.getElementById('loginEmail').value;
    const password=document.getElementById('loginPassword').value;
    const errorMsg=document.getElementById('loginError');
    try{
        errorMsg.textContent="جاري تسجيل الدخول...";
        await auth.signInWithEmailAndPassword(email,password);
        window.location.href='dashboard.html';
    }catch(error){
        let msg="خطأ في تسجيل الدخول";
        if(error.code==='auth/user-not-found')msg="المستخدم غير موجود";
        if(error.code==='auth/wrong-password')msg="كلمة المرور غير صحيحة";
        errorMsg.textContent=msg;
    }
});
document.getElementById('registerForm')?.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const name=document.getElementById('regName').value;
    const email=document.getElementById('regEmail').value;
    const password=document.getElementById('regPassword').value;
    const errorMsg=document.getElementById('regError');
    try{
        errorMsg.textContent="جاري إنشاء الحساب...";
        const userCredential=await auth.createUserWithEmailAndPassword(email,password);
        await db.collection('users').doc(userCredential.user.uid).set({name:name,email:email,createdAt:new Date(),servers:[]});
        window.location.href='dashboard.html';
    }catch(error){
        let msg="خطأ في إنشاء الحساب";
        if(error.code==='auth/email-already-in-use')msg="البريد مستخدم بالفعل";
        if(error.code==='auth/weak-password')msg="كلمة المرور ضعيفة";
        errorMsg.textContent=msg;
    }
});
function logout(){auth.signOut().then(()=>{window.location.href='login.html'})}
