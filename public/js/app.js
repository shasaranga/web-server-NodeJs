console.log("Client-side javascript file is loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault(); // prevent from refreshing
    console.log('testing');
    
    const location = search.value;
    console.log(location);

    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then(data =>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
            messageOne.textContent = data.location;

            // for better readability
            messageTwo.textContent = 'Weather : '+ data.forecast.weather_description;
            messageTwo.textContent = messageTwo.textContent + '. Temperature : ' + data.forecast.temperature;
            messageTwo.textContent = messageTwo.textContent + ' Humidity : ' + data.forecast.humidity;      
        }
        

    });
});

});

// FETCH SAMPLE

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);

//     });

// });