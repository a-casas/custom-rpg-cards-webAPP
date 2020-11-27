

document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!')



 // https://hearthstoneapi.com/ + rapidapi Auth code snippet.
var options = {
  method: 'GET',
  url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/',
  headers: {
    'x-rapidapi-key': `769cec5917msh6216d16f56479bfp1aa340jsn79170fa4a7fc`,   //${process.env.APIKEY}
    'x-rapidapi-host': `omgvamp-hearthstone-v1.p.rapidapi.com`        //${process.env.APIHOST}
  }
}


//Returns random card of a certain race. Example values: Mech, Murloc.
const racesButton = document.getElementById("races").addEventListener("click", ()=>{
  const cardsDiv = document.getElementById("cards")
  cardsDiv.innerHTML = ""
  const race = document.getElementById("theRaceInput").value
  axios
  .request({
    method: options.method,
    url: `${options.url}races/${race}`,
    headers: options.headers
  })

  .then(response => {
    // console.log(response.data[0])
    const cards = response.data
    const random = Math.floor((Math.random()*cards.length))
    const div = document.createElement('div')
    div.innerHTML = `
    <p class="has-text-weight-semibold is-size-5">${cards[random].name}</p>
    <p class="mt-6">Race: ${cards[random].race}</p>
    <p>Class: ${cards[random].playerClass}</p>
    <p>Flavor: ${cards[random].flavor}</p>
    <p>Hit Points: ${cards[random].health}</p>
    <p>Attack Power: ${cards[random].attack}</p>
    `
    cardsDiv.append(div)
    
  })
  .catch(error => console.error('On get card error', error))
})


//Returns random card of a certain class. Example values: Mage, Paladin.
const classesButton = document.getElementById("classes").addEventListener("click", ()=>{
  const cardsDiv = document.getElementById("cards")
  cardsDiv.innerHTML = ""
  const classe = document.getElementById("theClassInput").value
  axios
  .request({
    method: options.method,
    url: `${options.url}classes/${classe}`,
    headers: options.headers
  })

  .then(response => {
    // console.log(response.data[0])
    const cards = response.data
    const random = Math.floor((Math.random()*cards.length))
    const div = document.createElement('div')
    div.innerHTML = `
    <p class="has-text-weight-semibold is-size-5">${cards[random].name}</p>
    <p>Race: ${cards[random].race}</p>
    <p>Class: ${cards[random].playerClass}</p>
    <p>Flavor: ${cards[random].flavor}</p>
    <p>Hit Points: ${cards[random].health}</p>
    <p>Attack Points: ${cards[random].attack}</p>
    `
    cardsDiv.append(div)
    
  })
  .catch(error => console.error('On get card error', error))
})
  

}, false)





