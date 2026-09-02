let DATA=null,currentCat=0,currentItem=0,view='home';const $=s=>document.querySelector(s);

const bookMap={
'ఆదికాండము':'genesis','నిర్గమకాండము':'exodus','లేవీయకాండము':'leviticus','సంఖ్యాకాండము':'numbers','ద్వితీయోపదేశకాండము':'deuteronomy','యెహోషువ':'joshua','న్యాయాధిపతులు':'judges','రూతు':'ruth','1 సమూయేలు':'1-samuel','2 సమూయేలు':'2-samuel','1 రాజులు':'1-kings','2 రాజులు':'2-kings','1 దినవృత్తాంతములు':'1-chronicles','2 దినవృత్తాంతములు':'2-chronicles','ఎజ్రా':'ezra','నెహెమ్యా':'nehemiah','ఎస్తేరు':'esther','యోబు':'job','కీర్తనలు':'psalms','సామెతలు':'proverbs','ప్రసంగి':'ecclesiastes','పరమగీతము':'song-of-solomon','యెషయా':'isaiah','యిర్మీయా':'jeremiah','విలాపవాక్యములు':'lamentations','యెహెజ్కేలు':'ezekiel','దానియేలు':'daniel','హోషేయ':'hosea','యోవేలు':'joel','ఆమోసు':'amos','ఓబద్యా':'obadiah','యోనా':'jonah','మీకా':'micah','నహూము':'nahum','హబక్కూకు':'habakkuk','జెఫన్యా':'zephaniah','హగ్గయి':'haggai','జెకర్యా':'zechariah','మలాకీ':'malachi','మత్తయి':'matthew','మార్కు':'mark','లూకా':'luke','యోహాను':'john','అపొస్తలుల కార్యములు':'acts','రోమీయులకు':'romans','1 కొరింథీయులకు':'1-corinthians','2 కొరింథీయులకు':'2-corinthians','గలతీయులకు':'galatians','ఎఫెసీయులకు':'ephesians','ఫిలిప్పీయులకు':'philippians','కొలొస్సయులకు':'colossians','1 థెస్సలొనీకయులకు':'1-thessalonians','2 థెస్సలొనీకయులకు':'2-thessalonians','1 తిమోతికి':'1-timothy','2 తిమోతికి':'2-timothy','తీతుకు':'titus','ఫిలేమోనుకు':'philemon','హెబ్రీయులకు':'hebrews','యాకోబు':'james','1 పేతురు':'1-peter','2 పేతురు':'2-peter','1 యోహాను':'1-john','2 యోహాను':'2-john','3 యోహాను':'3-john','యూదా':'jude','ప్రకటన గ్రంథము':'revelation',

'Genesis':'genesis','Exodus':'exodus','Leviticus':'leviticus','Numbers':'numbers','Deuteronomy':'deuteronomy','Joshua':'joshua','Judges':'judges','Ruth':'ruth','1 Samuel':'1-samuel','2 Samuel':'2-samuel','1 Kings':'1-kings','2 Kings':'2-kings','1 Chronicles':'1-chronicles','2 Chronicles':'2-chronicles','Ezra':'ezra','Nehemiah':'nehemiah','Esther':'esther','Job':'job','Psalms':'psalms','Psalm':'psalms','Proverbs':'proverbs','Ecclesiastes':'ecclesiastes','Song of Solomon':'song-of-solomon','Isaiah':'isaiah','Jeremiah':'jeremiah','Lamentations':'lamentations','Ezekiel':'ezekiel','Daniel':'daniel','Hosea':'hosea','Joel':'joel','Amos':'amos','Obadiah':'obadiah','Jonah':'jonah','Micah':'micah','Nahum':'nahum','Habakkuk':'habakkuk','Zephaniah':'zephaniah','Haggai':'haggai','Zechariah':'zechariah','Malachi':'malachi','Matthew':'matthew','Mark':'mark','Luke':'luke','John':'john','Acts':'acts','Romans':'romans','1 Corinthians':'1-corinthians','2 Corinthians':'2-corinthians','Galatians':'galatians','Ephesians':'ephesians','Philippians':'philippians','Colossians':'colossians','1 Thessalonians':'1-thessalonians','2 Thessalonians':'2-thessalonians','1 Timothy':'1-timothy','2 Timothy':'2-timothy','Titus':'titus','Philemon':'philemon','Hebrews':'hebrews','James':'james','1 Peter':'1-peter','2 Peter':'2-peter','1 John':'1-john','2 John':'2-john','3 John':'3-john','Jude':'jude','Revelation':'revelation'
};

