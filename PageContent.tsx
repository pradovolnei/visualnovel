// PageContent.ts

const getPageContent = (pageId: number) => {
    switch (pageId) {
      case 0:
        return {
          backgroundImage: require('./images/choice1.png'),
          text: 'Escolha uma opção:',
          choices: [
            { id: 1, text: 'Opção 1', image: require('./images/choice1.png') },
            { id: 2, text: 'Opção 2', image: require('./images/choice2.png') },
          ],
        };
      case 1:
        return {
          backgroundImage: require('./images/choice1.png'),
          text: 'Você escolheu a opção 1. Este é o texto da opção 1.',
          choices: [
            { id: 2, text: 'Próxima página', image: require('./images/next.png') },
          ],
        };
      case 2:
        return {
          backgroundImage: require('./images/choice1.png'),
          text: 'Você escolheu a opção 2. Este é o texto da opção 2.',
          choices: [
            { id: 3, text: 'Próxima página', image: require('./images/next.png') },
          ],
        };
      case 3:
        return {
          backgroundImage: require('./images/choice2.png'),
          text: 'Fim do jogo. Obrigado por jogar!',
          choices: [{ id: 4, text: 'Reiniciar o jogo' }],
        };
      case 5:
        return {
          backgroundImage: require('./images/choice2.png'),
          text: 'Fim do jogo. Obrigado por jogar!',
          choices: [{ id: 4, text: 'Reiniciar o jogo2' }],
        };
      default:
        return null;
    }
  };
  
  export default getPageContent;
  