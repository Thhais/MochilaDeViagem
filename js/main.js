const form = document.querySelector("#novoItem")
const lista = document.querySelector("#lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    PreencheLista(elemento)
   
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    const existe = itens.find( elemento => elemento.nome === nome.value) // verifica se existe algum elemento com o mesmo nome. Caso exista, ele guarda o objeto na const existe, ou undefined caso não exista.

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
        
    }
    
    if(existe){
        itemAtual.id = existe.id
        AtualizaElemento(itemAtual)
        itens[existe.id] = itemAtual //sobrescrevendo o localStorage na posição existe.id

    }else{
        itemAtual.id = itens.length

        itens.push(itemAtual)
       
        PreencheLista(itemAtual)
    }
 
      localStorage.setItem("itens", JSON.stringify(itens))

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
    
    strong.dataset.id = itemAtual.id
    li.appendChild(strong)
    li.innerHTML += itemAtual.nome

    
    lista.appendChild(li)


}



function AtualizaElemento(itemAtualiza){
   document.querySelector("[data-id='"+itemAtualiza.id+"']").innerHTML = itemAtualiza.quantidade

}


