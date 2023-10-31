import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, upDate, source } = this.props;
    return (
      <div className="card">
        <img
          src={
            !imageUrl
              ? "https://cdn.sanity.io/images/0vv8moc6/ajmc/79556fd8e0ba557891e5a0710f5672b46a4e9f38-1280x720.jpg?fit=crop&auto=format"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}....</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              {!author ? "" : `By ${author}`} On{" "}
              {new Date(upDate).toGMTString()}
            </small>{" "}
          </p>
          <a href={newsUrl} className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"89%",'zIndex':1}}>
          {source}
        </span>
      </div>
    );
  }
}

export default NewsItem;
