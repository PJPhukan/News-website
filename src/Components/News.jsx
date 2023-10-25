import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();

    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount(e) {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a77010d6d7204f25b584d678362aca6b&pageSize=18&page=${this.state.page}`;
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      article: parseData.articles,
      totalResult: parseData.totalResults
    });
    // console.log(this.state.totalResult)
  }

  // previous and next button section

  HandlePreviousClick = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a77010d6d7204f25b584d678362aca6b&pageSize=18&page=${
      this.state.page - 1
    }`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      article: parseData.articles
    });
  };

  HandleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResult / 18) ){
    } 
    else{
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a77010d6d7204f25b584d678362aca6b&pageSize=18&page=${
          this.state.page + 1
        }`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
          page: this.state.page + 1,
          article: parseData.articles
        });
      console.log(this.state.page);
    }
  };

  render() {
    return (
      <div className="container my-3 ">
        <h2 className="text-center my-6">NewsMonkey - Top Headlines</h2>

        <div className="row">
          {this.state.article.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 70) : " "}
                  description={
                    element.description ? element.description.slice(0, 50) : " "
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page > 1 ? false : true}
            type="button"
            className="btn btn-dark px-4"
            onClick={this.HandlePreviousClick}
          >
            &larr;
          </button>
          <button
            type="button"
            className="btn btn-dark px-4"
            onClick={this.HandleNextClick}
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}
