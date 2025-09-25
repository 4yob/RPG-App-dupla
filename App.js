import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Header from "./components/header/Header.js";
import AddCharacterForm from "./components/addCharacterForm/addCharacterForm.js";
import Button from "./components/button/button.js";
import { StatusBar } from "expo-status-bar";
import CharacterCard from "./components/CharacterCard/characterCard.js";
import ConfirmationModal from "./components/confirmationModal/confirmationModal.js";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
        <Text style={styles.status}>{item.recruited ? (<Entypo name="star" size={24} color="yellow" />) : (<MaterialCommunityIcons name="sleep" size={24} color="gray" />)}</Text>
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
        title={
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <MaterialIcons name="castle" size={30} color="gray" />
            <Text style={{ marginLeft: 8, color: "#fff", fontSize: 20 }}>Minha Party RPG</Text>
          </View>
        }
        subtitle={
          <Text style={styles.subtitle}>
            <Entypo name="star" size={16} color="yellow" />  Recrutado •  <MaterialCommunityIcons name="sleep" size={16} color="gray" />  Disponível • Segure para remover
          </Text>
        }
      />

      <View style={styles.inputRow}>
        <AddCharacterForm
          placeholder="Nome do novo personagem"
          value={newCharacter}
          onChangeText={setNewCharacter}
          onSubmitEditing={addCharacter}
        />
        <Button text={<MaterialCommunityIcons name="sword-cross" size={24} color="gray" />} onPress={addCharacter} />
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
          onPress={() => setFilter("all")}
        >
          <FontAwesome6 name="masks-theater" size={24} color="orange" />
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "recruited" && styles.filterButtonActive]}
          onPress={() => setFilter("recruited")}
        >
          <Entypo name="star" size={24} color="yellow" />
          <Text style={[styles.filterText, filter === "recruited" && styles.filterTextActive]}>
            Recrutados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "available" && styles.filterButtonActive]}
          onPress={() => setFilter("available")}
        >
          <MaterialCommunityIcons name="sleep" size={24} color="gray" />
          <Text style={[styles.filterText, filter === "available" && styles.filterTextActive]}>
            Disponíveis
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
    backgroundColor: "#050A30",
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
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
    backgroundColor: "#BFD7ED",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#145DA0",
    minHeight: 44,
    marginHorizontal: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: "#145DA0",
    borderColor: "#BFD7ED",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    color: "#000000ff",
    fontWeight: "500",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  character: {
    backgroundColor: "#BFD7ED",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#145DA0",
    minHeight: 65,
  },
  characterRecruited: {
    backgroundColor: "#145DA0",
    borderColor: "#BFD7ED",
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
    marginLeft: 15,
    minWidth: 35,
  },
});
