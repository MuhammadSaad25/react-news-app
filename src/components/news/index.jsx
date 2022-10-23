import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";
import moment from "moment/moment";

function News() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const getNews = (e) => {
    e?.preventDefault();


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
        console?.log(response?.data?.value);

        setData(response?.data?.value);


      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="main">

      <form onSubmit={getNews}>

        <input
          type="text"
          placeholder="Enter your city name"
          onChange={(e) => {
            setQuery(e?.target?.value)
          }} />

        <button type="submit">Get News</button>

        <div>{data.map(eachPost => (
          <div key={eachPost?.name}>
            <div>{moment(eachPost?.datePublished)?.format('DD MMMM  h:mm a')}</div>
            <h1>{eachPost?.name}</h1>
            <p>{eachPost?.description}</p>
            <img src={eachPost?.image?.thumbnail?.contentUrl?.replace("&pid=News","")?.replace("pid=News&","")?.replace("pid=News","")} alt="" />
            <a href={eachPost?.url}>Read More</a>

          </div>
        ))}
        </div>

      </form>

    </div>
  );
}

export default News;
