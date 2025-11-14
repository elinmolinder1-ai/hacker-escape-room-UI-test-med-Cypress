const filterUserInput = document.querySelector(".filter__user-input");
let allChallengesData = []; //Spara api-data

function renderChallenges(challenges){
    const list = document.getElementById('challengesList');

    if(!list){
        console.error("Could not find #challengesList in HTML");
        return;
    }

    list.innerHTML ="";

    if(challenges.length===0){
        list.innerHTML = '<li>Could not find matching challenges</li>';
        return;
    }

    challenges.forEach(challenge =>{
        const li = document.createElement('li');
        li.classList.add("challenge");

        li.innerHTML = `
        <div class = "challenge__card">
        <img src = "${challenge.image}"/>
            <div class="challenge__content">
                <h3 class="challenge__title">${challenge.title}</h3>
                <p class ="challenge__description">${challenge.description}</p>
                <p class ="challenge__rating">${challenge.rating}</p>
             </div>
        </div> 
        `;

        list.appendChild(li);
    });
}


async function loadchallenges() {
    try {
        const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
        const data = await res.json();

        allChallengesData = data.challenges;

        console.log('initial render test');
        renderChallenges(allChallengesData)
    } catch (err) {
        console.error('Error loading challenges', err);
    }
}

loadchallenges();


let filterState = {
    search: "",
    online: false,
    onSite: false,
    tags: [],
    minRating: 0,
    maxRating: 5
};

filterUserInput.addEventListener("input", (e) => {
    filterState.search = e.target.value.toLowerCase();
    applyFilters();
})

function applyFilters() {
    let filtered = allChallengesData;

    if (filterState.search.trim() !== "") {
        filtered = filtered.filter(challenge => {
            const title = challenge.title.toLowerCase();
            const description = challenge.description.toLowerCase();

            return (title.includes(filterState.search)) ||
                description.includes(filterState.search
                );
        })
    };

    renderChallenges(filtered);

    console.log('Search-filter:', filterState.search)
}




//toggle online/offline checkbox apperence
function toggleCheckbox() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

//toogle tag state, added to selectedTags array if checked
let selectedTags = [];

function toggleTag(tagElement) {
    const tag = tagElement.textContent.trim();
    const index = selectedTags.indexOf(tag);

    if (index > -1) {
        selectedTags.splice(index, 1);
        tagElement.classList.remove("checked"); s
    } else {
        selectedTags.push(tag);
        tagElement.classList.add("checked");
    }

    console.log("Selected tags:", selectedTags);
}
