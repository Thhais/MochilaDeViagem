const form = document.querySelector("#novoItem")
const lista = document.querySelector("#lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []



form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }
    itens.push(itemAtual)
    localStorage.setItem("itens", JSON.stringify(itens))
    
    PreencheLista(itemAtual)


    nome.value = ""
    quantidade.value = ""
   
})
 
function PreencheLista(itemAtual){
    const li = document.createElement('li')
    li.classList.add("item")
    // li.innerHTML = `<strong>${quantidade}</strong> ${nome}`

    const strong = document.createElement('strong')
    strong.innerHTML = itemAtual.quantidade
    //li.innerHTML = strong + nome ----> o problema está aqui, colocar um elemento dentro de outro com innerHTML cria  um objeto, não podemos criar como se fosse algo simples de html
    li.appendChild(strong)
    li.innerHTML += itemAtual.nome
    lista.appendChild(li)

}

itens.forEach((elemento) => {
    PreencheLista(elemento)
})
