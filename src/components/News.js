import React, { Component } from 'react';
import Spinner from './Spinner';
import NewsItem from './NewsItem';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const capitalizeFirstLetter = (word) => {
  return word[0].toUpperCase() + word.slice(1);
}

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0
    }
    document.title = `${capitalizeFirstLetter(this.props.category)}- News Monkey`
  }
  async updateNews(pg) {
    this.props.progress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pg}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    this.props.progress(30)
    let data = await fetch(url);
    this.props.progress(70)
    let parsedData = await data.json(); 
    this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false })
    this.props.progress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  onPreviousClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews(this.state.page - 1)
  }
  onNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews(this.state.page + 1)
  }
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalArticles: parsedData.totalResults, loading: false, page: this.state.page + 1 })
  };
  render() {
    return <>
      <h2 className='text-center' style={{ marginTop: '5rem' }}>{capitalizeFirstLetter(this.props.category)} Top Headlines</h2>
      {this.state.loading && <Spinner />}
      <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url} style={element.title && element.description && element.urlToImage ? {} : { display: 'none' }}>
                <NewsItem title={element.title} weburl={element.url} description={element.description} url={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>



    </>;
  }
}

export default News;