/**
 * js/character-form-step2.js
 * 
 * Lógica para o Passo 2 do assistente de criação de personagem: O Custo (Definindo seu Orçamento).
 * Gerencia a seleção de raças, estigmas e o cálculo de Pontos de Poder (PP).
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Seleção de Elementos do DOM ---
    const ppTotalSpan = document.getElementById('pp-total');
    const selectRaca = document.getElementById('select-raca');
    const racaDescricaoDiv = document.getElementById('raca-descricao');
    const btnAbrirModalEstigmas = document.getElementById('btn-abrir-modal-estigmas');
    const modalEstigmasOverlay = document.getElementById('modal-estigmas-overlay');
    const modalEstigmasContent = document.getElementById('modal-estigmas-content');
    const estigmasCheckboxesFieldset = document.getElementById('estigmas-checkboxes');
    const btnFecharModalEstigmas = document.getElementById('btn-fechar-modal-estigmas');
    const estigmasListaDiv = document.getElementById('estigmas-lista');
    const sumarioRacaBonusSpan = document.getElementById('sumario-raca-bonus');
    const sumarioEstigmasBonusSpan = document.getElementById('sumario-estigmas-bonus');
    const sumarioTotalSpan = document.getElementById('sumario-total');
    const btnPreviousStep = document.getElementById('btn-previous-step');
    const btnNextStep2 = document.getElementById('btn-next-step-2');

    let selectedEstigmas = {}; // Objeto para armazenar estigmas selecionados

    // --- Funções de População e Lógica ---

    /**
     * Popula o dropdown de raças com os dados de RAÇAS_DATA.
     */
    function populateRacasDropdown() {
        for (const racaName in RAÇAS_DATA) {
            const option = document.createElement('option');
            option.value = racaName;
            option.textContent = racaName;
            selectRaca.appendChild(option);
        }
    }

    /**
     * Popula o fieldset do modal de estigmas com checkboxes.
     */
    function populateEstigmasCheckboxes() {
        estigmasCheckboxesFieldset.innerHTML = '<legend>Estigmas Disponíveis</legend>';
        for (const estigmaName in ESTIGMAS_DATA) {
            const estigma = ESTIGMAS_DATA[estigmaName];
            const div = document.createElement('div');
            div.classList.add('estigma-option');
            div.innerHTML = `
                <label>
                    <input type="checkbox" name="estigma" value="${estigmaName}">
                    ${estigmaName} (<span class="estigma-bonus">+${estigma.bonusPP} PP</span>)
                    <span class="estigma-description">${estigma.descricao}</span>
                </label>
            `;
            estigmasCheckboxesFieldset.appendChild(div);

            // Adiciona listener para cada checkbox
            div.querySelector('input[type="checkbox"]').addEventListener('change', (event) => {
                if (event.target.checked) {
                    selectedEstigmas[estigmaName] = estigma;
                } else {
                    delete selectedEstigmas[estigmaName];
                }
                atualizarPP();
            });
        }
    }

    /**
     * Atualiza todos os displays de PP e descrições com base nas seleções.
     */
    function atualizarPP() {
        let basePP = 50;
        let bonusRaca = 0;
        let bonusEstigmas = 0;

        // Calcula bônus da raça
        const selectedRacaName = selectRaca.value;
        if (selectedRacaName && RAÇAS_DATA[selectedRacaName]) {
            bonusRaca = RAÇAS_DATA[selectedRacaName].bonusPP;
            racaDescricaoDiv.innerHTML = `<p><strong>${selectedRacaName}:</strong> ${RAÇAS_DATA[selectedRacaName].descricao}</p>`;
        } else {
            racaDescricaoDiv.innerHTML = '<p>Nenhuma raça selecionada.</p>';
        }

        // Calcula bônus de estigmas (com limite de +25)
        estigmasListaDiv.innerHTML = '';
        const estigmasSelecionadosArray = Object.values(selectedEstigmas);
        if (estigmasSelecionadosArray.length > 0) {
            estigmasSelecionadosArray.forEach(estigma => {
                bonusEstigmas += estigma.bonusPP;
                estigmasListaDiv.innerHTML += `<p><strong>${Object.keys(ESTIGMAS_DATA).find(key => ESTIGMAS_DATA[key] === estigma)}:</strong> +${estigma.bonusPP} PP - ${estigma.descricao}</p>`;
            });
        } else {
            estigmasListaDiv.innerHTML = '<p>Nenhum estigma selecionado.</p>';
        }
        bonusEstigmas = Math.min(bonusEstigmas, 25); // Aplica o limite de +25 PP

        const totalPP = basePP + bonusRaca + bonusEstigmas;

        // Atualiza a UI
        ppTotalSpan.textContent = totalPP;
        sumarioRacaBonusSpan.textContent = `+${bonusRaca}`;
        sumarioEstigmasBonusSpan.textContent = `+${bonusEstigmas}`;
        sumarioTotalSpan.textContent = totalPP;

        // Salva os dados do passo 2 no localStorage
        let characterData = JSON.parse(localStorage.getItem('current-character-creation')) || {};
        characterData.step2 = {
            raca: selectedRacaName,
            bonusRaca: bonusRaca,
            estigmas: Object.keys(selectedEstigmas),
            bonusEstigmas: bonusEstigmas,
            totalPP: totalPP
        };
        localStorage.setItem('current-character-creation', JSON.stringify(characterData));
    }

    // --- Event Listeners ---

    // Raça
    selectRaca.addEventListener('change', atualizarPP);

    // Modal de Estigmas
    btnAbrirModalEstigmas.addEventListener('click', () => {
        modalEstigmasOverlay.classList.add('visible');
        // Garante que os checkboxes reflitam os estigmas já selecionados
        estigmasCheckboxesFieldset.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = selectedEstigmas.hasOwnProperty(checkbox.value);
        });
    });

    btnFecharModalEstigmas.addEventListener('click', () => {
        modalEstigmasOverlay.classList.remove('visible');
    });

    // Fechar modal clicando fora do conteúdo
    modalEstigmasOverlay.addEventListener('click', (event) => {
        if (event.target === modalEstigmasOverlay) {
            modalEstigmasOverlay.classList.remove('visible');
        }
    });

    // --- Inicialização ---
    populateRacasDropdown();
    populateEstigmasCheckboxes();
    atualizarPP(); // Calcula e exibe os PPs iniciais

    // --- Navegação entre passos (apenas para demonstração, a lógica real estaria no character-form.js) ---
    btnPreviousStep.addEventListener('click', () => {
        // Lógica para voltar ao passo 1
        // loadStep('components/step-1-concept.html'); // Exemplo
        console.log('Voltar ao passo anterior (implementar navegação)');
    });

    btnNextStep2.addEventListener('click', () => {
        // Lógica para ir ao próximo passo
        console.log('Ir para o próximo passo (implementar navegação)');
    });
});