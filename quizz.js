"use strict";

const QUESTION_COUNT = 10;
const QUESTIONS = [
  {
    "id": 1,
    "question": "Dans ASTRAL CARDS, quel est le nombre minimum de cartes composant un Deck ?",
    "answers": [
      "25 cartes",
      "30 cartes",
      "40 cartes",
      "36 cartes"
    ],
    "correct": 3,
    "explanation": "Un Deck est composé d’au moins 15 Sbires, 15 Pouvoirs, 1 Environnement, 1 Navigateur et 4 cartes Cosmiques, soit 36 cartes minimum. Les cartes Spéciales sont facultatives, de 0 à 4."
  },
  {
    "id": 2,
    "question": "Lorsqu’un Sbire est invoqué normalement, dans quel état arrive-t-il sur le Terrain ?",
    "answers": [
      "Incliné",
      "Redressé",
      "Prêt au combat",
      "Apparition"
    ],
    "correct": 0,
    "explanation": "Lorsqu’un Sbire est invoqué normalement, il arrive incliné, donc à l’horizontale."
  },
  {
    "id": 3,
    "question": "Si un effet indique que la Puissance de cette carte est augmentée de 2 points, quelle est sa valeur après l’effet ?",
    "answers": [
      "2 points",
      "0 point",
      "Elle ne peut pas gagner de Puissance",
      "1 point"
    ],
    "correct": 2,
    "explanation": "Un Sbire sans cercle de statistique de Puissance ne peut pas en gagner, peu importe l’effet.",
    "image": "images/quizz/Grand_Belugha_-_Démononuageux (1).png"
  },
  {
    "id": 4,
    "question": "Je possède un Sbire prêt au combat et mon adversaire ne possède aucun Sbire sur son Terrain. Nous sommes au tour 2. Puis-je attaquer ?",
    "answers": [
      "Oui, et le Navigateur adverse perd 1 PV lors de sa révélation.",
      "Non. Le Navigateur n’est pas révélé et je ne peux rien faire.",
      "Je ne peux pas attaquer, mais je peux incliner mon Sbire pour gagner 1 Étoile.",
      "Oui, mais uniquement si je dépense 1 Energy."
    ],
    "correct": 2,
    "explanation": "Au tour 2, le Navigateur adverse n’est pas encore révélé et ne peut pas être attaqué. Si l’adversaire ne possède aucun Sbire, vous pouvez incliner votre Sbire prêt au combat afin de gagner 1 Étoile."
  },
  {
    "id": 5,
    "question": "Quel est le nom de cette illustration ?",
    "answers": [
      "L’Orbe immatériel",
      "La Rune antique",
      "Le Sceau brisé",
      "L’Avènement des Divins"
    ],
    "correct": 2,
    "explanation": "Il s’agit du « Sceau brisé », disponible dans le Starter Deck du même nom.",
    "image": "images/quizz/Sceau_brisé_sans_nom(1).png"
  },
  {
    "id": 6,
    "question": "Un Sbire sans cercle de statistique d’Energy peut-il être invoqué gratuitement ?",
    "answers": [
      "Oui, il n’a pas d’Energy.",
      "Oui, seulement si l’effet le mentionne.",
      "Non, généralement il faut remplir la condition indiquée dans son texte d’effet.",
      "On paie l’Energy de son choix."
    ],
    "correct": 2,
    "explanation": "Généralement, il faut remplir la condition indiquée dans le texte d’effet, qu’il s’agisse d’un effet de carte ou d’un moment précis."
  },
  {
    "id": 7,
    "question": "Mon Sbire possède la faculté « Intangible », mais un Sbire adverse active un effet indiquant qu’il peut le détruire. Que se passe-t-il ?",
    "answers": [
      "S’il n’existe aucun autre effet ou faculté l’en empêchant, le Sbire est détruit.",
      "Il est Intangible et ne peut donc pas être détruit.",
      "Les effets ne l’affectent pas.",
      "Le joueur gagne 1 Étoile."
    ],
    "correct": 0,
    "explanation": "Intangible indique que le Sbire n’est pas affecté par les cartes Pouvoir adverses. Cela ne concerne pas les effets des Sbires adverses."
  },
  {
    "id": 8,
    "question": "J’aime particulièrement une carte et je souhaite l’inclure deux fois dans mon Deck. Est-ce autorisé ?",
    "answers": [
      "Oui, sans restriction.",
      "Non, les cartes sont unitaires.",
      "Oui, mais uniquement si c’est une carte Pouvoir.",
      "Oui, uniquement en état ASTRAL."
    ],
    "correct": 1,
    "explanation": "Dans ASTRAL CARDS, les cartes sont unitaires : une même carte ne peut être présente qu’en un seul exemplaire dans un Deck."
  },
  {
    "id": 9,
    "question": "Au tour 7, en état ASTRAL, je peux effectuer 3 actions principales. Puis-je activer 3 cartes Pouvoir depuis ma Main durant ce tour ?",
    "answers": [
      "Oui.",
      "Non, un même type d’action ne peut être effectué que 2 fois maximum par tour.",
      "Oui, mais uniquement si je possède au moins une Cosmique dans ma Main.",
      "Non, sauf si mon Navigateur possède tous ses PV."
    ],
    "correct": 1,
    "explanation": "En état ASTRAL, le joueur possède une troisième action principale, mais il ne peut effectuer que deux fois le même type d’action : par exemple 2 Pouvoirs et 1 invocation, ou l’inverse."
  },
  {
    "id": 10,
    "question": "Quelle est la valeur de la statistique de Puissance de ce Sbire ?",
    "answers": [
      "5 points",
      "3 points",
      "7 points",
      "4 points"
    ],
    "correct": 3,
    "explanation": "La statistique de Puissance de Roxxor aux Écailles — Démononuageux est de 4 points.",
    "image": "images/quizz/Roxxor_aux_écailles_-_Démononuageux_quizz.png"
  },
  {
    "id": 11,
    "question": "Un effet indique : « Annulez les effets d’un Sbire sur le Terrain de votre adversaire. » Je détruis ensuite ce Sbire au combat, alors qu’il possède la faculté Retour. Celle-ci est-elle annulée ?",
    "answers": [
      "Oui, car annuler les effets annule également les facultés.",
      "Non, la faculté Retour fonctionne normalement.",
      "Non, mais uniquement à partir du tour 7.",
      "Oui, car Retour ne fonctionne que si la carte est détruite autrement que par un combat."
    ],
    "correct": 1,
    "explanation": "Les Effets et les Facultés sont dissociés. Annuler les effets n’annule pas les facultés, et inversement."
  },
  {
    "id": 12,
    "question": "Comment distingue-t-on officiellement, visuellement, un Navigateur de base de sa version ASTRAL ?",
    "answers": [
      "Grâce à la flèche située à côté du type de la carte, ainsi que dans les crédits.",
      "Grâce à son illustration, plus imposante.",
      "Grâce à son effet, généralement plus puissant.",
      "Grâce à ses statistiques plus élevées."
    ],
    "correct": 0,
    "explanation": "Même si les illustrations peuvent aider, la distinction officielle se fait grâce à la flèche basse ou haute à côté du type de la carte et dans les crédits, à côté du numéro de collection."
  },
  {
    "id": 13,
    "question": "Quelle est l’erreur de gameplay présente sur cette carte ?",
    "answers": [
      "Son effet n’est pas conforme.",
      "Ses statistiques sont incorrectes.",
      "La couleur de la carte.",
      "Il ne possède pas la faculté Retour en temps normal."
    ],
    "correct": 2,
    "explanation": "La couleur violette est associée aux cartes Pouvoir. Imir étant un Sbire, c’était la véritable erreur.",
    "image": "images/quizz/Imir_lassassin_fidèle_de_lépine_quizz.png"
  }
];

