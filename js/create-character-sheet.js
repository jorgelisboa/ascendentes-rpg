document.addEventListener('DOMContentLoaded', () => {
    const stepContainer = document.getElementById('step-container');
    const prevStepBtn = document.getElementById('prev-step');
    const nextStepBtn = document.getElementById('next-step');

    let currentStep = 0;
    const characterSheet = loadCharacterSheet() || {};

    const steps = [
        { id: 'basic-info', path: 'components/step-basic-info.html', title: 'Informações Básicas' },
        { id: 'attributes', path: 'components/step-attributes.html', title: 'Atributos' },
        { id: 'hp-ph-pp', path: 'components/step-hp-ph.html', title: 'HP, PH e PP' },
        // Adicionar mais passos aqui
    ];

    function loadCharacterSheet() {
        const savedSheet = localStorage.getItem('currentCharacterSheet');
        return savedSheet ? JSON.parse(savedSheet) : {};
    }

    function saveCharacterSheet() {
        localStorage.setItem('currentCharacterSheet', JSON.stringify(characterSheet));
    }

    async function loadStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= steps.length) return;

        currentStep = stepIndex;
        const step = steps[currentStep];

        try {
            const response = await fetch(step.path);
            const html = await response.text();
            stepContainer.innerHTML = `<div class="step-content" data-step-id="${step.id}">${html}</div>`;
            document.querySelector('h1').textContent = `Criar Novo Herói - ${step.title}`;
            updateNavigationButtons();
            initializeStepLogic(step.id);
        } catch (error) {
            console.error('Error loading step:', error);
            stepContainer.innerHTML = `<p>Erro ao carregar a etapa: ${step.title}</p>`;
        }
    }

    function updateNavigationButtons() {
        prevStepBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
        nextStepBtn.textContent = currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo';
    }

    function initializeStepLogic(stepId) {
        // This function will be expanded to handle specific logic for each step
        switch (stepId) {
            case 'basic-info':
                const charNameInput = stepContainer.querySelector('#character-name');
                const heroNameInput = stepContainer.querySelector('#hero-name');

                if (characterSheet.name) charNameInput.value = characterSheet.name;
                if (characterSheet.heroName) heroNameInput.value = characterSheet.heroName;

                charNameInput.addEventListener('input', (e) => { characterSheet.name = e.target.value; saveCharacterSheet(); });
                heroNameInput.addEventListener('input', (e) => { characterSheet.heroName = e.target.value; saveCharacterSheet(); });
                break;
            case 'attributes':
                // Logic for attributes step
                const ppDisplay = stepContainer.querySelector('#pp-remaining');
                const attributeInputs = stepContainer.querySelectorAll('.attribute-input');

                if (!characterSheet.pp) characterSheet.pp = 50; // Initial PP
                ppDisplay.textContent = characterSheet.pp;

                attributeInputs.forEach(input => {
                    const attr = input.dataset.attribute;
                    if (characterSheet.attributes && characterSheet.attributes[attr]) {
                        input.value = characterSheet.attributes[attr];
                    } else {
                        input.value = 0;
                    }

                    input.addEventListener('input', (e) => {
                        let value = parseInt(e.target.value) || 0;
                        if (value < 0) value = 0;
                        // Max limit for level 1-5 is 6
                        if (value > 6) value = 6;
                        e.target.value = value;

                        if (!characterSheet.attributes) characterSheet.attributes = {};
                        characterSheet.attributes[attr] = value;
                        updatePP();
                        saveCharacterSheet();
                    });
                });

                function updatePP() {
                    let spentPP = 0;
                    attributeInputs.forEach(input => {
                        spentPP += (parseInt(input.value) || 0) * 2;
                    });
                    characterSheet.pp = 50 - spentPP;
                    ppDisplay.textContent = characterSheet.pp;
                }
                updatePP(); // Initial PP update
                break;
            case 'hp-ph-pp':
                // Logic for HP, PH, PP step
                const hpCategorySelect = stepContainer.querySelector('#hp-category');
                const phCategorySelect = stepContainer.querySelector('#ph-category');
                const currentHpDisplay = stepContainer.querySelector('#current-hp');
                const maxHpDisplay = stepContainer.querySelector('#max-hp');
                const currentPhDisplay = stepContainer.querySelector('#current-ph');
                const maxPhDisplay = stepContainer.querySelector('#max-ph');

                // Ensure attributes are initialized for calculations
                const vigor = characterSheet.attributes?.VIG || 0;
                const intellect = characterSheet.attributes?.INT || 0;

                const hpCategories = {
                    'standard': { base: 10, ppCost: 0, minCon: 0 },
                    '10pp': { base: 15, ppCost: 10, minCon: 1 },
                    '20pp': { base: 20, ppCost: 20, minCon: 5 }
                };

                const phCategories = {
                    'standard': { base: 10, ppCost: 0, minInt: 0 },
                    '10pp': { base: 15, ppCost: 10, minInt: 1 },
                    '20pp': { base: 20, ppCost: 20, minInt: 5 }
                };

                function calculateHP() {
                    const selectedCategory = hpCategorySelect.value;
                    const category = hpCategories[selectedCategory];
                    if (category) {
                        const hp = category.base + vigor;
                        currentHpDisplay.textContent = hp;
                        maxHpDisplay.textContent = hp;
                        characterSheet.hp = { current: hp, max: hp, category: selectedCategory };
                        saveCharacterSheet();
                    }
                }

                function calculatePH() {
                    const selectedCategory = phCategorySelect.value;
                    const category = phCategories[selectedCategory];
                    if (category) {
                        const ph = category.base + intellect;
                        currentPhDisplay.textContent = ph;
                        maxPhDisplay.textContent = ph;
                        characterSheet.ph = { current: ph, max: ph, category: selectedCategory };
                        saveCharacterSheet();
                    }
                }

                hpCategorySelect.addEventListener('change', calculateHP);
                phCategorySelect.addEventListener('change', calculatePH);

                // Set initial values if saved
                if (characterSheet.hp?.category) hpCategorySelect.value = characterSheet.hp.category;
                if (characterSheet.ph?.category) phCategorySelect.value = characterSheet.ph.category;

                calculateHP();
                calculatePH();
                break;
        }
    }

    prevStepBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            loadStep(currentStep - 1);
        }
    });

    nextStepBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            loadStep(currentStep + 1);
        } else {
            // Finalizar criação da ficha
            const sheets = JSON.parse(localStorage.getItem('sheets') || '[]');
            sheets.push(characterSheet);
            localStorage.setItem('sheets', JSON.stringify(sheets));
            localStorage.removeItem('currentCharacterSheet'); // Limpa a ficha em progresso
            window.location.href = 'character-sheet.html'; // Redireciona para a lista de fichas
        }
    });

    // Load the first step on page load
    loadStep(0);
});