const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "d5b0cd91156680fa95c53db4729f3b11";

weatherform.addEventListener("submit", async event=>{

    event.preventDefault();
    const city=cityinput.value;
    if(city){
         try{
            const data=await getdata(city);
            displayinfo(data);
         }
         catch(error){
            console.error(error);
            displayerror(error);
         }
    }
    else{
          displayerror("Please enter a city");
    }

});

async function getdata(city){
 const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
 const response= await fetch(url);
 console.log(response);

 if(!response.ok){
    throw new Error("Could not get data");
 }

 return await response.json();
}

function displayinfo(data){
  console.log(data);
  const {name:city, 
         main:{temp,humidity}, 
         weather:[{desc,id}]} = data;
    card.textContent="";
    card.style.display="flex";

    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const emojidisplay=document.createElement("p");

    citydisplay.textContent= city;
    tempdisplay.textContent= `${((temp-273.15) * (9/5) + 32).toFixed(1)}*F`;
    humiditydisplay.textContent= `Humidity: ${humidity}%`;
    descdisplay.textContent=desc;
    emojidisplay.textContent=getemoji(id);
    
    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");
    emojidisplay.classList.add("emoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(emojidisplay);
}

function getemoji(id){
    switch(true){
        case (id > 200 && id < 300):
                        return "⛈" ;
        case (id >= 300 && id < 400):
                        return "🌧";
        case (id >= 500 && id < 600):
                        return "🌧";
        case (id >= 600 && id < 700):
                        return "❄";
        case (id >= 700 && id < 800):
                        return "🌫";
        case (id === 800):
                        return "☀"
        case (id >= 801 && id <= 810):
                        return "☁"
        default:
                        return "❔";

    }
}

function displayerror(msg){

    const errordisplay=document.createElement("p");
    errordisplay.textContent=msg;
    errordisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}