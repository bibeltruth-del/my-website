const channels = [
  {name: 'Shiva Shakthi Shankharaavam', url: 'https://www.youtube.com/c/ShivashakthiShankhaaraavam/featured'},
  {name: 'SHIVASHAKTHI', url: 'https://www.youtube.com/@SHIVASHAKTHI'},
  {name: 'Kiranaasthram', url: 'https://www.youtube.com/@kiranaasthram'},
  {name: 'Unbeliever_rg', url: 'https://www.youtube.com/@Unbeliever_rg'},
  {name: 'Hindu Jana Shakti', url: 'https://www.youtube.com/@HinduJanaShakti'},
  {name: 'LALITH_KUMARK', url: 'https://www.youtube.com/@LALITH_KUMARK'},
  {name: 'Shivaji Sena', url: 'https://www.youtube.com/@ShivajiSena1'},
  {name: 'Telugu Ex Christian', url: 'https://www.youtube.com/@TeluguExChristian'},
  {name: 'Kaapari The Shepherd', url: 'https://www.youtube.com/@KaapariTheShepherd'},
  {name: 'Sri Nighasa', url: 'https://www.youtube.com/@SriNighasa'},
  {name: 'Dharma Margam', url: 'https://www.youtube.com/@dharmamargam'},
  {name: 'Parvathi Hindu Dharma Rakshana', url: 'https://www.youtube.com/@ParvathiHinduDharmaRakshana'},
  {name: 'Mathonmadam Pai Ramabanam', url: 'https://www.youtube.com/@MathonmadampaiRamabanam'},
  {name: 'Karunakar Sugguna', url: 'https://www.youtube.com/@karunakarsugguna'},
  {name: 'Bible Exposer', url: 'https://www.youtube.com/@BibleExposer'},
  {name: 'Krishna Dharma Rakshana', url: 'https://www.youtube.com/@krishnadharmarakshana'},
  {name: 'Radha Manohar Das 108', url: 'https://www.youtube.com/@RadhaManoharDas108'},
  {name: 'Akil NTR', url: 'https://www.youtube.com/@AkilNTR'},
  {name: 'Gopi Sanathana Sena', url: 'https://www.youtube.com/@gopisanathanasena'},
  {name: 'Bharatavarsha 4U', url: 'https://www.youtube.com/@bharatavarsha4u'}
];

const homeView = document.getElementById('homeView');
const listView = document.getElementById('listView');
const channelList = document.getElementById('channelList');

function showList() {
  homeView.classList.remove('active');
  listView.classList.add('active');
  window.scrollTo(0, 0);
}

function showHome() {
  listView.classList.remove('active');
  homeView.classList.add('active');
  window.scrollTo(0, 0);
}

document.getElementById('openFolder').addEventListener('click', showList);
document.getElementById('openFolder').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') showList();
});
document.getElementById('backBtn').addEventListener('click', showHome);

channels.forEach((channel, index) => {
  const item = document.createElement('a');
  item.className = 'channel';
  item.href = channel.url;
  item.target = '_blank';
  item.rel = 'noopener noreferrer';
  item.innerHTML = `
    <div class="number">${index + 1}</div>
    <div class="channel-name">${channel.name}</div>
    <div class="open">▶ Open YouTube</div>
  `;
  channelList.appendChild(item);
});
