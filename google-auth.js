(function(){
  const box=document.getElementById('googleLogin');
  if(!box) return;
  function render(){
    if(typeof google==='undefined'||!google.accounts||!google.accounts.id){setTimeout(render,300);return;}
    if(!window.GOOGLE_CLIENT_ID){
      box.innerHTML='<button class="google-login-btn" type="button" title="Google OAuth Client ID required">🔐 Login with Google</button>';
      box.querySelector('button').onclick=function(){alert('Google Login activate చేయడానికి google-auth-config.js లో Google OAuth Web Client ID add చేయాలి.');};
      return;
    }
    google.accounts.id.initialize({client_id:window.GOOGLE_CLIENT_ID,callback:onCredential});
    google.accounts.id.renderButton(box,{theme:'outline',size:'medium',shape:'pill',text:'signin_with',locale:'en'});
  }
  function onCredential(response){
    try{
      const p=JSON.parse(atob(response.credential.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
      localStorage.setItem('google_user',JSON.stringify({name:p.name||'',email:p.email||'',picture:p.picture||''}));
      renderUser();
    }catch(e){console.error('Google login error',e);}
  }
  function renderUser(){
    const raw=localStorage.getItem('google_user');
    if(!raw){render();return;}
    try{
      const u=JSON.parse(raw);
      box.innerHTML='<div class="user-login"><img src="'+esc(u.picture||'')+'" alt=""><span>'+esc(u.name||u.email||'Google User')+'</span><button type="button" class="logout-btn">Logout</button></div>';
      box.querySelector('.logout-btn').onclick=function(){localStorage.removeItem('google_user');render();};
    }catch(e){localStorage.removeItem('google_user');render();}
  }
  function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  window.addEventListener('load',renderUser);
})();
