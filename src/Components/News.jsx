import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 18,
    category: "gereral"
  };
  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };



  capitalizeFLetter(string) {

    return (string[0].toUpperCase() +
      string.slice(1));
  }
  constructor(props) {
    super(props);

    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResult: 0
    };
    document.title = `NewMonkey-${this.capitalizeFLetter(this.props.category)}`
  }

  async UpdateNews() { 
    this.props.setPrograss(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setPrograss(30)
    let parseData = await data.json();
    this.props.setPrograss(60)
    this.setState({
      article: parseData.articles,
      totalResult: parseData.totalResults,
      loading: false,
    });

    this.props.setPrograss(100)
  }

  async componentDidMount(e) {

    this.UpdateNews();
  }



  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      article: this.state.article.concat(parseData.articles),
      totalResult: parseData.totalResults,
    });
  };
  render() {
    return (
      <>
        <h2 className="text-center my-4">NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResult}
          loader={<Spinner />}
        >
          <div className="container">


            <div className="row">
              {/* {!this.state.loading && */}
              {this.state.article.map((element) => {
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
}
