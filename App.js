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
  const [filter, setFilter] = useState("all");

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

  function getRecruitedCharacters() {
    if (filter === "recruited") {
      return characters.filter(character => character.recruited === 1);
    } else if (filter === "available") {
      return characters.filter(character => character.recruited === 0);
    }
    return characters;
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

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
          onPress={() => setFilter("all")}
          >
            <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
              🎭 Todos
            </Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "recruited" && styles.filterButtonActive]}
          onPress={() => setFilter("recruited")}
          >
            <Text style={[styles.filterText, filter === "recruited" && styles.filterTextActive]}>
              ⭐ Recrutados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={[styles.filterButton, filter === "available" && styles.filterButtonActive]}
          onPress={() => setFilter("available")}
          >
            <Text style={[styles.filterText, filter === "available" && styles.filterTextActive]}>
              💤 Disponíveis
            </Text>
          </TouchableOpacity>
      </View>

      <CharacterCard
        data={getRecruitedCharacters()}
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
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 25,
    marginTop: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 25,
    marginHorizontal: 5,
    gap: 12,
  },
  filterButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2C1810",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#58180D",
    minHeight: 44,
    marginHorizontal: 2,
  },
  filterButtonActive: {
    backgroundColor: "#58180D",
    borderColor: "#E69A28",
    borderWidth: 2,
  },
  filterText: {
    fontSize: 14,
    color: "#F4E4BC",
    fontWeight: "500",
    textAlign: "center",
  },
  filterTextActive: {
    color: "#E69A28",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  character: {
    backgroundColor: "#2C1810",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#58180D",
    minHeight: 65,
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
    marginLeft: 15,
    minWidth: 35,
  },
});
