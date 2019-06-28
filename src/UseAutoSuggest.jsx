import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

//tells autosuggest to just use the value of the suggestion as the suggestion
const getSuggestionValue = suggestion => suggestion;

export class UseAutoSuggest extends Component {

    state = {
        queryterm: '',
        suggestions: []
    }



    onSuggestionsFetchRequested({ value, reason }) {
        var config = {
            "X-RapidAPI-Key": "c0a02a29c6msha6392a5d8d190a0p1716f3jsn07d3bf5bbe92",
        }
        axios.get("https://wordsapiv1.p.mashape.com/words/" + value + "/synonyms", {
            headers: config
        })
            .then(response => {
                console.log(response)
                this.setState({ suggestions: response.data.synonyms })
            })
    }



    /*Function called when the suggestions need to be cleared*/
    onSuggestionsClearRequested = () => {
        this.setState({
            term: '',
            suggestions: []
        });
    };

    /*function to render each suggestion */
    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.text}</span>
        );
    }

    /*set up what should happen when they change the value */
    onChange = (event, { newValue }) => {
        this.setState({ term: newValue })
    }

    render() {
        /*set up the props that must be sent in to autosuggest */
        const inputProps = {
            placeholder: 'word',
            value: this.state.queryterm,
            onChange: this.onChange
        }
        return (
            <div>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                >

                </Autosuggest>

            </div>
        )
    }
}
