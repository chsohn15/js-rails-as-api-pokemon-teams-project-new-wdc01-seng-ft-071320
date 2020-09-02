
document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons/`
    const main = document.querySelector('main')

    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => addAllTrainers(trainers))

    function addAllTrainers(trainers){
        trainers.forEach(trainer => {
            addOneTrainer(trainer)
        })
    }
    function addOneTrainer(trainer){
        let card = document.createElement('div')
        card.className = "card"
        card.dataset.id = `${trainer.id}`

        let p = document.createElement('p')
        p.innerText = trainer.name 

        let addBtn = document.createElement('button')
        addBtn.innerText = "Add Pokemon"
        addBtn.setAttribute('data-trainer-id', trainer.id)

        let ul = document.createElement('ul')

        card.append(p, addBtn, ul)

        trainer.pokemons.forEach(pokemon => {
            addOnePokemon(pokemon)
        })

        function addOnePokemon(pokemon){
            let pokeLi = document.createElement('li')
            pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})` 
            
            let releaseBtn = document.createElement('button')
            releaseBtn.className = "release"
            releaseBtn.innerText = "Release"
            releaseBtn.setAttribute('data-pokemon-id', pokemon.id)

            pokeLi.append(releaseBtn)

            ul.append(pokeLi)
            
            releaseBtn.addEventListener("click", () => {
                fetch(POKEMONS_URL + pokemon.id, {
                    method: "DELETE"
                })
                .then(() => {
                    pokeLi.remove()
                    trainer.pokemons.length -= 1
                })
            })
        }

        main.append(card)

        addBtn.addEventListener("click", function(e){
            
            if (trainer.pokemons.length < 6){

            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    trainer_id: trainer.id
                })
                }
            fetch(POKEMONS_URL, configObj)
            .then(res => res.json())
            .then(pokemon => addOnePokemon(pokemon))
            
            trainer.pokemons.length += 1
            }
            else {
                addBtn.disabled = true
                alert("This card has reached the maximum number of Pokemon")
            }

            
        })




    }
})



