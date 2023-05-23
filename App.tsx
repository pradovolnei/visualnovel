import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPart, setCurrentPart] = useState(1);
  const [gameCount, setGameCount] = useState(0);

  const story = [
    { id: 0, text: 'Texto da página 0', choices: [
      { id: 1, text: 'Opção 1', image: require('./images/choice1.png') },
      { id: 2, text: 'Opção 2', image: require('./images/choice2.png') },
    ] },
    { id: 1, text: 'Texto da página 1', choices: [
      { id: 3, text: 'Próxima página', image: require('./images/next.png') },
    ] },
    { id: 2, text: 'Texto da página 2', choices: [
      { id: 3, text: 'Próxima página', image: require('./images/next.png') },
    ] },
    { id: 3, text: 'Texto da página 3', choices: [{ id: 4, text: 'Reiniciar o jogo' }] },
    { id: 5, text: 'Texto da página 3', choices: [{ id: 4, text: 'Reiniciar o jogo2' }] },
    
  ];

  const handleChoice = (choiceId) => {
    if ( ( (currentPage === 3 && gameCount <= 33) || (currentPage === 5 && gameCount > 33) ) && choiceId === 4 ) {
      setCurrentPage(0);
      setCurrentPart(1);
      setGameCount((prevCount) => prevCount + 1); // Usando o callback para obter o valor atualizado
    } else {
      const nextPage = story.find((page) => page.id === choiceId);
      setCurrentPage(nextPage.id);
    }
  };

  useEffect(() => {
    loadGameCount();
  }, []);
  
  useEffect(() => {
    saveGameCount();
  }, [gameCount]);
  
  const loadGameCount = async () => {
    try {
      const count = await AsyncStorage.getItem('gameCount');
      if (count !== null) {
        setGameCount(JSON.parse(count));
      }
    } catch (error) {
      console.log('Error loading game count:', error);
    }
  };
  
  const saveGameCount = async () => {
    try {
      await AsyncStorage.setItem('gameCount', JSON.stringify(gameCount));
    } catch (error) {
      console.log('Error saving game count:', error);
    }
  };
  
  
  const getPageContent = (pageId) => {
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
        if(gameCount <= 33){
          return {
            backgroundImage: require('./images/choice2.png'),
            text: 'Fim do jogo. Obrigado por jogar!',
            choices: [{ id: 4, text: 'Reiniciar o jogo' }],
          };
        }else{
          return {
            backgroundImage: require('./images/choice1.png'),
            text: 'Você escolheu a opção 3. Este é o texto da opção 3.',
            choices: [
              { id: 5, text: 'Próxima página', image: require('./images/next.png') },
            ],
          };
        }
      case 5:
        return {
          backgroundImage: require('./images/choice2.png'),
          text: 'Fim do jogo. Obrigado por jogar!',
          choices: [{ id: 4, text: '' }],
        };
        
      default:
        return null;
    }
  };
  
  const currentPageContent = getPageContent(currentPage);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {currentPageContent && (
        <Image
          source={currentPageContent.backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{currentPageContent ? currentPageContent.text : ''}</Text>
      </View>
      {currentPageContent && currentPageContent.choices && currentPageContent.choices.map((choice) => (
        <TouchableOpacity key={choice.id} onPress={() => handleChoice(choice.id)}>
          <View style={styles.choiceContainer}>
            <Image source={choice.image} style={styles.choiceImage} />
            <Text style={styles.choiceText}>{choice.text}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {currentPage === 5 && (
        <Button title="Reiniciar o jogo" onPress={() => handleChoice(4)} />
      )}
      <View style={styles.gameCountContainer}>
        <Text style={styles.gameCountText}>{`Game Count: ${gameCount}`}</Text>
      </View>
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  choiceImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  choiceText: {
    fontSize: 16,
  },
  gameCountContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  gameCountText: {
    fontSize: 16,
    color: 'white',
  },
});

export default App
