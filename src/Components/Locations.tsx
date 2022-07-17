import React, { useState, useEffect } from 'react';
import API from '../Services/API';
import hotIcon from '../assets/hotIcon.svg';
import frostyIcon from '../assets/frostyIcon.svg';
import aviatorIcon from '../assets/aviatorIcon.svg';

function Locations() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, accuracy: 0 });
  
  const [name, setName] = useState("enter a valid zipcode");
  const [button, setButton] = useState(true);
  const [alert, setAlert] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [shouldHideAlert, setShouldHideAlert] = useState(true);

  function error(err: { code: number, message: string }) {
    console.warn(`Error(${err.code}): ${err.message}`);
  };

  useEffect(() => {
  }, [refresh])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldHideAlert(true);
    const zipcode = event.target.value;
    if (zipcode.length ==5) {
      
      API.getLatLong(zipcode).then(res =>{
        setName(res.locations[0].address.city + ", " + res.locations[0].address.state);
        let newLocation = {
          latitude: (res.locations[0].referencePosition.latitude.toString()), 
          longitude: (res.locations[0].referencePosition.longitude.toString()),
          accuracy: 0
        };
        setLocation(newLocation);
        setButton(false);
      });
      
    } else {
      setName("enter a valid zipcode");
      setButton(true);
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (API.getWeatherData(location.latitude, location.longitude)).then(res => {
      assessWeather(res.data.daily[0].temp.max, res.data.daily[0].temp.max);
    });
  };

  const getDeviceLocation = (event: React.FormEvent<HTMLButtonElement>) => {
    setShouldHideAlert(true);
    navigator.geolocation.getCurrentPosition(success, error);
    function success(pos: {
      coords: {
        latitude: number,
        longitude: number,
        accuracy: number
      }
    }) {
      const crd = pos.coords;
      (API.getWeatherData(crd.latitude,crd.longitude)).then(res => {
        assessWeather(res.data.daily[0].temp.max, res.data.daily[0].temp.max);
      });
    };
  };

  const assessWeather = (high: number, low:number) => {
    if (high > 78) {
      setAlert(hotIcon);
    } else if (low < 33) {
      setAlert(frostyIcon);
    } else {
      setAlert(aviatorIcon);
    }
    setShouldHideAlert(false);    
  };


  return (
    <div>
      <section id="myCitiesList" className="list-group">
        <div className="text-center">
          <div
            id="locationsUserTitle"
            className="p-2 bg-primary bg-opacity-10 border border-black border-opacity-0 border-5 rounded-3"
          >
            <h2>
              Hot n Frosty - Will you need a windshield blocker?
            </h2>
          </div>
        </div>
        <div className="mb-3">
          <div className="container mt-2" id='container'>
            <div className="text-center">
              <div className="p-2 bg-primary bg-opacity-10 border  border-opacity-5 border-5 rounded-3">
                <h5>by current location</h5>
                <button onClick={getDeviceLocation} id="location-btn" className='btn btn-info' ><img src='https://freeiconshop.com/wp-content/uploads/edd/location-marker-outline.png' alt="current location" /></button>
              </div>
            </div>
          </div>
          <div className="container mt-2" id='container'>
            <div className="text-center">
              <div className="p-2 bg-primary bg-opacity-10 border  border-opacity-5 border-5 rounded-3">
                <div className="text-center">
                </div>
                <div className="text-center">
                  <h5>by zipcode</h5>
                </div>
                <form className="input" onSubmit={handleSubmit}>
                  <input
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    placeholder="90210"
                    name="zipcode"
                  />
                  <br></br>
                  <button
                    id='city-btn'
                    type="submit"
                    className="btn btn-success btn-block custom"
                    disabled={button}
                  >
                    {name}
                  </button>
                </form>
              </div>
              <img className='alert-img' hidden={shouldHideAlert} src={alert} alt='weather alert' />
            </div>
          </div>

          
        
        </div>
      </section>
    </div>
  )
};

export default Locations;