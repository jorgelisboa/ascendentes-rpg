/**
 * js/data/racas.js
 * 
 * Contém os dados das raças disponíveis para a criação de personagem.
 */
const RAÇAS_DATA = {
    'Nenhum': { bonusPP: 0, descricao: 'Nenhuma raça selecionada. Você é um humano comum sem bônus ou penalidades especiais.' },
    'Humano': { bonusPP: 5, descricao: 'Humanos são a base, definidos por sua incrível versatilidade e um potencial oculto que lhes permite alcançar o inesperado. Ganha +4 graduações gratuitas em quatro perícias diferentes à sua escolha (total de 16 graduações distribuídas).' },
    'Mutante': { bonusPP: 10, descricao: 'Você é o próximo passo na evolução humana. Uma alteração genética se manifestou durante sua vida, concedendo-lhe um poder extraordinário que o define e, muitas vezes, o isola. Ganha +10 PP extras e 4 graduações gratuitas em duas perícias à sua escolha. Pode ganhar +5 PP extras por um Estigma visível.' },
    'Alienígena': { bonusPP: 10, descricao: 'Você não é deste mundo. Sua fisiologia exótica lhe confere capacidades físicas ou mentais muito acima das de um humano comum. Ganha +7 pontos de atributo para distribuir livremente (máx. 5 por atributo) e +10 PP extras.' },
    'Criatura Mágica': { bonusPP: 10, descricao: 'Seu sangue pulsa com magia ancestral. Você pode ser um semideus, um atlante, uma fada, ou qualquer ser tocado pelo poder místico. Ganha +4 pontos de atributo para distribuir livremente entre dois atributos, Sentidos Mágicos, Resiliência Encantada (+2 em TRs mágicos) e um Dom Inato (10 PP).' },
    'Construto': { bonusPP: -5, descricao: 'Você não nasceu, foi construído — seja pela ciência ou pela magia. Sua natureza artificial lhe confere grandes vantagens e desvantagens únicas. Possui RD 5 contra concussão, imunidade a venenos/doenças/fadiga, mas não pode ser curado convencionalmente e tem Vulnerabilidade a um tipo de dano.' }
};
