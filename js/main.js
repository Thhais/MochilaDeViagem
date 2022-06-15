const form = document.querySelector("#novoItem")
const lista = document.querySelector("#lista")
const itens = []

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    PreencheLista(nome.value,quantidade.value)
    nome.value = " "
    quantidade.value = " "
   
})
 
function PreencheLista(nome,quantidade){
    const li = document.createElement('li')
    li.classList.add("item")
    // li.innerHTML = `<strong>${quantidade}</strong> ${nome}`

    const strong = document.createElement('strong')
    strong.innerHTML = quantidade
    //li.innerHTML = strong + nome ----> o problema está aqui, colocar um elemento dentro de outro com innerHTML cria  um objeto, não podemos criar como se fosse algo simples de html
    li.appendChild(strong)
    li.innerHTML+= nome
    lista.appendChild(li)

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade,
    }
    itens.push(itemAtual)
    localStorage.setItem("item", JSON.stringify(itens))
    

}
