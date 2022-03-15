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


class App{
    #map;
    #mapEvent;
    constructor() {
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }
    _getPosition() {
    if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
    alert('Could not get current position');
    });
    }
    _loadMap(position) {
        
            const {latitude} = position.coords;
            const {longitude} = position.coords;
           
            // computer coordinates
            const coords = [latitude, longitude];
        
            this.#map = L.map('map').setView(coords, 13);
        
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
        
            // handling clicks on map
            // event created by leaflet
            this.#map.on('click',this._showForm.bind(this)); 
    }
    _showForm(mapE) {
        this.#mapEvent = mapE;
        // form
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkout(e) {
        e.preventDefault();
            // Clear input fields
            inputDistance.value = inputDistance.value = inputCadence.value = inputElevation.value = '';
            // Display markers on
            const {lat, lng} = this.#mapEvent.latlng;
                // marker placement and popup with methods from leaflet documentation
            L.marker([lat,lng])
            .addTo(this.#map)
            .bindPopup(L.popup({maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup'}))
            .setPopupContent('Start a Workout') // Popup text content
            .openPopup();
    }
}

const app = new App();
app._getPosition();

