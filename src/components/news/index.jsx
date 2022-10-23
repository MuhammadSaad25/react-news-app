import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";


function News() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const getNews = (e) => {
    e.preventDefault();


    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '7d22d9a396msh925a60d8fa0cfbfp1e1d6ajsn178f1b726d4d',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.value);

        setData(response.data.value);


      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="main" >

      <form onSubmit={getNews}>

        <input
          type="text"
          placeholder="Enter your city name"
          onChange={(e) => {
            setQuery(e.target.value)
          }} />

        <button type="submit">Get News</button>

        <div>{data.map(eachPost => (<div>
          <h1>{eachPost.name}</h1>
          <h3>{eachPost.description}</h3>
        
        </div>))}
        </div>

      </form>

    </div>
  );
}

export default News;
