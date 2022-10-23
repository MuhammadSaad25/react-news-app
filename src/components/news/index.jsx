import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";


function News() {

  const [data, setdata] = useEffect([]);
  const [query, setQuery] = useEffect("");

  const getNews = () => {
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '57e8aabeaemshba9b8e780e0be61p10232cjsnc3c62901dcd7',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
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

      </form>

    </div>
  );
}

export default News;
