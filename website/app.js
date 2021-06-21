/* Global Variables */
//Set API base URL and API key
const cityName = 'Cairo';
const stateCode = 'eg';
const baseURL = `api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&appid=`; // append API Key
const apiKey = '5c4e24f1b365e0d7ad62848adaa4dcd7';
const apiKeyName = 'Default';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Get Current weather data from OpenWeatherMap.com API
const getWeather = async (baseURL, apiKey) => {
    const response = await fetch(`https://${baseURL}${apiKey}`);

    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log(error);
    }
};

//Post User data from the DOM to the local server API
const getUserData = async (url = '', data = {}) => {
    const response = await fetch(url, 
        {
            method: "POST", 
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },       
            body: JSON.stringify(data), 
          }
        );

        try {
            const newUserData =  await response.json();
            return newUserData;
        } catch (error) {
            console.log(error);
        }
};


//Initiate asynchrounus event on click
document.getElementById('generate').addEventListener('click', (event)=> {
    event.preventDefault()
    //Fetch User Content from the DOM
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    let userData = {
        'zip-code': zipCode,
        'feelings': feelings,
    };
    //Return User Content asynchronously
    const userContent = async () => {
        const userAsyncContent = await getUserData('/api', userData);
        const lastUserContent = userAsyncContent[userAsyncContent.length - 1];
        const lastZipCode = lastUserContent['zip-code'];
        const lastFeelings = lastUserContent['feelings'];

        document.getElementById('date').innerHTML = `Date: ${newDate}`;
        document.getElementById('content').innerHTML = `Zipcode: ${lastZipCode}<br>Feelings: ${lastFeelings}`;
        return userAsyncContent;
    }
    //Return Weather temperature asynchronously
    const weather = async () => {
        const weatherAsync = await getWeather(baseURL, apiKey);
        const temperature = weatherAsync.main.temp;

        document.getElementById('temp').innerText = `Temperature: ${temperature}`;
        return weatherAsync;
    } 
    
    //Initiate functions
    userContent();
    weather();
});