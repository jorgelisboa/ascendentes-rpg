document.addEventListener('DOMContentLoaded', () => {
    const sheetGrid = document.querySelector('.sheet-grid');

    function loadCharacterSheets() {
        const sheets = JSON.parse(localStorage.getItem('sheets') || '[]');
        
        // Clear existing sheets, keeping the create new sheet card
        const createCard = sheetGrid.querySelector('.create-sheet-card');
        sheetGrid.innerHTML = '';
        sheetGrid.appendChild(createCard);

        if (sheets.length > 0) {
            sheets.forEach((sheet, index) => {
                const card = document.createElement('a');
                card.href = `view-character-sheet.html?id=${index}`;
                card.classList.add('character-card');
                card.innerHTML = `
                    <h3>${sheet.heroName || 'Herói Sem Nome'}</h3>
                    <p>${sheet.name || 'Personagem Desconhecido'}</p>
                    <div class="card-footer">
                        <p>HP: ${sheet.hp?.current || 0}/${sheet.hp?.max || 0}</p>
                        <p>PH: ${sheet.ph?.current || 0}/${sheet.ph?.max || 0}</p>
                    </div>
                `;
                sheetGrid.appendChild(card);
            });
        }
    }

    loadCharacterSheets();
});