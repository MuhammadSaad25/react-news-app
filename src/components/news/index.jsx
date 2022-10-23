import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";
import moment from "moment/moment";

function News() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    function getTrendingNews() {
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: { safeSearch: 'Off', textFormat: 'Raw' },
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '7d22d9a396msh925a60d8fa0cfbfp1e1d6ajsn178f1b726d4d',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      axios.request(options)
        .then(function (response) {
          setData(response.data.value)
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
    }

    getTrendingNews();


  }, [])




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
    setIsLoading(true)
    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false)

        console?.log(response?.data?.value);

        setData(response?.data?.value);


      })
      .catch(function (error) {
        setIsLoading(false)
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

        <div>
          {(isloading) ? "loading ..." : ""}
        </div>

        <div>{data.map(eachPost => (
          <div key={eachPost?.name}>
            <div>{moment(eachPost?.datePublished)?.format('DD MMMM  h:mm a')}</div>
            <h1>{eachPost?.name}</h1>
            <p>{eachPost?.description}</p>
            <img src={eachPost?.image?.thumbnail?.contentUrl?.replace("&pid=News", "")?.replace("pid=News&", "")?.replace("pid=News", "")} alt="" />
            <br />
            <a href={eachPost?.url} target="_blank" rel="noreferrer">Read More</a>

          </div>
        ))}
        </div>

      </form>

    </div>
  );
}

export default News;
