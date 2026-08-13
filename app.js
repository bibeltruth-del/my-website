let DATA=null, currentCat=0, currentItem=0;
const $=s=>document.querySelector(s);
fetch('content.json').then(r=>r.json()).then(d=>{DATA=d;init();}).catch(()=>$('#categories').innerHTML='<div class="empty">content.json load కాలేదు. GitHubలో file rootలో ఉందో చూడండి.</div>');

function init(){
 const total=DATA.categories.reduce((a,c)=>a+c.items.length,0);
 $('#catCount').textContent=`${DATA.categories.length} Categories`;
 $('#itemCount').textContent=`${total} Items`;
 renderCategories(DATA.categories);
 $('#search').addEventListener('input',e=>search(e.target.value.trim()));
 $('#homeBtn').onclick=home;
 $('#backBtn').onclick=home;
 $('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('bt-dark',document.body.classList.contains('dark'));};
 if(localStorage.getItem('bt-dark')==='true')document.body.classList.add('dark');
}
function renderCategories(cats){
 $('#categories').innerHTML=cats.map((c,i)=>{
  const img=`assets/category_images/category_${c.id}.jpg`;
  return `<article class="cat" onclick="openCategory(${i})"><img src="${img}" onerror="this.style.display='none'"><div class="inside"><span class="num">${String(c.id).padStart(2,'0')}</span><h3>${esc(c.name)}</h3><div class="count">${c.count||c.items.length} అంశాలు</div><p>${esc(c.subtitle||'')}</p></div></article>`;
 }).join('');
 show('categories'); hide('results'); hide('detail');
}
function openCategory(i){currentCat=i;currentItem=0;renderItem();}
function renderItem(){
 const c=DATA.categories[currentCat], it=c.items[currentItem];
 const parts=it.text.split('\n');
 const title=parts.shift()||`${c.name} — ${it.number}`;
 const mainPoint=makeMainPoint(title,it.text,c);
 let html=`<div class="detail-head"><div class="category-label">${esc(c.name)} • ${it.number}/${c.items.length}</div><div class="main-point"><b>🔴 MAIN POINT</b><div class="question">${esc(mainPoint)}</div></div></div>`;
 if(it.url){
   const isPlaylist=/youtube\.com\/playlist/i.test(it.url);
   const label=isPlaylist?'▶ OPEN PLAYLIST':'▶ WATCH ON YOUTUBE';
   html+=`<article class="item youtube-item"><h2 class="item-title">${esc(title)}</h2><a class="youtube-btn" href="${esc(it.url)}" target="_blank" rel="noopener noreferrer">${label}</a></article>`;
 }else{
   html+=`<article class="item"><h2 class="item-title">${esc(title)}</h2>${formatText(parts.join('\n'))}</article>`;
 }
 html+=`<div class="navs"><button class="soft-btn" onclick="prevItem()" ${currentItem===0?'disabled':''}>← Previous</button><button class="soft-btn" onclick="nextItem()" ${currentItem===c.items.length-1?'disabled':''}>Next →</button></div>`;
 $('#detailContent').innerHTML=html;show('detail');hide('categories');hide('results');window.scrollTo({top:0,behavior:'smooth'});
}
function makeMainPoint(title,text,c){
 let q=title.replace(/^(విరుద్ధత\s*\d+\s*:\s*|\d+\.\s*)/,'').trim();
 if(c.id===1 && /దేవుడు|సాతాను|యెహోవా/i.test(text)) return q.replace(/[?？]?\s*$/,'')+' — దేవుడా? సాతానా?';
 return q.replace(/[?？]?\s*$/,'')+(q.endsWith('?')?'':'');
}
function formatText(t){
 const lines=t.split('\n');let out='',quote=false;
 for(const raw of lines){const line=raw.trim();if(!line)continue;
  if(/^📖/.test(line)){out+=`<div class="verse"><span class="verse-label">${esc(line)}</span></div>`;}
  else if(/^↔️/.test(line)||/^⚠️/.test(line)){out+=`<div class="note">${esc(line)}</div>`;}
  else if(/^“/.test(line)||/^"/.test(line)||/^“.*”$/.test(line)){out+=`<div class="verse">${esc(line)}</div>`;}
  else if(/^వివరణ\s*:/.test(line)||/^గమనిక\s*:/.test(line)||/^Conclusion\s*:/i.test(line)){out+=`<div class="note"><b>${esc(line.split(':')[0])}:</b>${esc(line.slice(line.indexOf(':')+1))}</div>`;}
  else out+=`<p class="body-text">${esc(line)}</p>`;
 }
 return out;
}
function prevItem(){if(currentItem>0){currentItem--;renderItem()}}
function nextItem(){const c=DATA.categories[currentCat];if(currentItem<c.items.length-1){currentItem++;renderItem()}}
function search(q){
 if(!q){renderCategories(DATA.categories);return}
 const hits=[];
 DATA.categories.forEach((c,ci)=>c.items.forEach((it,ii)=>{if((c.name+' '+c.subtitle+' '+it.text).toLowerCase().includes(q.toLowerCase()))hits.push({ci,ii,c,it})}));
 hide('categories');hide('detail');show('results');
 $('#results').innerHTML=hits.length?`<h2>Search Results <small>(${hits.length})</small></h2>`+hits.map((h,n)=>`<div class="result-card" onclick="openResult(${h.ci},${h.ii})"><span class="category-label">${esc(h.c.name)} • ${h.it.number}</span><strong>${esc(h.it.text.split('\n')[0])}</strong></div>`).join(''):'<div class="empty">ఏ results దొరకలేదు.</div>';
}
function openResult(ci,ii){currentCat=ci;currentItem=ii;renderItem()}
function home(){renderCategories(DATA.categories);window.scrollTo({top:0,behavior:'smooth'})}
function show(id){$('#'+id).classList.remove('hidden')}function hide(id){$('#'+id).classList.add('hidden')}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
