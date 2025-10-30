document.addEventListener('DOMContentLoaded', () => {
    const characterDetails = document.getElementById('character-details');
    const urlParams = new URLSearchParams(window.location.search);
    const sheetId = urlParams.get('id');

    if (sheetId !== null) {
        const sheets = JSON.parse(localStorage.getItem('sheets') || '[]');
        const sheet = sheets[parseInt(sheetId)];

        if (sheet) {
            characterDetails.innerHTML = `
                <h2>${sheet.heroName || 'Herói Sem Nome'}</h2>
                <p><strong>Nome do Personagem:</strong> ${sheet.name || 'N/A'}</p>
                <p><strong>HP:</strong> ${sheet.hp?.current || 0} / ${sheet.hp?.max || 0}</p>
                <p><strong>PH:</strong> ${sheet.ph?.current || 0} / ${sheet.ph?.max || 0}</p>
                <p><strong>PP Restantes:</strong> ${sheet.pp || 0}</p>
                <h3>Atributos:</h3>
                <ul>
                    <li><strong>Força (FOR):</strong> ${sheet.attributes?.FOR || 0}</li>
                    <li><strong>Agilidade (AGI):</strong> ${sheet.attributes?.AGI || 0}</li>
                    <li><strong>Vigor (VIG):</strong> ${sheet.attributes?.VIG || 0}</li>
                    <li><strong>Intelecto (INT):</strong> ${sheet.attributes?.INT || 0}</li>
                    <li><strong>Sabedoria (SAB):</strong> ${sheet.attributes?.SAB || 0}</li>
                    <li><strong>Presença (PRE):</strong> ${sheet.attributes?.PRE || 0}</li>
                </ul>
                <!-- Adicionar mais detalhes da ficha aqui conforme forem sendo criados -->
            `;
        } else {
            characterDetails.innerHTML = '<p>Ficha não encontrada.</p>';
        }
    } else {
        characterDetails.innerHTML = '<p>ID da ficha não especificado.</p>';
    }
});