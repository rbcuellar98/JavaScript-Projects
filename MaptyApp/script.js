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

class Workout{

    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        
        this.coords = coords; // array of coordinates [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
}

class Running extends Workout{
    constructor(coords, distance, duration) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }
    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout{
    constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    }
    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}


// Application architecture
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
        // loop over the array of isFinite
        const validInputs = (...inputs) => inputs.every(input => Number.isFinite(inp));

        
        e.preventDefault();
        // Get data from the form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const elevation = +inputElevation.value;

        // If workout is running create running object
        if(type === 'running') {
            const cadence = +inputCadence.value;
            // check if the data is valid
            if(!validInputs(distance,duration,cadence)) {

            }
            return alert('Inputs have to be positive numbers');
        }
        // If workout is cycling create cycling object
        if(type === 'cycling') {
            const elevation = +inputElevation.value;
            if(!validInputs(distance,duration,elevation)) {

            }
            return alert('Inputs have to be positive numbers');
        }
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

