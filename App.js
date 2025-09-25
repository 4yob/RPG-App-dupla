import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import Header from "./components/header/Header.js";
import AddCharacterForm from "./components/addCharacterForm/addCharacterForm.js";
import Button from "./components/button/button.js";
import { StatusBar } from "expo-status-bar";
import CharacterCard from "./components/CharacterCard/page.js";

export default function App() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙‍♂️ Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 },
  ]);

  const [newCharacter, setNewCharacter] = useState("");

  function addCharacter() {
    if (newCharacter === "") return;

    const nomePersonagem = newCharacter;
    const newId = characters.length + 1;

    const newCharacterObj = {
      id: newId,
      name: nomePersonagem,
      recruited: 0,
    };

    const newList = [newCharacterObj];
    const allCharacters = newList.concat(characters);

    setCharacters(allCharacters);
    setNewCharacter("");
    Toast.show(`Personagem "${nomePersonagem}" adicionado!`, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
  });
  }

  function toggleRecruit(character) {
    const newCharacters = [];

    for (let i = 0; i < characters.length; i++) {
      const currentChar = characters[i];

      if (currentChar.id === character.id) {
        const newStatus = currentChar.recruited ? 0 : 1;
        newCharacters.push({
          id: currentChar.id,
          name: currentChar.name,
          recruited: newStatus,
        });
      } else {
        newCharacters.push(currentChar);
      }
    }

    setCharacters(newCharacters);
  }

  function removeCharacter(character) {
    Alert.alert("Remover Personagem", `Remover "${character.name}" da party?`, [
      { text: "Cancelar" },
      {
        text: "Remover",
        onPress: () => {
          const newList = [];
          for (let i = 0; i < characters.length; i++) {
            if (characters[i].id !== character.id) {
              newList.push(characters[i]);
            }
          }
          setCharacters(newList);
        },
      },
    ]);
  }

  function renderCharacter({ item }) {
    return (
      <TouchableOpacity
        style={[styles.character, item.recruited && styles.characterRecruited]}
        onPress={() => toggleRecruit(item)}
        onLongPress={() => removeCharacter(item)}
      >
        <Text
          style={[
            styles.characterText,
            item.recruited && styles.characterRecruitedText,
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.status}>{item.recruited ? "⭐" : "💤"}</Text>
      </TouchableOpacity>
    );
  }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <Header
          title="🏰 Minha Party RPG"
          subtitle="⭐ Recrutado • 💤 Disponível • Segure para remover"
        />

        <View style={styles.inputRow}>
          <AddCharacterForm
            placeholder="🎭 Nome do novo personagem"
            value={newCharacter}
            onChangeText={setNewCharacter}
            onSubmitEditing={addCharacter}
          />
          <Button text="⚔️" onPress={addCharacter}/>
        </View>

        <CharacterCard
          data={characters}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCharacter}
        />

      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#050A30",
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20
    },
    inputRow: {
      flexDirection: "row",
      marginBottom: 20,
    },
    list: {
      flex: 1,
    },
    character: {
      backgroundColor: "#BFD7ED",
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#0C2D48",
    },
    characterRecruited: {
      backgroundColor: "#145DA0",
      borderColor: "#0C2D48",
      borderWidth: 2,
    },
    characterText: {
      flex: 1,
      fontSize: 16,
      color: "#000000ff",
      fontWeight: "500",
    },
    characterRecruitedText: {
      color: "#ffffffff",
      fontWeight: "bold",
    },
    status: {
      fontSize: 20,
      marginLeft: 10,
    },
  });
