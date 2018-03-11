import React, {Component} from 'react';
import CardList from './cardlist';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots : [],
            searchField : ''
        }    
    }
    getUsers = async function() {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await resp.json()
        this.setState({robots:users})
    }
    componentDidMount(){
        this.getUsers();
    }
    handleSearch = event => {
        this.setState({searchField:event.target.value})
    }
    render(){
        const filteredRobots = this.state.robots.filter( robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLocaleLowerCase())
        })
        if(!this.state.robots.length){
            return <h3 className="loader">Loading..</h3>
        } else {
        return(
            <div className="tc">
                <div>
                    <h1 className="f1"> Robot Friend APP </h1>
                    <SearchBox searchField= {this.searchField} handleSearch={this.handleSearch}/>
                </div>
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        );}
    }
}
export default App;