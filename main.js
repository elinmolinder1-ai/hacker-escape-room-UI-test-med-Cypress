const mobilemenu = document.querySelector('.header__mainmobilenavmenu');
const navmenu = document.querySelector('.header__navcontainer')
const closemenu = document.querySelector('.header__navcontainernavclose')


mobilemenu.addEventListener("click", () => {
    navmenu.classList.toggle('mobileactive'); });

closemenu.addEventListener("click", () => {
    navmenu.classList.toggle('mobileactive'); });


    /*const BASE_URL = 'https://lernia-sjj-assignments.vercel.app/api';

    async function getChallenges() {
  const res = await fetch(`${BASE_URL}/challenges`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Kunde inte hämta challenges (${res.status}).`);
  }
  const data = await res.json();
  return data.challenges; // ska retunera array av challenge-objekt
} */

  //fetch funktionen
  async function getChallenges() {
const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
const data = await res.json();
  return data.challenges;
};



function createChallengeLi(ch) {
  const {
    title,
    description,
    type,               
    minParticipants,
    maxParticipants,
    rating = 0,
    image,
    labels = []
  } = ch;

  
  const full = Math.floor(Number(rating));      
  const empty = 5 - full;
  const filledStars = '★ '.repeat(full).trim();
  const emptyStars  = '☆'.repeat(empty);

  
  const typeText = type === 'onsite' ? '(on-site)' : '(networked)';

  const li = document.createElement('li');
  li.className = 'challenges__listItem';
  li.innerHTML = `
    <article class="challenge">
      <img src="${image}" alt="${title}" class="challenge__image">
      <div class="challenge__details">
        <div class="challenge__rating" role="img" aria-label="${rating} of 5 stars">
          <span class="challenge__rating__filledstar">${filledStars}</span>
          <span class="challenge__rating__emptystar">${emptyStars}</span>
        </div>
        <span class="challenge__size">${minParticipants}–${maxParticipants} participants</span>
      </div>

      <h3 class="challenge__title">${title} ${typeText}</h3>
      <p class="challenge__description">${description}</p>

      <!-- valfritt: visa etiketter om du har stil för dem -->
      ${labels.length ? `<p class="challenge__labels">${labels.map(l => `#${l}`).join(' ')}</p>` : ''}

      <button class="challenge__bookbutton">
        ${type === 'onsite' ? 'Book this room' : 'Take challenge online'}
      </button>
    </article>
  `;
  return li;
}

const listEl = document.getElementById('main-list');
const statusEl = document.getElementById('main-status');

(async function initMain() {
  try {
    statusEl.textContent = 'Laddar…';
    const all = await getChallenges();
    const top3 = [...all].sort((a,b)=>(b.rating??0)-(a.rating??0)).slice(0,3);

    listEl.innerHTML = '';
    top3.forEach(ch => listEl.appendChild(createChallengeLi(ch)));
    statusEl.textContent = '';
  } catch (e) {
    statusEl.textContent = 'Kunde inte ladda data.';
    console.error(e);
  }
})();

