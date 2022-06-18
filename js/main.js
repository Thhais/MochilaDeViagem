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
        //itens[existe.id] = itemAtual //sobrescrevendo o localStorage na posição existe.id == LOGICA ANTIGA, DAVA CERTO ENQUANTO APAENAS ATT O ÚLTIMO
        const indexExiste = itens.findIndex(elemento => elemento.id === existe.id)
        itens[indexExiste] = itemAtual

    }else{
       // itemAtual.id = itens.length  -> lógica antiga
       const tamanho = itens.length

       if(tamanho == 0){
            itemAtual.id = 0
       }else{
            itemAtual.id  = itens[tamanho-1].id + 1
       }

        itens.push(itemAtual) //push adiciona na última posição do array
        
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

    li.appendChild(buttonDelete(itemAtual.id))
    lista.appendChild(li)


}
function AtualizaElemento(itemAtualiza){
   document.querySelector("[data-id='"+itemAtualiza.id+"']").innerHTML = itemAtualiza.quantidade

}
function buttonDelete(id){
    const botao = document.createElement('button')
    botao.innerHTML = "X"

    botao.addEventListener('click', function () {
       removeTag(this.parentNode,id)
       
    }
    )
    
      return botao
}

 function removeTag(tag, id){
    tag.remove()
   //itens.splice(id,1) -> da erro porque quando deletamos um item no array ele não deixa aquela posição vazia e sim realoca dinamicamente, logo o id (itemAtual.id) não está mais relacionado com a posição no array itens
    
   itens.splice(itens.findIndex(elemento => elemento.id === id), 1) //encontra o index onde tem um item  === id
   localStorage.setItem("itens", JSON.stringify(itens))
}