fetch('content.json').then(r=>r.json()).then(d=>{DATA=d;init()}).catch(e=>$('#categories').innerHTML='<p>content.json load కాలేదు.</p>');

function init(){
 const total=DATA.categories.reduce((a,c)=>a+c.items.length,0);
 $('#stats').textContent=`${DATA.categories.length} Categories • ${total} Topics`;
 renderCategories();
 $('#search').oninput=e=>search(e.target.value.trim());
 $('#homeBtn').onclick=home;
 $('#backBtn').onclick=goBack;
 $('#themeBtn').onclick=()=>document.body.classList.toggle('dark');
}
function setView(v){
 view=v;
 ['homeView','listView','detailView','resultsView'].forEach(id=>$('#'+id).classList.toggle('hidden',id!==v+'View'));
 $('#backBtn').classList.toggle('hidden',v==='home');
}
function renderCategories(){
 setView('home');
 $('#categories').innerHTML=DATA.categories.map((c,i)=>`<article class="cat" onclick="openCategory(${i})"><img src="assets/category_images/category_${c.id}.jpg" onerror="this.style.display='none'"><div class="inside"><span class="num">${String(c.id).padStart(2,'0')}</span><h3>${esc(c.name)}</h3><div class="count">${c.count||c.items.length} అంశాలు</div><p>${esc(c.subtitle||'')}</p></div></article>`).join('');
}
function openCategory(i){
 currentCat=i;
 const c=DATA.categories[i];
 // Category 15 opens its 20-channel YouTube list directly.
 if(Number(c.id)===15 && c.items?.[0]?.url){
   window.location.href=c.items[0].url;
   return;
 }
 setView('list');
 $('#listTitle').textContent=c.name;
 $('#listSub').textContent=`${c.items.length} ప్రధాన అంశాలు`;
 $('#pointList').innerHTML=c.items.map((it,ii)=>`<article class="pointCard" onclick="openItem(${ii})"><span class="pointNo">${it.number||ii+1}.</span><span class="pointTitle">${esc(mainTitle(it.text))}</span></article>`).join('');
 scrollTop();
}
function openItem(ii){currentItem=ii;renderItem()}
function renderItem(){
 const c=DATA.categories[currentCat],it=c.items[currentItem];
 const parts=String(it.text||'').split('\n');
 const firstLine=parts.shift()||`${c.name} — ${it.number}`;
 const specialCategories=[5,7,10,11,12,13];
 const categoryId=Number(c.id);
 const split=specialCategories.includes(categoryId) ? splitReferenceAndVerse(firstLine) : null;

 let displayTitle=mainTitle(firstLine);
 let bodyLines=parts.slice();

 if(split && split.ref){
   // Categories 5, 7, 10, 11: reference is separated from the verse/text.
   displayTitle = split.prefix || `అంశం ${it.number}`;
   if(split.after) bodyLines.unshift(split.after);
 }

 let html=`<div class="detail-head"><div class="category-label">${esc(c.name)} • ${it.number}/${c.items.length}</div><div class="main-point"><b>🔴 MAIN POINT</b><div>${esc(displayTitle)}</div></div></div>`;

 if(it.url){
   const isLocal=String(it.url).startsWith('category15/');
   html+=`<article class="item"><h2 class="item-title">${esc(displayTitle)}</h2><a class="youtube-btn" href="${esc(it.url)}" ${isLocal?'':'target="_blank" rel="noopener"'}>▶ ${isLocal?'OPEN CATEGORY 15':'OPEN LINK'}</a></article>`;
 }else{
   html+=`<article class="item">`;
   if(displayTitle) html+=`<h2 class="item-title">${esc(displayTitle)}</h2>`;
   if(split && split.ref){
      const url=bibleUrl(split.ref);
      if(url) html+=renderBibleBox(split.ref,url);
   }
   html+=formatText(bodyLines.join('\n'))+`</article>`;
 }

 html+=`<div class="navs"><button class="soft-btn" onclick="prevItem()" ${currentItem===0?'disabled':''}>← Previous</button><button class="soft-btn" onclick="nextItem()" ${currentItem===c.items.length-1?'disabled':''}>Next →</button></div>`;
 $('#detailContent').innerHTML=html;
 setView('detail');scrollTop();
}

