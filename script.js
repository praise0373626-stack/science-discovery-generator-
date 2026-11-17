const discoveries = [
  {
    topic: "Astronomy",
    fact: "The Sun is about 4.6 billion years old.",
    importance: "Studying the Sun helps us understand how stars form and evolve.",
    experiment: "Build a scale model of the Earth-Moon-Sun system to compare distances."
  },
  {
    topic: "Biology",
    fact: "Some plants can communicate with each other through chemical signals in the soil.",
    importance: "This helps scientists understand ecosystems and plant survival.",
    experiment: "Grow two sets of plants with different amounts of water and compare their growth."
  },
  {
    topic: "Physics",
    fact: "Light can behave like both a wave and a particle.",
    importance: "This idea is essential to modern technology like lasers and solar panels.",
    experiment: "Use a flashlight and different materials to explore how light changes direction."
  },
  {
    topic: "Chemistry",
    fact: "Water is a polar molecule, which is why it dissolves many substances.",
    importance: "This helps explain how life processes and chemical reactions work.",
    experiment: "Test which materials dissolve best in water."
  },
  {
    topic: "Earth Science",
    fact: "The Earth’s atmosphere protects life by filtering harmful solar radiation.",
    importance: "Understanding the atmosphere is important for climate science and weather forecasting.",
    experiment: "Compare how sunlight warms dark and light surfaces."
  }
];

const button = document.getElementById("generateBtn");
const topicName = document.getElementById("topicName");
const factText = document.getElementById("factText");
const importanceText = document.getElementById("importanceText");
const experimentText = document.getElementById("experimentText");

button.addEventListener("click", () => {
  const item = discoveries[Math.floor(Math.random() * discoveries.length)];
  topicName.textContent = item.topic;
  factText.textContent = item.fact;
  importanceText.textContent = item.importance;
  experimentText.textContent = item.experiment;
});