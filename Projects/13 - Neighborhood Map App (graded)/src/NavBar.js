import React, { Component } from 'react';
// import PropTypes from 'prop-types'

class NavBar extends Component {

  // To support accessibility (https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
  menuKeyEnter(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      this.props.toggleSideBar();
    }
  }

  render() {
    return (
      <nav id="navbar">
        
        <h3 id="head-title" className="nav-item">Neighborhood Maps</h3>

        <h3
          tabIndex="0"
          id="sidebar-toggle-button"
          className="transition nav-item"
          title={ this.props.menuText + " Sidebar" }
          onClick={() => { this.props.toggleSideBar() }}
          onKeyPress={ (event) => this.menuKeyEnter(event) }>
          {
            this.props.sidebarOpen ?
            <i className="material-icons" style={{lineHeight: "inherit"}}>clear</i> :
            <i className="material-icons" style={{lineHeight: "inherit"}}>menu</i>
          }
        </h3>

      </nav>
    );
  }
}

export default NavBar;
