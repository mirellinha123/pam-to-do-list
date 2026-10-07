import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  Alert
} from 'react-native';

export default function App() {
  // Estados para o aplicativo
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('Home'); // 'Home' ou 'Profile'

  // Função para adicionar nova tarefa
  const handleAddTask = () => {
    if (taskText.trim() === '') {
      Alert.alert('Atenção', 'Digite uma descrição para a tarefa!');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  // Função para alternar o status de concluída
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Função para remover uma tarefa
  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Renderização de cada item da FlatList
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => handleToggleTask(item.id)}
      >
        <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
          {item.completed ? '✓ ' : '○ '} {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  // --- TELA DE PERFIL DO USUÁRIO ---
  if (currentScreen === 'Profile') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.title}>Perfil do Usuário</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://avatar.iran.liara.run/public' }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Desenvolvedor Mobile</Text>
          <Text style={styles.profileEmail}>dev.mobile@empresa.com.br</Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentScreen('Home')}
        >
          <Text style={styles.backButtonText}>← Voltar para Tarefas</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- TELA PRINCIPAL (LISTA DE TAREFAS) ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <TouchableOpacity
          style={styles.profileNavButton}
          onPress={() => setCurrentScreen('Profile')}
        >
          <Text style={styles.profileNavButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Formuário de Cadastro */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor="#888"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Contador de Tarefas (Bônus) */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Total de tarefas: {tasks.length} | Concluídas:{' '}
          {tasks.filter((t) => t.completed).length}
        </Text>
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma tarefa cadastrada. Adicione uma acima!
          </Text>
        }
      />
    </SafeAreaView>
  );
}

// Estilização com StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#2C3E50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileNavButton: {
    backgroundColor: '#34495E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  profileNavButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  counterText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333333',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#BDC3C7',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#95A5A6',
    marginTop: 40,
    fontSize: 16,
  },
  // Estilos da Tela de Perfil
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#BDC3C7',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  backButton: {
    backgroundColor: '#2C3E50',
    marginHorizontal: 20,
    marginTop: 30,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});