let start = document.getElementById("boutonStart");
let question = document.getElementById("question");
let intituleQuestion = document.querySelector(".intit");
let boutonSuivant = document.getElementById("suivant");
let propositions = document.querySelectorAll(".questions .prop");
let corps = document.querySelector("body");
let zonechrono = document.querySelector(".chrono");

let lesQuestions = {
    intitule:"",
    reponses:"",
    correct:0
}

let bonIndex=0;
let score=0

function ValiderReponse(bon){
    propositions[bon].setAttribute("class", "bonneRep")
    for (let j=0; j<propositions.length; j++){
        propositions[j].disabled=true
    }
}

let validation = false;
for (let i=0; i<propositions.length; i++){
    propositions[i].addEventListener("click", ()=>{
        validation = true;
        if (i === bonIndex){
            propositions[i].setAttribute("class", "bonneRep")
            score++;
        }else{
            propositions[i].setAttribute("class", "mauvaiseRep")
            propositions[bonIndex].setAttribute("class", "bonneRep")
        }
        for (let j=0; j<propositions.length; j++){
            propositions[j].disabled=true
        }
        boutonSuivant.style.display="block"
    })
}

function AfficherQuestions(index){
    lesQuestions.intitule=quests[index];
    lesQuestions.reponses=answers[index];
    lesQuestions.correct=exact[index];
    bonIndex = lesQuestions.correct;

    intituleQuestion.innerHTML=lesQuestions.intitule;
    for (let j=0; j<propositions.length; j++){
        propositions[j].innerHTML=lesQuestions.reponses[j];
    }
    question.style.display="flex";
    let temps = 15;
    let chrono = setInterval(function(){
        if (temps < 0 || validation){
            clearInterval(chrono)
            ValiderReponse(lesQuestions.correct);
            boutonSuivant.style.display="block"
        }else{
            zonechrono.style.display="block";
            zonechrono.style.color="white";
            zonechrono.innerHTML=temps;
            temps--;
            if(temps < 5){
                zonechrono.style.color="red";
            }
        }
    }, 1000)
}

start.addEventListener("click", ()=>{
    let demarrage = 3;
    let depart = document.querySelector(".depart");
    start.style.display="none";
    depart.innerHTML=demarrage;
    let compterebour = setInterval(function(){
        if (demarrage === 1){
            clearInterval(compterebour)
            corps.removeChild(depart)
            AfficherQuestions(0);
        }else{
            demarrage--;
            depart.innerHTML=demarrage;
        }
    }, 1000)
})

let nbquestions = 1
boutonSuivant.addEventListener("click", ()=>{
    validation = false;
    if(nbquestions === quests.length-1){
        boutonSuivant.textContent = "Terminer";
    }
    if(nbquestions >= quests.length){
        question.style.display="none";
        zonechrono.style.display="none";
        boutonSuivant.style.display="none";
        let final = document.createElement("div")
        final.setAttribute("class", "result")
        let resultat = document.createElement("h2")
        let messagefin = document.createElement("h2")
        resultat.textContent = `Votre score : ${score}/${quests.length}`
        messagefin.textContent = "Merci d'avoir joué, à bientôt !"
        final.appendChild(resultat)
        final.appendChild(messagefin)
        corps.appendChild(final)
    }else{
        for (i=0; i<propositions.length; i++){
            propositions[i].disabled=false;
            propositions[i].setAttribute("class", "prop")
        }
        AfficherQuestions(nbquestions);
        nbquestions+=1;
        boutonSuivant.style.display="none";
    }
})
