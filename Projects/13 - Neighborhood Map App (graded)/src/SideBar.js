import React, { Component } from 'react';
import './App.css'

class SideBar extends Component {
  //Trigger a specific marker 'click' event
  listItem = (item, event) => {
    let selected = this.props.markers.filter( (currentOne) => currentOne.name === item.title)
    window.google.maps.event.trigger(selected[0], 'click');
  }

  //Trigger a specific marker 'mouseover' event
  mouseOverItem = (item, event) => {
    let selected = this.props.markers.filter( (currentOne) => currentOne.name === item.title)
    window.google.maps.event.trigger(selected[0], 'mouseover');
  }

  //Trigger a specific marker 'mouseout' event
  mouseOutItem = (item, event) => {
    let selected = this.props.markers.filter( (currentOne) => currentOne.name === item.title)
    window.google.maps.event.trigger(selected[0], 'mouseout');
  }

  // Accessibility support. For reference code go to the following link
  // https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
  handleKeyPress(target, item, e) {
    if(item.charCode === 13){
      this.listItem(target, e)
    }
  }

  render() {
    let displaySidebar = this.props.sidebarOpen ? "block" : "none";

    return (
      <section id="sidebar" style={{ display: displaySidebar }}>
        <div id="sidebar-inner">
          <div>

            <input id="places-text"
              className='form-control'
              type="text"
              placeholder='Search location'
              value={this.props.query}
              onChange={ (event) => this.props.updateQuery(event.target.value) }
              role="search"
              aria-labelledby="Search For a Location"
              tabIndex="1" />

            <br/>
          
            <ul aria-labelledby="list of locations" tabIndex="1">
              {
                this.props.showingLocations.map( (getLocation, index) =>
                  <li
                    key={index}
                    tabIndex={index+2}
                    area-labelledby={`View details for ${getLocation.title}`}
                    onKeyPress={this.handleKeyPress.bind(this, getLocation)}
                    onClick={this.listItem.bind(this, getLocation)}
                    onMouseOver={this.mouseOverItem.bind(this, getLocation)}
                    onMouseOut={this.mouseOutItem.bind(this, getLocation)}>
                      {getLocation.title}
                  </li>
                )
              }
            </ul>
            
          </div>
        </div>
      </section>
    )
  }
}

export default SideBar;
