window.addEventListener('load', () =>{
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description')
    let tempDegree = document.querySelector('.temp-degree');
    let location = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.degree-section');
    const tempSpan = document.querySelector('.degree-section span')

    //gets location
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/11ec8d650a92222839d338e73ac47098/${lat},${long}`;

            //fetches data from api and returns it to be accessed
            fetch(api)
                .then(data =>{
                    return data.json();
                })
                .then(data => {

                    //Alternatively, use data.currently.temperature
                    const {temperature, summary, icon} = data.currently;
                    //set Dom Elements from API
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    location.textContent = data.timezone;

                    //CALCULATE CELSUS
                    let celsius = (temperature - 32) * (5/9);
                    //set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //change temperature to Cels/faren
                    tempSection.addEventListener('click', () =>{
                        if(tempSpan.textContent === "F"){
                            tempSpan.textContent ="C";
                            tempDegree.textContent = Math.floor(celsius);
                        } else{
                            tempSpan.textContent ="F";
                            tempDegree.textContent = temperature;
                        }
                    });
                })
        });

    } else{
        h1.textContent ="In order for this app to work you need to click 'allow' for Geolocation. "
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        //This looks for every string with a line and replaces it with an underscore
        //Api uses underscores but JSON file uses dashes so we need to replace it
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    
});