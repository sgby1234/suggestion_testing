import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios';



export class Autocomplete extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

/*  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }*/

  renderSuggestion = suggestion => {
    return (
        <div>{suggestion}</div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
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

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'word',
      value,
      onChange: this.onChange
    }

    return (
      <div className="App">
        <h1>AutoComplete Demo</h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.fullName}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}