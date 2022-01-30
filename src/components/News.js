import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import NewsItem from './NewsItem';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const capitalizeFirstLetter = (word) => {
  return word[0].toUpperCase() + word.slice(1);
}

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const updateNews = async (pg) => {
    props.progress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pg}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.progress(30)
    let data = await fetch(url);
    props.progress(70)
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setLoading(false)
    props.progress(100)
  }
  useEffect(()=>{
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)}- News Monkey`
  },[])
    
  const onPreviousClick = async () => {
    setPage(page-1)
    updateNews(page-1)
  }
  const onNextClick = async () => {
    setPage(page+1)
    updateNews(page+1)
  }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
    setLoading(false)
    setPage(page+1)
  };

  return <>
    <h2 className='text-center' style={{ marginTop: '5rem' }}>{capitalizeFirstLetter(props.category)} Top Headlines</h2>
    {loading && <Spinner />}
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalArticles}
      loader={<Spinner />}
    >
      <div className="container">
        <div className="row">
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url} style={element.title && element.description && element.urlToImage ? {} : { display: 'none' }}>
              <NewsItem title={element.title} weburl={element.url} description={element.description} url={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
      </div>
    </InfiniteScroll>



  </>;
}


export default News;


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string
}