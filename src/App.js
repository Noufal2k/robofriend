import React, {Component} from 'react';
import CardList from './cardlist';
import SearchBox from './SearchBox';
import './App.css';

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots : [],
            searchField : ''
        }    
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots:users}))
    }
    handleSearch = event => {
        this.setState({searchField:event.target.value})
    }
    render(){
        const filteredRobots = this.state.robots.filter( robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLocaleLowerCase())
        })
        if(!this.state.robots.length){
            return <h1 className="loader">Loading..</h1>
        } else {
        return(
            <div className="tc">
                <div>
                    <h1 className="f1"> Robot Friend APP </h1>
                    <SearchBox searchField= {this.searchField} handleSearch={this.handleSearch}/>
                </div>
                <CardList robots={filteredRobots} />
            </div>
        );}
    }
}
export default App;