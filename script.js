const discoveries = [
  {
    category: "Astronomy",
    title: "The Sun",
    fact: "The Sun is about 4.6 billion years old.",
    importance: "Learning about the Sun helps scientists understand how stars change over time.",
    experiment: "Make a simple drawing showing how Earth, the Moon, and the Sun line up during an eclipse.",
    link: "https://science.nasa.gov/sun/"
  },
  {
    category: "Astronomy",
    title: "Black Holes",
    fact: "A black hole is a region of space where gravity is so strong that light cannot escape.",
    importance: "Studying black holes helps scientists investigate gravity and the structure of the universe.",
    experiment: "Use a stretched piece of fabric and a small ball to model how an object can curve a surface.",
    link: "https://science.nasa.gov/universe/black-holes/"
  },
  {
    category: "Biology",
    title: "DNA",
    fact: "DNA carries genetic instructions used in the growth and development of living things.",
    importance: "Understanding DNA helps scientists study inheritance and how living things are related.",
    experiment: "Draw a twisted ladder to represent DNA’s double-helix shape.",
    link: "https://medlineplus.gov/genetics/understanding/basics/dna/"
  },
  {
    category: "Biology",
    title: "Photosynthesis",
    fact: "Plants use light energy, water, and carbon dioxide to make sugars.",
    importance: "Photosynthesis provides food for plants and helps support many food chains.",
    experiment: "Observe how a plant changes over time in a bright spot. Ask an adult before handling plants.",
    link: "https://www.khanacademy.org/science/biology/photosynthesis-in-plants"
  },
  {
    category: "Chemistry",
    title: "Water",
    fact: "Water molecules are polar, which helps water dissolve many substances.",
    importance: "Water’s properties are important for many natural processes and living things.",
    experiment: "With an adult’s help, test whether sugar and sand dissolve in separate cups of water.",
    link: "https://www.usgs.gov/special-topics/water-science-school/science/water-properties"
  },
  {
    category: "Physics",
    title: "Light",
    fact: "Light can show both wave-like and particle-like behavior.",
    importance: "Understanding light helps explain technologies such as cameras, lasers, and solar panels.",
    experiment: "Shine a flashlight at a wall, then place a safe, transparent object in its path and observe the light.",
    link: "https://science.nasa.gov/ems/02_anatomy/"
  },
  {
    category: "Earth Science",
    title: "Earth's Atmosphere",
    fact: "Earth’s atmosphere is a layer of gases surrounding the planet.",
    importance: "The atmosphere helps regulate temperature and is essential for life as we know it.",
    experiment: "Compare how quickly a dark and a light piece of paper warm in sunlight. Ask an adult for help.",
    link: "https://climate.nasa.gov/news/2919/the-atmosphere-getting-a-handle-on-carbon-dioxide/"
  }
];

const quizQuestions = [
  {
    question: "Which science studies stars, planets, and other objects in space?",
    options: ["Biology", "Astronomy", "Chemistry", "Botany"],
    answer: "Astronomy",
    explanation: "Astronomy is the study of objects and events in space."
  },
  {
    question: "What do plants use to help make sugars during photosynthesis?",
    options: ["Light energy", "Plastic", "Sound", "Sand"],
    answer: "Light energy",
    explanation: "Plants use light energy, water, and carbon dioxide to make sugars."
  },
  {
    question: "What carries genetic instructions in living things?",
    options: ["DNA", "Clouds", "Sunlight", "Rock"],
    answer: "DNA",
    explanation: "DNA carries genetic instructions used by living things."
  },
  {
    question: "What is a black hole known for?",
    options: [
      "Having very strong gravity",
      "Being a type of cloud",
      "Making its own planets",
      "Being made of water"
    ],
    answer: "Having very strong gravity",
    explanation: "A black hole’s gravity is so strong that light cannot escape from it."
  }
];

const searchInput = document.getElementById("searchInput");
const generateBtn = document.getElementById("generateBtn");
const categoryButtons = document.getElementById("categoryButtons");

const topicName = document.getElementById("topicName");
const factText = document.getElementById("factText");
const importanceText = document.getElementById("importanceText");
const experimentText = document.getElementById("experimentText");
const learnMoreLink = document.getElementById("learnMoreLink");

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

const categories = ["All", ...new Set(discoveries.map(item => item.category))];

let currentCategory = "All";
let currentQuizIndex = 0;

function getFilteredDiscoveries() {
  const query = searchInput.value.trim().toLowerCase();

  return discoveries.filter(item => {
    const matchesCategory =
      currentCategory === "All" || item.category === currentCategory;

    const searchableText = [
      item.title,
      item.category,
      item.fact,
      item.importance
    ].join(" ").toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });
}

function displayDiscovery(item) {
  topicName.textContent = item.title;
  factText.textContent = item.fact;
  importanceText.textContent = item.importance;
  experimentText.textContent = item.experiment;

  learnMoreLink.href = item.link;
  learnMoreLink.textContent = "Learn more";
 Text.textContent = "Try another search or choose a different category.";
  importanceText.textContent = "";
  experimentText.textContent = "";

  learnMoreLink.removeAttribute("href");
  learnMoreLink.hidden = true;
}

function showRandomDiscovery() {
  const matches = getFilteredDiscoveries();

  if (matches.length === 0) {
    displayNoResults();
    return;
  }

  const randomIndex = Math.floor(Math.random() * matches.length);
  displayDiscovery(matches[randomIndex]);
}

function showFirstMatch() {
  const matches = getFilteredDiscoveries();

  if (matches.length === 0) {
    displayNoResults();
    return;
  }

  displayDiscovery(matches[0]);
}

function renderCategoryButtons() {
  categoryButtons.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.className = "category-btn";

    if (category === currentCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentCategory = category;
      renderCategoryButtons();
      showFirstMatch();
    });

    categoryButtons.appendChild(button);
  });
}

function renderQuiz() {
  const question = quizQuestions[currentQuizIndex];

  quizQuestion.textContent = question.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";

  question.options.forEach(option => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      const isCorrect = option === question.answer;

      quizOptions.querySelectorAll("button").forEach(optionButton => {
        optionButton.disabled = true;
      });

      if (isCorrect) {
        quizFeedback.textContent = `Correct! ${question.explanation}`;
        quizFeedback.classList.add("success");
      } else {
        quizFeedback.textContent = `Not quite. ${question.explanation}`;
        quizFeedback.classList.add("warning");
      }
    });

    quizOptions.appendChild(button);
  });
}

generateBtn.addEventListener("click", showRandomDiscovery);
searchInput.addEventListener("input", showFirstMatch);

nextQuestionBtn.addEventListener("click", () => {
  currentQuizIndex = (currentQuizIndex + 1) % quizQuestions.length;
  renderQuiz();
});

renderCategoryButtons();
renderQuiz();
showRandomDiscovery();