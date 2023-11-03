import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [article, setarticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)
  
  const capitalizeFLetter = (string) => {
    return (string[0].toUpperCase() +
    string.slice(1));
  }
  document.title = `NewMonkey-${capitalizeFLetter(props.category)}`  


  const UpdateNews = async () => {
    props.setPrograss(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setPrograss(30)
    let parseData = await data.json();
    props.setPrograss(60)
    setarticle(parseData.articles)
    setTotalResult(parseData.totalResults)
    setLoading(false);

    props.setPrograss(100)
  }

  useEffect(() => {
    UpdateNews();
  }, [])




  const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setarticle(article.concat(parseData.articles));
    setTotalResult(parseData.totalResults)
  };

  return (
    <>
      <h2 className="text-center my-4">NewsMonkey - Top Headlines</h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResult}
        loader={<Spinner />}
      >
        <div className="container">


          <div className="row">
            {/* {!loading && */}
            {article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 70) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 50)
                        : " "
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    upDate={element.publishedAt.slice(0, 10)}
                    source={element.source.name}
                  />
                </div>
              );
            })
            }
          </div>
        </div>
      </InfiniteScroll>

    </ >
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 18,
  category: "gereral"
}
News.prototypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
}