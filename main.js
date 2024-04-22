function deleteTask(index){
  
  let tasks = []
  if (localStorage.getItem('Tasks')) {
    tasks = JSON.parse(localStorage.getItem('Tasks'))
  }

  tasks.splice(index, 1)

  localStorage.setItem('Tasks', JSON.stringify(tasks))
    
  displayTasks()
}

function updateTask(index){
  
  let tasks = []
  if (localStorage.getItem('Tasks')) {
    tasks = JSON.parse(localStorage.getItem('Tasks'))
  }
  const updatedTask = document.querySelector(`.inputFieldText${index}`)
  const updatedTaskValue = updatedTask.value

  tasks[index] = updatedTaskValue

  localStorage.setItem('Tasks', JSON.stringify(tasks))

  displayTasks()
}


function deleteAllTasks(){
  const innerText = 'are you sure you want to delete all tasks'
  if (confirm(innerText) === true){
    localStorage.clear('Tasks')
    hideDeleteAllButton()

  }
  
  displayTasks()
}

function hideDeleteAllButton() {
  const deleteAllButton = document.querySelector('.deleteAllTasks')
  deleteAllButton.style.display = 'none'
}

function showDeleteAllButton(){
  const showDeleteButton = document.querySelector('.deleteAllTasks')
  showDeleteButton.style.display = 'block'
}

function clearTasks() {
  const ulElement = document.querySelector('.js-taskList')
  let child = ulElement.lastElementChild
  while(child) {
    ulElement.removeChild(child)
    child = ulElement.lastElementChild
  }
}

function displayTasks(){
  clearTasks()

  let tasks = []
  if (localStorage.getItem('Tasks')) {
    tasks = JSON.parse(localStorage.getItem('Tasks'))
  }
  const ulElement = document.querySelector('.js-taskList')

  tasks.forEach(function(task, index){
    const liElement = document.createElement('li')
    liElement.className = 'liElement'

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Delete Task'
    deleteButton.className = 'deleteButton'

    const updateButton = document.createElement('button')
    updateButton.innerHTML = 'Update Task'
    updateButton.className = 'updateButton'

    const inputField = document.createElement('input')
    inputField.setAttribute('type', 'text')
    inputField.setAttribute('value', task)
    inputField.setAttribute('placeholder', 'input new task')
    inputField.className = `inputFieldText${index}`

    liElement.append(inputField, updateButton, deleteButton )
    ulElement.appendChild(liElement)

    deleteButton.setAttribute('onclick', `deleteTask(${index})`)
    updateButton.setAttribute('onclick',`updateTask(${index})`)

  })

  if ( tasks.length >= 1){
    showDeleteAllButton()
  } else {
    hideDeleteAllButton()
  }
}

function addTask(){
  let tasks = []
  if (localStorage.getItem('Tasks')) {
    tasks = JSON.parse(localStorage.getItem('Tasks'))
  }

  let taskInput = document.querySelector('.js-taskinputfield')
  const taskInputValue = taskInput.value;
  tasks.push(taskInputValue)
  localStorage.setItem('Tasks', JSON.stringify(tasks))

  document.querySelector('.js-taskinputfield').value = ''

  displayTasks()
  
}

window.onload = displayTasks()

