import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 18,
    category:"gereral"
  };
   PropTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
  };

  constructor() {
    super();

    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount(e) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a77010d6d7204f25b584d678362aca6b&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      article: parseData.articles,
      totalResult: parseData.totalResults,
      loading: false,
    });
    // console.log(this.state.totalResult)
  }

  // previous and next button section

  HandlePreviousClick = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=a77010d6d7204f25b584d678362aca6b&pageSize=$pageSize}&page=${
      this.state.page - 1
    }`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      article: parseData.articles,
      loading: false,
    });
  };

  HandleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResult / this.props.pageSize)
    ) {
    } else {
      const url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=a77010d6d7204f25b584d678362aca6b&pageSize=${
        this.props.pageSize
      }&page=${this.state.page + 1}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        article: parseData.articles,
        loading: false,
      });
      console.log(this.state.page);
    }
  };

  render() {
    //  let {this.props.pageSize}=this.props;
    return (
      <div className="container my-3 ">
        <h2 className="text-center my-6">NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.article.map((element) => {
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
                    ewsUrl={element.url}
                    author={element.author}
                    upDate={element.publishedAt.slice(0,10)}
                    source={element.source.name}
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
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResult / this.props.pageSize)
                ? true
                : false
            }
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
