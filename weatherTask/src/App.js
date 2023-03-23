import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchField from "react-search-field";
import FeatherIcon from "feather-icons-react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [Humidity, setHumidity] = useState(0);
  const [search, setSearch] = useState("delhi");
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState(0);

  useEffect(() => {
    console.log("I am inside useEffect");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7285bc2d790859aca827e82424122a88`
      )
      .then((res) => {
        console.log("res", res);
        setTemp(res.data.main.temp);
        setPressure(res.data.main.pressure);
        setHumidity(res.data.main.humidity);
        setWind(res.data.wind.speed);
        setCity(res.data.name);
      });
  }, [search]);

  const Wrapper = styled.div`
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.5);
    text-align: center;
  `;

  const Header = styled.h1`
    color: white;
    margin: 15px;
  `;

  const Search = styled.div``;

  const Row = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    margin: 10px;
    padding: auto;
  `;
  const Col = styled.div`
    flex-basis: 50%;
  `;
  const City = styled.div`
    color: white;
    margin: 20px;
  `;
  return (
    <>
      <Wrapper>
        <Header>Weather App</Header>
        <Search>
          <SearchField
            placeholder="Search..."
            onSearchClick={(value) => {
              setSearch(value);
            }}
            searchText={search}
            classNames="weather-input"
          />
        </Search>
        <div className="weather-cloud">
          <FeatherIcon icon="cloud-rain" color="white" size="60" />
        </div>
        <City>
          <h1>{city}</h1>
        </City>
        <Row>
          <Col>
            <FeatherIcon icon="sun" color="white" />
            <p>Temp:{(temp - 273.15).toFixed(2)} "C</p>
          </Col>
          <Col>
            <FeatherIcon icon="command" color="white" />
            <p>Pressure: {pressure}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <FeatherIcon icon="cloud" color="white" />
            <p>Humidity: {Humidity}</p>
          </Col>
          <Col>
            <FeatherIcon icon="wind" color="white" />
            <p>Wind: {wind}</p>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}

export default App;
