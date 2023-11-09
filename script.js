//Variavel constante para armazenamento de dados no local Storage
const localStoragekey = 'to-do-list'

//Função para validar se a tarefa já existe
function validateIfExistsnovaTask (){
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let inputValue = document.getElementById('input-nova-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

//Função para adicionar novas tarefas
function novaTask() {
    let input = document.getElementById('input-nova-task')
    input.style.border = ''
    //validação de dados
    if(!input.value) {

        input.style.border = '1px solid red'
        alert('Digite algo pra inserir em sua lista')
    }
    //Lógica pra validar se a nova tarefa já existe
    else if(validateIfExistsnovaTask()) {

        alert('Já existe uma tarefa com essa descrição')
    }
    else {

        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStoragekey,JSON.stringify (values))
        showValues()
    }
    input.value = ''
}
//função para validar os dados das tarefas 
function showValues() {

    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++) {

        list.innerHTML += `<li>${values[i] ['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg></button></li>`
    }
}
// Função para remover tarefas executadas
function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStoragekey,JSON.stringify(values))
    showValues()
    
}

//Comando no final para as tarefas aparecerem na tela até que sejam excluídas
showValues()