function splitReferenceAndVerse(line){
 const raw=String(line||'').trim();
 const ref=findBibleRef(raw);
 if(!ref) return null;
 const idx=raw.indexOf(ref);
 const before=raw.slice(0,idx).replace(/📖/g,'').trim();
 const after=raw.slice(idx+ref.length).trim();
 return {
   ref,
   prefix: before.replace(/[.)]\s*$/,'').trim(),
   after: after.replace(/^[-–—:：]\s*/,'').trim()
 };
}

function renderBibleBox(ref,url){
 return `<a class="bible-ref" href="${esc(url)}" target="_blank" rel="noopener" title="Open in Sajeeva Vahini"><span class="bible-icon">📖</span><span class="bible-ref-text">${esc(ref)}</span><span class="bible-open">↗</span></a>`;
}
function mainTitle(t){return String(t).split('\n')[0].replace(/^\s*\d+\.\s*/,'').trim()}

/* Detect Bible references in all 13 categories and render each as its own clickable box. */
function findBibleRef(line){
 const books=Object.keys(bookMap).sort((a,b)=>b.length-a.length).map(escapeRegExp).join('|');
 const re=new RegExp(`(?:📖\\s*)?(?:\\d+[.)]\\s*)?((?:${books})\\s+\\d+\\s*:\\s*\\d+(?:\\s*[–-]\\s*\\d+(?:\\s*:\\s*\\d+)?)?)`,'i');
 const m=line.match(re);
 return m ? m[1].replace(/\s+/g,' ').trim() : null;
}
/* ALL CATEGORIES 1–13:
   Detect EVERY Bible reference anywhere in the line.
   Keep all original Telugu/English text unchanged.
   Render each detected reference as its own clickable Sajeeva Vahini box. */
