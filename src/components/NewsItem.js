import React from 'react';

const NewsItem = (props) => {

    let { title, description, url, weburl, date, author, source } = props;
    return <div className='my-3'>
        <div className="card">
            <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger">
                {source}
            </span>
            <img src={url} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>

                <a href={weburl} rel="noreferrer" target='_blank' className="btn btn-dark">Read More</a>
            </div>
        </div>
    </div>;
}


export default NewsItem;