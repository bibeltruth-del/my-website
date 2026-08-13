let DATA=[];
const folders=document.getElementById("folders");
const search=document.getElementById("search");

function safeLabel(url, i, folder){
  const isPlaylist=url.includes("playlist?");
  if(isPlaylist) return {title:`${folder} – Playlist ${i}`, type:"Playlist"};
  return {title:`${folder} – Debate ${i}`, type:"Video"};
}
function render(q=""){
  const needle=q.trim().toLowerCase();
  folders.innerHTML="";
  let shown=0;
  DATA.forEach(folder=>{
    const matches=folder.urls.filter(u=>
      !needle ||
      folder.name.toLowerCase().includes(needle) ||
      u.toLowerCase().includes(needle)
    );
    if(!matches.length) return;
    shown++;
    const box=document.createElement("section");
    box.className="folder";
    box.innerHTML=`<h2>📂 ${folder.name}</h2><div class="count">${matches.length} links</div>`;
    matches.forEach((url,idx)=>{
      const info=safeLabel(url,idx+1,folder.name);
      const row=document.createElement("div");
      row.className="card";
      const left=document.createElement("div");
      left.innerHTML=`<div class="name">🎬 ${info.title}</div><div class="type">${info.type}</div>`;
      const a=document.createElement("a");
      a.className=info.type==="Playlist"?"play":"yt";
      a.href=url;
      a.target="_blank";
      a.rel="noopener noreferrer";
      a.textContent=info.type==="Playlist"?"▶ OPEN PLAYLIST":"▶ WATCH ON YOUTUBE";
      row.append(left,a); box.appendChild(row);
    });
    folders.appendChild(box);
  });
  if(!shown) folders.innerHTML='<div class="empty">No Bible Debates found.</div>';
}
fetch("youtube-links.json")
 .then(r=>r.json())
 .then(d=>{DATA=d;render()})
 .catch(()=>{folders.innerHTML='<div class="empty">Could not load YouTube links.</div>'});
search.addEventListener("input",e=>render(e.target.value));
