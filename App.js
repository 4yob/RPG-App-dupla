import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Header from "./components/header/header.js";
import AddCharacterForm from "./components/addCharacterForm/addCharacterForm.js";
import Button from "./components/button/button.js";
import { StatusBar } from "expo-status-bar";
import CharacterCard from "./components/CharacterCard/characterCard.js";
import ConfirmationModal from "./components/confirmationModal/confirmationModal.js";

export default function App() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙‍♂️ Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 },
  ]);

  const [newCharacter, setNewCharacter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [characterToRemove, setCharacterToRemove] = useState(null);

  function addCharacter() {
    if (newCharacter === "") return;

    const newId = characters.length + 1;

    const newCharacterObj = {
      id: newId,
      name: newCharacter,
      recruited: 0,
    };

    const newList = [newCharacterObj];
    const allCharacters = newList.concat(characters);

    setCharacters(allCharacters);
    setNewCharacter("");
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
    setCharacterToRemove(character);
    setModalVisible(true);
  }

  function confirmRemove() {
    if (characterToRemove) {
      const newList = characters.filter(char => char.id !== characterToRemove.id);
      setCharacters(newList);
    }
    setCharacterToRemove(null);
    setModalVisible(false);
  }

  function cancelRemove() {
    setModalVisible(false);
    setCharacterToRemove(null);
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
        <Button text="⚔️" onPress={addCharacter} />
      </View>

      <CharacterCard
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCharacter}
      />

      <ConfirmationModal
        visible={modalVisible}
        character={characterToRemove}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A0E0A",
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
    backgroundColor: "#2C1810",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#58180D",
  },
  characterRecruited: {
    backgroundColor: "#58180D",
    borderColor: "#E69A28",
    borderWidth: 2,
  },
  characterText: {
    flex: 1,
    fontSize: 16,
    color: "#F4E4BC",
    fontWeight: "500",
  },
  characterRecruitedText: {
    color: "#E69A28",
    fontWeight: "bold",
  },
  status: {
    fontSize: 20,
    marginLeft: 10,
  },
});
