import React from "react";
const NewsItem=(props)=>{
    return (
      <div className="card">
        <img
          src={
            !props.imageUrl
              ? "https://cdn.sanity.io/images/0vv8moc6/ajmc/79556fd8e0ba557891e5a0710f5672b46a4e9f38-1280x720.jpg?fit=crop&auto=format"
              : props.imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}....</h5>
          <p className="card-text">{props.description}...</p>
          <p className="card-text">
            <small className="text-muted">
              {!props.author ? "" : `By ${props.author}`} On{" "}
              {new Date(props.upDate).toGMTString()}
            </small>{" "}
          </p>
          <a href={props.newsUrl} className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"89%",'zIndex':1}}>
          {props.source}
        </span>
      </div>
    );
  }


export default NewsItem;
