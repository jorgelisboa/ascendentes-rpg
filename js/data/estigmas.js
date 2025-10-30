/**
 * js/data/estigmas.js
 * 
 * Contém os dados dos estigmas (defeitos) disponíveis para a criação de personagem.
 */
const ESTIGMAS_DATA = {
    'Identidade Secreta': { bonusPP: 5, descricao: 'Sua vida dupla causa complicações e exige constante malabarismo entre seus dois mundos.' },
    'Vulnerabilidade (Fogo)': { bonusPP: 10, descricao: 'Recebe 50% a mais de dano de fogo. Chamas são seu pior pesadelo.' },
    'Incontrolável': { bonusPP: 15, descricao: 'Seu poder principal pode falhar em momentos de estresse extremo, com consequências imprevisíveis.' },
    'Código de Honra': { bonusPP: 5, descricao: 'Você segue um código de ética rigoroso (como não mentir, não atacar inimigos indefesos). Violá-lo causa penalidade de -2 em todos os testes por uma cena.' },
    'Aparência Estranha': { bonusPP: 5, descricao: 'Uma característica física incomum faz com que NPCs te tratem com cautela ou suspeita. Desvantagem em testes sociais com estranhos.' },
    'Claustrofobia': { bonusPP: 5, descricao: 'Medo de espaços pequenos. Em ambiente fechado, teste de Vontade (CD 12) para ações complexas.' },
    'Incapaz de Mentir': { bonusPP: 5, descricao: 'Você não consegue mentir. Se tentar, teste de Vontade (CD 15) ou fica Atordoado por uma rodada.' },
    'Inseguro': { bonusPP: 5, descricao: 'Tique nervoso sob pressão (gagueira, tremores). Desvantagem em testes de Persuasão e Intimidação.' },
    'Fragilidade Emocional': { bonusPP: 10, descricao: 'Vulnerável a ataques mentais e de emoção. Desvantagem em resistência contra esses efeitos.' },
    'Alimentação Exótica': { bonusPP: 10, descricao: 'Sua fisiologia exige alimentação específica (energia solar, metal). Não consumir causa Fadiga/Exaustão.' },
    'Fama Indesejada': { bonusPP: 10, descricao: 'Famoso por um crime não cometido ou algo condenável. Autoridades te procuram, NPCs te reconhecem.' },
    'Vulnerável a um Sentido': { bonusPP: 10, descricao: 'Um sentido é sobre-sensível. Ruídos altos, luzes intensas ou cheiros fortes causam dor, deixando-o Vulnerável e Atordoado.' },
    'Tecnofobia': { bonusPP: 10, descricao: 'Não consegue usar tecnologia de forma eficiente. Testes com equipamentos tecnológicos complexos são feitos com desvantagem.' },
    'Maldição da Besta': { bonusPP: 20, descricao: 'Forma monstruosa incontrolável. Em estresse, teste de Vontade (CD 15) ou transforma-se, atacando o alvo mais próximo e perdendo a consciência por 1d4 rodadas.' },
    'Poder Instável': { bonusPP: 20, descricao: 'Seu poder é imprevisível. Em um d20 de 1, causa o dobro de dano em você ou tem efeito oposto.' },
    'Nêmesis': { bonusPP: 20, descricao: 'Rival ou Organização fixa obcecada em te perseguir. O Mestre pode colocá-lo em qualquer cena para causar problemas.' },
    'Fraqueza Letal (Kryptonita)': { bonusPP: 20, descricao: 'Material/substância específica anula seus poderes. Perto dela, poderes param e HP reduz pela metade. Em contato, Incapacitado e pode morrer. Vulnerável a dano de armas feitas dela.' }
};
