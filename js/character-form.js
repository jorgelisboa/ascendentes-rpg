/**
 * js/character-form.js
 * 
 * Lógica para o assistente de criação de personagem.
 * Gerencia o carregamento de componentes de passo e suas funcionalidades.
 */
document.addEventListener('DOMContentLoaded', () => {
    const wizardStepContainer = document.getElementById('wizard-step-container');

    /**
     * Carrega um componente de passo HTML e o insere no contêiner do wizard.
     * Após carregar, inicializa a lógica JavaScript específica para o passo.
     * @param {string} stepFile - O caminho para o arquivo HTML do componente do passo.
     */
    async function loadStep(stepFile) {
        try {
            const response = await fetch(stepFile);
            if (!response.ok) {
                throw new Error(`Could not load step: ${response.statusText}`);
            }
            const html = await response.text();
            wizardStepContainer.innerHTML = html;
            
            // Determina qual lógica JS inicializar com base no arquivo carregado
            if (stepFile === 'components/step-1-concept.html') {
                initializeStep1Logic();
            } else if (stepFile === 'components/step-2-cost.html') {
                // Carrega os arquivos de dados primeiro
                const loadScript = (src) => {
                    return new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = src;
                        script.onload = resolve;
                        script.onerror = reject;
                        document.body.appendChild(script);
                    });
                };

                await loadScript('js/data/racas.js');
                await loadScript('js/data/estigmas.js');

                // Em seguida, carrega o JS específico do passo 2
                const script = document.createElement('script');
                script.src = 'js/character-form-step2.js';
                script.onload = () => {
                    console.log('Lógica do Passo 2 carregada.');
                };
                document.body.appendChild(script);
            }

        } catch (error) {
            console.error('Failed to load wizard step:', error);
            wizardStepContainer.innerHTML = '<p>Erro ao carregar o passo de criação de personagem. Por favor, tente novamente mais tarde.</p>';
        }
    }

    /**
     * Inicializa toda a lógica JavaScript para o Passo 1 (O Conceito).
     * Esta função é chamada após o HTML do passo ser carregado dinamicamente.
     */
    function initializeStep1Logic() {
        // --- Dados para os Selects ---
        const powerOriginOptions = [
            { value: 'acidente-laboratorio', text: 'Acidente de Laboratório' },
            { value: 'mutacao-genetica', text: 'Mutação Genética' },
            { value: 'tecnologia-sucata', text: 'Tecnologia de Sucata' },
            { value: 'tecnologia-corporativa', text: 'Tecnologia Corporativa' },
            { value: 'sobrevivente-trauma', text: 'Sobrevivente de Trauma' },
            { value: 'treinamento-extremo', text: 'Treinamento Extremo' },
            { value: 'legado-familiar', text: 'Legado Familiar' },
            { value: 'experimento-vitima', text: 'Experimento (Vítima)' },
            { value: 'misticismo-acaso', text: 'Misticismo / Acaso' },
            { value: 'ex-vilao-agente', text: 'Ex-Vilão / Ex-Agente' },
            { value: 'divino-celestial', text: 'Divino / Celestial' },
            { value: 'alienigena', text: 'Alienígena' },
            { value: 'magia-ancestral', text: 'Magia Ancestral' },
            { value: 'psionico-nato', text: 'Psionico Nato' },
            { value: 'cibernetico', text: 'Cibernético' },
            { value: 'nanotecnologia', text: 'Nanotecnologia' }
        ];

        const archetypeOptions = [
            { value: 'bruto', text: 'Bruto' },
            { value: 'velocista', text: 'Velocista' },
            { value: 'especialista-tecnologia', text: 'Especialista (Tecnologia)' },
            { value: 'especialista-combate', text: 'Especialista (Combate)' },
            { value: 'elemental-blaster', text: 'Elemental / Blaster' },
            { value: 'transmorfo-mutavel', text: 'Transmorfo / Mutável' },
            { value: 'mentalista-controle', text: 'Mentalista / Controle' },
            { value: 'sombra-infiltrador', text: 'Sombra / Infiltrador' },
            { value: 'curandeiro-suporte', text: 'Curandeiro / Suporte' },
            { value: 'invocador-controlador', text: 'Invocador / Controlador' },
            { value: 'ilusionista-trapaceiro', text: 'Ilusionista / Trapaceiro' },
            { value: 'detetive-analista', text: 'Detetive / Analista' },
            { value: 'estrategista-lider', text: 'Estrategista / Líder' },
            { value: 'guerreiro-honrado', text: 'Guerreiro Honrado' }
        ];

        // --- Seleção de Elementos do DOM ---
        const btnQuickCreate = document.getElementById('btn-quick-create');
        const btnManualCreate = document.getElementById('btn-manual-create');
        const btnNextStep = document.getElementById('btn-next-step'); // Novo botão Próximo
        const heroNameInput = document.getElementById('hero-name');
        const alterEgoInput = document.getElementById('alter-ego');
        const powerOriginSelect = document.getElementById('power-origin');
        const archetypeSelect = document.getElementById('archetype');
        const ageInput = document.getElementById('age');
        const heightInput = document.getElementById('height');
        const weightInput = document.getElementById('weight');
        
        const allTextInputs = document.querySelectorAll('input[type="text"], input[type="number"]');
        const allSelects = document.querySelectorAll('select');
        const fileInput = document.getElementById('character-photo');

        // --- Funções de População de Selects ---
        const populateSelect = (selectElement, options) => {
            const defaultOption = selectElement.querySelector('option[value=""]');
            selectElement.innerHTML = ''; 
            if (defaultOption) {
                selectElement.appendChild(defaultOption);
            }
            options.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                selectElement.appendChild(option);
            });
        };

        // Popula os selects ao carregar o passo
        populateSelect(powerOriginSelect, powerOriginOptions);
        populateSelect(archetypeSelect, archetypeOptions);

        // --- Funções de Lógica ---
        const selectRandomOption = (selectElement) => {
            const optionsCount = selectElement.options.length;
            if (optionsCount > 1) {
                const randomIndex = Math.floor(Math.random() * (optionsCount - 1)) + 1;
                selectElement.selectedIndex = randomIndex;
            }
        };

        const resetForm = () => {
            allTextInputs.forEach(input => {
                input.value = '';
            });
            allSelects.forEach(select => {
                select.selectedIndex = 0;
            });
            if (fileInput) {
                fileInput.value = '';
            }
            heroNameInput.placeholder = '';
        };

        // --- Funções de Salvamento de Dados ---
        const saveStep1Data = () => {
            let characterData = JSON.parse(localStorage.getItem('current-character-creation')) || {};

            characterData.step1 = {
                heroName: heroNameInput.value,
                alterEgo: alterEgoInput.value,
                powerOrigin: powerOriginSelect.value,
                archetype: archetypeSelect.value,
                age: ageInput.value ? parseInt(ageInput.value) : null,
                height: heightInput.value ? parseInt(heightInput.value) : null,
                weight: weightInput.value ? parseInt(weightInput.value) : null,
                // A foto do personagem (file input) não é salva diretamente no localStorage por ser um arquivo.
                // Seria necessário um backend para upload ou conversão para Base64 (não recomendado para arquivos grandes).
                // Por enquanto, apenas os metadados do arquivo podem ser armazenados, se necessário.
            };

            localStorage.setItem('current-character-creation', JSON.stringify(characterData));
            console.log('Dados do Passo 1 salvos:', characterData.step1);
        };

        // --- Adição de Event Listeners ---
        if (btnQuickCreate) {
            btnQuickCreate.addEventListener('click', () => {
                resetForm();
                selectRandomOption(powerOriginSelect);
                selectRandomOption(archetypeSelect);
                heroNameInput.placeholder = '[Insira seu Nome de Herói aqui]';
                heroNameInput.focus();
            });
        }

        if (btnManualCreate) {
            btnManualCreate.addEventListener('click', () => {
                resetForm();
                heroNameInput.focus();
            });
        }

        if (btnNextStep) {
            btnNextStep.addEventListener('click', () => {
                saveStep1Data();
                loadStep('components/step-2-cost.html'); // Carrega o próximo passo
            });
        }
    }

    // Carrega o primeiro passo do wizard ao iniciar a página
    loadStep('components/step-1-concept.html');
});