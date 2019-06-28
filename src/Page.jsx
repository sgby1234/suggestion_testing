import React, { Component } from 'react';
import axios from 'axios'

export class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            querytext: '',
            response: []

        }
        this.mapResponse = this.mapResponse.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    mapResponse() {
        var elements = this.state.response.map(word => <p>{word}</p>)
        return elements
    }

    handleChange(event) {
        this.setState({
            querytext: event.target.value
        }, () => {
            var config = {
                "X-RapidAPI-Key": "c0a02a29c6msha6392a5d8d190a0p1716f3jsn07d3bf5bbe92",
            }
            axios.get("https://wordsapiv1.p.mashape.com/words/" + this.state.querytext + "/synonyms", {
                headers: config
            })
                .then(response => {
                    console.log(response)
                    console.log("setting state has synonyms" + response.data.synonyms)
                    this.setState({ response: response.data.synonyms })
                }).catch(error => {
                    if (error.response.status === 404) {
                        console.log("set empty")
                        this.setState({ response: [] })
                    }

                })
        })
    }




    render() {
        return (
            <div>
                <label>Post id</label>
                <input list="dropdown" type="text" value={this.state.querytext} placeholder="word" onChange={this.handleChange}></input>
                <datalist id="dropdown2">

                    <option value="car" />
                    <option value="cat" />
                    <option value="carriage" />
                    )}
                </datalist>

                <datalist id="dropdown">
                    {this.state.response.map((item) => 
                        <option value={item} />
                    
                    )}
                </datalist>


            </div>
        )
    }
}
