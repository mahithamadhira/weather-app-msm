console.log('This is client side js')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json.then((data)=>{console.log(data)})
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var messageOne = document.getElementById('messageOne')
var messageTwo = document.getElementById('messageTwo')
var messageError = document.getElementById('messageError')
var loc = 'texas'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    loc = search.value
    //console.log(location)

    var url = "/weather?address="+loc

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageError.innerHTML = data.error;
                messageOne.innerHTML = ""
                messageTwo.innerHTML = ""
            }
            else{
                messageError. innerHTML = "Results"
                messageOne.innerHTML = data.location
                messageTwo.innerHTML = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})
