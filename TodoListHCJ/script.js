// Chave usada para salvar os dados no LocalStorage
const STORAGE_KEY = 'todo_list_meu_dia';

// Elementos do DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const taskCounter = document.getElementById('task-counter');
const currentDateEl = document.getElementById('current-date');

// Estado das tarefas na memória
let tasks = [];

/**
 * Inicialização da aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
  displayCurrentDate();
  loadTasksFromStorage();
  renderTasks();
});

/**
 * Exibe a data atual formatada em português
 */
function displayCurrentDate() {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const today = new Date().toLocaleDateString('pt-BR', options);
  // Primeira letra em maiúscula
  currentDateEl.textContent = today.charAt(0).toUpperCase() + today.slice(1);
}

/**
 * Carrega as tarefas salvas no LocalStorage
 */
function loadTasksFromStorage() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  if (savedTasks) {
    try {
      tasks = JSON.parse(savedTasks);
    } catch (error) {
      console.error('Erro ao ler tarefas do LocalStorage:', error);
      tasks = [];
    }
  }
}

/**
 * Salva as tarefas atuais no LocalStorage
 */
function saveTasksToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Adiciona uma nova tarefa
 */
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = todoInput.value.trim();

  // Validação: Campo vazio
  if (taskText === '') {
    alert('Por favor, digite uma tarefa antes de adicionar!');
    todoInput.focus();
    return;
  }

  // Criação do objeto da tarefa
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  // Adiciona ao início da lista
  tasks.unshift(newTask);

  // Salva no LocalStorage e atualiza a interface
  saveTasksToStorage();
  renderTasks();

  // Limpa e foca no campo de texto
  todoInput.value = '';
  todoInput.focus();
});

/**
 * Alterna o estado de conclusão de uma tarefa
 * @param {number} id - ID da tarefa
 */
function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasksToStorage();
  renderTasks();
}

/**
 * Exclui uma tarefa da lista
 * @param {number} id - ID da tarefa a ser excluída
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToStorage();
  renderTasks();
}

/**
 * Atualiza o contador de tarefas e visibilidade do estado vazio
 */
function updateTaskCounter() {
  const total = tasks.length;
  const pending = tasks.filter((t) => !t.completed).length;

  if (total === 0) {
    taskCounter.textContent = '0 tarefas';
    emptyState.style.display = 'block';
  } else {
    taskCounter.textContent = `${pending} de ${total} ${total === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
    emptyState.style.display = 'none';
  }
}

/**
 * Renderiza a lista de tarefas no HTML
 */
function renderTasks() {
  // Limpa o conteúdo atual da lista
  todoList.innerHTML = '';

  // Renderiza cada tarefa existente
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    // Conteúdo principal (Checkbox + Texto)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'todo-item-content';
    contentDiv.addEventListener('click', () => toggleTask(task.id));

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      toggleTask(task.id);
    });

    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = task.text;

    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(textSpan);

    // Botão de Excluir (Vermelho)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.setAttribute('aria-label', `Excluir tarefa: ${task.text}`);
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  // Atualiza contador e estado vazio
  updateTaskCounter();
}