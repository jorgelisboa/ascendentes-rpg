// Character Management
class CharacterManager {
  constructor() {
    this.storageKey = "characters-sheet";
    this.init();
  }

  init() {
    this.loadCharacters();
    this.setupEventListeners();
  }

  loadCharacters() {
    const characters = this.getStoredCharacters();
    const grid = document.getElementById("characters-grid");

    // Clear existing character cards (except the "Create New" card)
    const existingCards = grid.querySelectorAll(
      ".character-card:not(.new-character)"
    );
    existingCards.forEach((card) => card.remove());

    // Add character cards
    characters.forEach((character) => {
      const card = this.createCharacterCard(character);
      grid.appendChild(card);
    });
  }

  getStoredCharacters() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  createCharacterCard(character) {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
            <div class="hero-portrait">
                <img src="${
                  character.portrait || "images/default-hero.png"
                }" alt="${character.name}">
            </div>
            <div class="character-info">
                <h3 class="hero-name">${character.name}</h3>
                <div class="hero-origin">${character.origin}</div>
                <div class="hero-stats">
                    <div>Força: ${character.attributes?.strength || "-"}</div>
                    <div>Destreza: ${
                      character.attributes?.dexterity || "-"
                    }</div>
                    <div>Poderes: ${character.powers?.length || 0}</div>
                    <div>Equipamentos: ${character.equipment?.length || 0}</div>
                </div>
            </div>
        `;

    card.addEventListener("click", () => this.openCharacterSheet(character));
    return card;
  }

  setupEventListeners() {
    const createButton = document.getElementById("create-hero");
    if (createButton) {
      createButton.addEventListener("click", () => this.openCharacterSheet());
    }
  }

  openCharacterSheet(character = null) {
    // Save the current character in session storage if editing
    if (character) {
      sessionStorage.setItem("editing-character", JSON.stringify(character));
    } else {
      sessionStorage.removeItem("editing-character");
    }

    // Redirect to the character creation/edit page
    window.location.href = "character-form.html";
  }
}

// Initialize the character manager when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new CharacterManager();
});