function formatText(t){
 const categoryId=Number(DATA?.categories?.[currentCat]?.id);
 const lines=String(t||'').split('\n').filter(Boolean);

 // CATEGORY 14 ONLY:
 // Preserve all supplied text exactly. Only lines explicitly marked
 // "📖 REFERENCES:" are rendered as clickable Sajeeva Vahini boxes.
 if(categoryId===14){
   return lines.map(raw=>{
     const line=String(raw).trim();
     if(/^╔|^╚/.test(line)) return '';
     const refMatch=line.match(/^📖\s*REFERENCES:\s*(.+)$/i);
     if(refMatch){
       const ref=refMatch[1].trim();
       const url=bibleUrl(ref);
       return url ? renderBibleBox(ref,url) : `<div class="bible-ref"><span class="bible-icon">📖</span><span class="bible-ref-text">${esc(ref)}</span></div>`;
     }
     if(/^↔️|^⚠️/.test(line))return `<div class="note">${esc(line)}</div>`;
     if(/^“|^"/.test(line))return `<div class="verse">${esc(line)}</div>`;
     return `<p class="body-text">${esc(line)}</p>`;
   }).join('');
 }

 // Existing behavior for Categories 1–13 remains unchanged.
 const books=Object.keys(bookMap).sort((a,b)=>b.length-a.length).map(escapeRegExp).join('|');
 const refRe=new RegExp(`(?:📖\\s*)?((?:${books})\\s+\\d+\\s*:\\s*\\d+(?:\\s*[–-]\\s*\\d+(?:\\s*:\\s*\\d+)?)?)`,'ig');

 return lines.map(raw=>{
   const line=String(raw).trim();
   const matches=[...line.matchAll(refRe)];
   if(!matches.length){
     if(/^↔️|^⚠️/.test(line))return `<div class="note">${esc(line)}</div>`;
     if(/^“|^"/.test(line))return `<div class="verse">${esc(line)}</div>`;
     return `<p class="body-text">${esc(line)}</p>`;
   }

   let out='',cursor=0;
   matches.forEach(m=>{
     const full=m[0],ref=m[1].replace(/\s+/g,' ').trim();
     let before=line.slice(cursor,m.index).replace(/\s+$/,'');
     if(before){
       if(/^↔️|^⚠️/.test(before)) out+=`<div class="note">${esc(before)}</div>`;
       else if(/^“|^"/.test(before)) out+=`<div class="verse">${esc(before)}</div>`;
       else out+=`<p class="body-text">${esc(before)}</p>`;
     }
     const url=bibleUrl(ref);
     if(url) out+=renderBibleBox(ref,url);
     else out+=`<div class="bible-ref"><span class="bible-icon">📖</span><span class="bible-ref-text">${esc(ref)}</span></div>`;
     cursor=m.index+full.length;
   });

   const after=line.slice(cursor).replace(/^\s*[—–-]\s*/,'').trim();
   if(after){
     if(/^↔️|^⚠️/.test(after)) out+=`<div class="note">${esc(after)}</div>`;
     else if(/^“|^"/.test(after)) out+=`<div class="verse">${esc(after)}</div>`;
     else out+=`<p class="body-text">${esc(after)}</p>`;
   }
   return out;
 }).join('');
}
function bibleUrl(ref){
 const clean=String(ref).replace(/\s*[–-]\s*\d+(?:\s*:\s*\d+)?\s*$/,'').trim();
 const m=clean.match(/^(.+?)\s+(\d+)\s*:\s*\d+/);
 if(!m)return null;
 let book=m[1].trim(),chapter=m[2];
 let slug=bookMap[book];
 if(!slug){
  const k=Object.keys(bookMap).sort((a,b)=>b.length-a.length).find(x=>book.toLowerCase()===x.toLowerCase());
  if(k)slug=bookMap[k];
 }
 return slug?`https://www.sajeevavahini.com/bible/telugu-bible-bsi/${slug}/${chapter}`:null;
}
function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function prevItem(){if(currentItem>0){currentItem--;renderItem()}}
function nextItem(){const c=DATA.categories[currentCat];if(currentItem<c.items.length-1){currentItem++;renderItem()}}
function goBack(){if(view==='detail'){openCategory(currentCat);return}home()}
function home(){renderCategories();scrollTop()}
function search(q){
 if(!q){home();return}
 const hits=[];
 DATA.categories.forEach((c,ci)=>c.items.forEach((it,ii)=>{
  if((c.name+' '+c.subtitle+' '+it.text).toLowerCase().includes(q.toLowerCase()))hits.push({c,ci,ii,it})
 }));
 setView('results');
 $('#results').innerHTML=hits.length?hits.map(h=>`<div class="result-card" onclick="currentCat=${h.ci};openItem(${h.ii})"><span class="category-label">${esc(h.c.name)}</span><br><b>${esc(mainTitle(h.it.text))}</b></div>`).join(''):'<p>ఏ results దొరకలేదు.</p>';
}
function scrollTop(){window.scrollTo({top:0,behavior:'smooth'})}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