const startScreen = document.getElementById("quiz-start");
const gameScreen = document.getElementById("quiz-game");
const resultScreen = document.getElementById("quiz-result");
const startButton = document.getElementById("start-quiz");
const restartButton = document.getElementById("restart-quiz");
const nextButton = document.getElementById("next-question");
const questionCounter = document.getElementById("question-counter");
const scoreCounter = document.getElementById("score-counter");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const explanation = document.getElementById("explanation");
const imageWrap = document.getElementById("question-image-wrap");
const questionImage = document.getElementById("question-image");
const finalScore = document.getElementById("final-score");
const finalRank = document.getElementById("final-rank");
const finalMessage = document.getElementById("final-message");

let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  selectedQuestions = shuffle(QUESTIONS).slice(0, QUESTION_COUNT);
  currentIndex = 0;
  score = 0;
  startScreen.hidden = true;
  resultScreen.hidden = true;
  gameScreen.hidden = false;
  showQuestion();
}

function showQuestion() {
  answered = false;
  feedback.hidden = true;
  nextButton.hidden = true;
  answersBox.innerHTML = "";

  const item = selectedQuestions[currentIndex];
  questionCounter.textContent = `Question ${currentIndex + 1} / ${QUESTION_COUNT}`;
  scoreCounter.textContent = `Score : ${score}`;
  progressBar.style.width = `${((currentIndex + 1) / QUESTION_COUNT) * 100}%`;
  questionText.textContent = item.question;

  if (item.image) {
    questionImage.src = item.image;
    questionImage.alt = `Illustration de la question ${currentIndex + 1}`;
    imageWrap.hidden = false;
  } else {
    imageWrap.hidden = true;
    questionImage.removeAttribute("src");
  }

  const choices = item.answers.map((text, originalIndex) => ({ text, originalIndex }));
  shuffle(choices).forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-answer";
    button.textContent = choice.text;
    button.dataset.originalIndex = String(choice.originalIndex);
    button.addEventListener("click", () => selectAnswer(button, item));
    answersBox.appendChild(button);
  });
}

