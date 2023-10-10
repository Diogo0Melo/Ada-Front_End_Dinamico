const btnGetPoke = document.querySelector("#get-poke");
const pokeImgTag = document.querySelector("#poke-img");
const loading = document.querySelector("#loading");
const answerInput = document.querySelector("#answer");
const answerBtn = document.querySelector("#answer-btn");
const currentPoke = {
    name: "",
    img: "",
};
const api = "https://pokeapi.co/api/v2/pokemon/";
const correctAnswerAudio = document.querySelector("#correct-answer");
const incorrectAnswerAudio = document.querySelector("#incorrect-answer");
const qualPokeAudio = document.querySelector("#qual-poke");
const favoritePokesArray = [];
function getPoke(event) {
    event.target.classList.add("disabled");
    answerInput.value = "";
    const randomPoke = Math.floor(Math.random() * 1017) + 1;
    fetch(`${api}${randomPoke}`)
        .then(async (response) => {
            loading.removeAttribute("hidden");
            qualPokeAudio.play();
            await new Promise((resolve) =>
                setTimeout(() => {
                    loading.setAttribute("hidden", "");
                    resolve();
                }, 3300)
            );
            return response.json();
        })
        .then((data) => {
            const pokeImg =
                data.sprites.other["official-artwork"].front_default;
            const pokeName = data.name;
            currentPoke.name = pokeName;
            currentPoke.img = pokeImg;
            addPokeView(pokeImg);
            event.target.classList.remove("disabled");
            answerBtn.classList.remove("disabled");
        })
        .catch((error) => {
            console.log(error);
        });
}
function addPokeView(pokeImg) {
    pokeImgTag.src = pokeImg;
    pokeImgTag.style = "filter: brightness(0);";
    pokeImgTag.id = "poke-img";
}
function checkAnswer() {
    const userAnswer = answerInput.value.toLowerCase();
    if (userAnswer === currentPoke.name) {
        pokeImgTag.style = "filter: brightness(1);";
        correctAnswerAudio.play();
    } else {
        incorrectAnswerAudio.play();
        pokeImgTag.style = "filter: brightness(1);";
    }
    answerInput.value = `É o ${currentPoke.name} - Sua resposta: ${userAnswer}`;
    answerBtn.classList.add("disabled");
    favoriteEnable();
    if (currentPoke.name) validateFavorite();
}
function favoriteEnable() {
    pokeImgTag.style = "cursor: pointer;";
    pokeImgTag.addEventListener("click", addFavoritePoke);
}
function addFavoritePoke(loadName, loadImg) {
    const carousel = document.querySelector(".carousel-inner");
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.classList.add("carousel-item");
    img.setAttribute("pokename", `${currentPoke.name || loadName}`);
    img.classList.add("d-block", "w-100");
    img.src = currentPoke.img || loadImg;
    div.appendChild(img);
    carousel.appendChild(div);
    pokeImgTag.removeEventListener("click", addFavoritePoke);
    pokeImgTag.style = "cursor: default;";
    const divs = document.querySelectorAll("div.carousel-item");
    divs.forEach((divIn) => {
        if (currentPoke.name) {
            divIn.classList.remove("active");
            div.classList.add("active");
            return;
        }
        if (!divIn.hasAttribute("remover")) {
            return;
        }
        divIn.remove();
        div.classList.add("active");
        return;
    });

    if (currentPoke.name) {
        img.addEventListener("click", removeFavoritePoke);
        img.style = "cursor: pointer;";
        favoritePokesArray.push({ ...currentPoke });
        localStorage.setItem("favorites", JSON.stringify(favoritePokesArray));
        return;
    }
    favoritePokesArray.push({
        name: loadName,
        img: loadImg,
    });
}
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach((favorite) => {
        addFavoritePoke(favorite.name, favorite.img);
    });
    const favoritePokes = document.querySelectorAll("div.carousel-item > img");
    favoritePokes.forEach((favoritePoke) => {
        favoritePoke.addEventListener("click", removeFavoritePoke);
        favoritePoke.style = "cursor: pointer;";
    });
}
function removeFavoritePoke() {
    const favorite = favoritePokesArray.find((favorite) => {
        return this.getAttribute("pokename") === favorite.name;
    });
    const index = favoritePokesArray.indexOf(favorite);
    this.parentElement.remove();
    document.querySelector("div.carousel-item").classList.add("active");
    favoritePokesArray.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favoritePokesArray));
}
function validateFavorite() {
    const favorite = favoritePokesArray.find((favorite) => {
        return favorite.name === currentPoke.name;
    });
    if (!favorite) {
        return;
    }
    pokeImgTag.removeEventListener("click", addFavoritePoke);
    pokeImgTag.style = "cursor: default;";
    return;
}
window.addEventListener("load", loadFavorites);
btnGetPoke.addEventListener("click", getPoke);
answerBtn.addEventListener("click", checkAnswer);
