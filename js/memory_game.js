const simboli_carte_variabile = {
    facile: ["A", "B", "C", "D", "E", "F"],
    media: ["A", "B", "C", "D", "E", "F", "G", "H"],
    difficile: ["A", "B", "C", "D", 
                "E", "F", "G", "H", 
                "I", "L", "M", "N"]
};

const difficolta = {facile: 0, media: 1, difficile: 2};

let mazzo = [];
let carte_girate = [];
let bloccoGriglia = false;
let coppieTrovate = 0;


function getDifficolta() {
    const diff = document.getElementById("difficolta").value.toLowerCase();
    
    return diff;
}

function getMazzo() {
    return [...simboli_carte_variabile[getDifficolta()], ...simboli_carte_variabile[getDifficolta()]];
}

function sort_cards(mazzo) {
    mazzo.sort(() => Math.random() - 0.5);
}

function initialize_board() {
    let grigliaGioco = document.getElementById("grigliaGioco");

    grigliaGioco.innerHTML = "";

    mazzo = getMazzo();

    sort_cards(mazzo);

    for (let i = 0; i < mazzo.length; i++) {
        let nextCard = document.createElement("button");
        nextCard.textContent = mazzo[i];
        nextCard.classList.add("carta")

        

        nextCard.addEventListener("click", function() {
            if (bloccoGriglia === true || this.classList.contains("scoperta")) {
                return;
            }


            this.classList.add("scoperta");
            carte_girate.push(this);

            let currCont = parseInt(document.getElementById("contatoreMosse").textContent) + 1;
            document.getElementById("contatoreMosse").textContent = currCont;

            if (carte_girate.length === 2) {
                bloccoGriglia = true;

                let carta1 = carte_girate[0];
                let carta2 = carte_girate[1];

                if (carta1.textContent === carta2.textContent) {
                    carte_girate = [];
                    coppieTrovate++;
                    if (coppieTrovate === mazzo.length/2) {
                        document.getElementById("vittoriaLbl").textContent = "Hai vinto, bravo!";
                    }
                    bloccoGriglia = false;
                } else {
                    setTimeout(() => {
                        carta1.classList.remove("scoperta");
                        carta2.classList.remove("scoperta");

                        carte_girate = [];

                        bloccoGriglia = false;
                    }, 1000);
                }
            }
        });

        

        grigliaGioco.appendChild(nextCard);
    }
}

//bottone di reset
let resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    document.getElementById("vittoriaLbl").textContent = "";
    document.getElementById("contatoreMosse").textContent = "0";

    carte_girate = [];
    bloccoGriglia = false;
    coppieTrovate = 0;
    initialize_board();
});

let diff_selector = document.getElementById("difficolta");

diff_selector.addEventListener("click", () => {
    initialize_board();
})

//preparazione dell griglia
initialize_board();


//controllo supporto service worker nel browser
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceWorker.js", { scope: "/" }).
        then(() => {
            console.log("Service Worker registrato e pronto per vandalizzare la tua cache")
        }).catch((e) => {
            console.log("Registrazione fallita: ", e);
        })
} 
 