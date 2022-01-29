import React, { Component } from 'react';
import Spinner from './Spinner';
import NewsItem from './NewsItem';
import propTypes from 'prop-types'

const capitalizeFirstLetter= (word)=>{
  return word[0].toUpperCase() + word.slice(1);
}

export class News extends Component {
  
  static defaultProps={
    country:"in",
    pageSize:8,
    category:'general'
  }

  static propTypes={
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title=`${capitalizeFirstLetter(this.props.category)}- News Monkey`
  }
  async updateNews(pg){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pg}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading:false })

  }

  async componentDidMount() {
    this.updateNews();
  }

  onPreviousClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews(this.state.page - 1)
  }
  onNextClick = async () => {
    this.setState({ page: this.state.page + 1})
    this.updateNews(this.state.page + 1)
  }

  render() {
    return <div className='container my-3'>
      <h2 className='text-center' style={{marginTop:'5rem'}}>{capitalizeFirstLetter(this.props.category)} Top Headlines</h2>
      {this.state.loading && <Spinner/>}
      <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url} style={element.title && element.description && element.urlToImage ? {} : { display: 'none' }}>
            <NewsItem title={element.title} weburl={element.url} description={element.description} url={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
      </div>
      <div className="d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" onClick={this.onPreviousClick} className="btn btn-dark">	&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" onClick={this.onNextClick} className="btn btn-dark">Next &rarr;</button>
      </div>
    </div>;
  }
}

export default News;