function selectAnswer(selectedButton, item) {
  if (answered) return;
  answered = true;
  const chosenIndex = Number(selectedButton.dataset.originalIndex);
  const isCorrect = chosenIndex === item.correct;
  if (isCorrect) score += 1;

  [...answersBox.querySelectorAll(".quiz-answer")].forEach((button) => {
    button.disabled = true;
    const index = Number(button.dataset.originalIndex);
    if (index === item.correct) button.classList.add("correct");
  });
  if (!isCorrect) selectedButton.classList.add("wrong");

  scoreCounter.textContent = `Score : ${score}`;
  feedbackTitle.textContent = isCorrect ? "Bonne réponse !" : "Mauvaise réponse.";
  explanation.textContent = item.explanation;
  feedback.hidden = false;
  nextButton.textContent = currentIndex === QUESTION_COUNT - 1 ? "Voir mon résultat" : "Question suivante";
  nextButton.hidden = false;
}

function getResult(scoreValue) {
  if (scoreValue < 3) return { rank: "Apprenti", message: "Les étoiles sont encore lointaines, mais chaque partie vous rapproche de leur maîtrise." };
  if (scoreValue < 5) return { rank: "Combattant confirmé", message: "Vous connaissez déjà de solides bases d’ASTRAL CARDS." };
  if (scoreValue < 10) return { rank: "Général de guerre", message: "Votre maîtrise des règles et des cartes fait de vous un adversaire redoutable." };
  return { rank: "Navigateur ASTRAL", message: "Score parfait : les astres s’alignent sous votre commandement." };
}

function showResult() {
  gameScreen.hidden = true;
  resultScreen.hidden = false;
  const result = getResult(score);
  finalScore.textContent = `${score}/${QUESTION_COUNT}`;
  finalRank.textContent = result.rank;
  finalMessage.textContent = result.message;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  currentIndex += 1;
  if (currentIndex >= QUESTION_COUNT) showResult();
  else showQuestion();
});
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
