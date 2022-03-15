'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(function(position) {
    const {latitude} = position.coords;
    const {longitude} = position.coords;
   
    // computer coordinates
    const coords = [latitude, longitude];

    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // handling clicks on map
    // event created by leaflet
    map.on('click',function(mapE) {
        mapEvent = mapE;
        // form
        form.classList.remove('hidden');
        inputDistance.focus();


        

}, function(){
    alert('Could not get current position');
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    // Clear input fields
    inputDistance.value = inputDistance.value = inputCadence.value = inputElevation.value = '';
    // Display markers on
    const {lat, lng} = mapEvent.latlng;
        // marker placement and popup with methods from leaflet documentation
    L.marker([lat,lng])
    .addTo(map)
    .bindPopup(L.popup({maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup'}))
    .setPopupContent('Start a Workout') // Popup text content
    .openPopup();
    });
});

inputType.addEventListener('change', function() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})