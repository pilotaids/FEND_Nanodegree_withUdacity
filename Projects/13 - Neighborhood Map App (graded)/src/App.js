import React, { Component } from 'react';
import { allLocation } from './locations.js';
import {mapStyle} from './mapStyle.js';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import fetchJsonp from 'fetch-jsonp';
import NavBar from './NavBar'
import SideBar from './SideBar'
import './App.css';


class NeighborhoodMapApp extends Component {
  state = {
    map: {},
    query: '',
    locations: allLocation,
    data:[],
    markers: [],
    infoWindows: [],
    sidebarOpen: false,
    toggleSideBar: this.toggleSideBar.bind(this),
    updateQuery: this.updateQuery.bind(this)
  }

  updateMarkers (markers) {
    this.setState({ markers });
  }

  updateInfoWindows (infoWindows) {
    this.setState({ infoWindows });
  }

  //To update the query when the user use the filter field
  updateQuery (query) {
    if (query) {
      let filteredMarkers;

      // Filter the markers based on the value of the query
      const match = new RegExp(escapeRegExp(query),'i');
      filteredMarkers = this.state.markers.filter( (marker) => match.test(marker.title) );

      // Set the Map for the marker based on value of the query
      this.state.markers.forEach( (marker) => { marker.setMap(null) } );
      filteredMarkers.forEach( (marker) => { marker.setMap(this.state.map) } );
    } else {
      this.state.markers.forEach( (marker) => { marker.setMap(this.state.map) } );
    }

    // Update the value of the query state
    this.setState({ query });
  }

  //Update the data fater geeting the info from the API
  updateData (data) {
    this.setState({ data });
  }

  toggleSideBar () {
    this.setState(state => ({ sidebarOpen: !state.sidebarOpen }));
  }

  // https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise( (resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(window.google);
          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        
            const API = 'AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y';//AIzaSyCGZJyxS6h2DmSkN53GyMAroPVGou5B4nA&
        
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=${API}&v=3&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  loadMapComponents() {
    // Filter the locations depending on the user input 
    const {map, query, locations, data} = this.state;
    let showingLocations = locations;

    if (query) {
      const match = new RegExp(escapeRegExp(query),'i');
      showingLocations = locations.filter( (location) => match.test(location.title) );
    } else {
      showingLocations = locations;
    }

    this.state.markers.forEach( mark => { mark.setMap(null) } );

    // Clear the markers and the infoWindows arrays
    this.updateMarkers([]);
    this.updateInfoWindows([]);
    
    showingLocations.forEach( (marker, index) => {

      // Filter the data that is stored form wikipedia in the state to add them to windows info
      let getData = data.filter( (markerInfo) => (marker.title === markerInfo[0][0]) )
                      .map( (markerDetail) => {
                        if (markerDetail[1] !== ''){
                          console.log(`markerDetail = ${markerDetail}`);  // Console info viewing only
                          return markerDetail[1];
                        }
                        else
                          return 'No Contents Have Been Found Try to Search Manual';
                      });
      let getLink = data.filter( (markerInfo) => (marker.title === markerInfo[0][0]) )
                      .map( (markerLink) => {
                        if (markerLink[1] !== ''){
                          console.log(`markerLink = ${markerLink}`);      // Console info viewing only
                          return markerLink[2];
                        }
                        else
                          return 'https://www.wikipedia.org';
                      });

      let content = `<div tabIndex="0" class="infoWindow">
                      <h4>${marker.title}</h4>
                      <p>${getData}</p>
                      <a href=${getLink}>More details</a>
                    </div>`;

      // Add the content to infoWindows
      let addInfoWindow = new window.google.maps.InfoWindow({ content });
      // Extend the map bound
      let bounds = new window.google.maps.LatLngBounds();
      
      // Default marker's style
      var defaultIcon = new window.google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0091ff|40|_|%E2%80%A2',
        new window.google.maps.Size(21, 34),
        new window.google.maps.Point(0, 0),
        new window.google.maps.Point(10, 34),
        new window.google.maps.Size(21,34)
      );
      // Mouse-Over highlighting marker's style
      var highlightedIcon = new window.google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2',
        new window.google.maps.Size(21, 34),
        new window.google.maps.Point(0, 0),
        new window.google.maps.Point(10, 34),
        new window.google.maps.Size(21,34)
      );

      // Create the marker
      let addmarker = new window.google.maps.Marker({
        map: map,
        position: marker.location,
        title: marker.title,
        name: marker.title,
        animation: window.google.maps.Animation.DROP,
        icon: defaultIcon,
        id: index
      });

      //Add the marker to the list of marker
      this.state.markers.push(addmarker);
      this.state.infoWindows.push(addInfoWindow);
      
      // Mouse-Over and Mouse-Out marker's event listeners
      addmarker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      addmarker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });

      // Click marker's event listeners
      let infoWindows = this.state.infoWindows;
      addmarker.addListener('click', function() {
        //Close windows before open the another
        infoWindows.forEach( info => { info.close() } );
        addInfoWindow.open(map, addmarker);
        
        map.setCenter(addmarker.getPosition());
        map.setZoom(13);

        //Clear he animaiton before add the new one
        if (addmarker.getAnimation() !== null) {
          addmarker.setAnimation(null);
        } else {
          //Add the aniamtion when the marker is clicked
          addmarker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout( () => { addmarker.setAnimation(null); }, 400);
        }
      });

      //Bounds
      this.state.markers.forEach( (marker) => bounds.extend(marker.position) );
      map.fitBounds(bounds);
    })
  }

  // https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount(){
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then( () => {
      // Creating the Map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        // Giving an initial locaiton to start
        center: new window.google.maps.LatLng(40.7413549,-73.9980244),
        zoom: 13,
        styles: mapStyle,
        mapTypeControl: false
      });

      this.setState({ map });

      // Load the maps component only after the map has been added
      // Failing to wait will produce runtime errors where 'google.maps' is undefined
      this.loadMapComponents();
    })
    .catch( error => {
      console.log(error);
      alert('Error loading page...');
    });

    //By using wikpedia, I fetch the data about a specific location title 
    this.state.locations.map( (location, index) => {
      return fetchJsonp(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${location.title}&format=json&callback=wikiCallback`)
        .then( response => response.json() ).then( (jsonData) => {
          let wikiData = [...this.state.data,[jsonData,jsonData[2][0],jsonData[3][0]]];
          this.updateData(wikiData);
        })
        .catch( error =>
          console.error(error)      
        );
    });
  }

  render() {
    const {query, locations, markers, sidebarOpen} = this.state;
    let displaySidebar = sidebarOpen ? "block" : "none";
    let menuText = sidebarOpen ? "Close" : "Open";
    let showingLocations;

    // Filter the list of items based on the value of the query 
    if (query) {
      const match = new RegExp(escapeRegExp(query),'i');
      showingLocations = locations.filter( (location) => match.test(location.title) );
    } else {
      showingLocations = locations
    }

    // Sort the locations by their 'title'
    showingLocations.sort(sortBy('title'));

    return (
      <div>

        <NavBar
          menuText={menuText}
          sidebarOpen={sidebarOpen}
          toggleSideBar={this.state.toggleSideBar} />

        <div id="container">
        
          <SideBar
            query={query}
            markers={markers}
            showingLocations={showingLocations}
            sidebarOpen={sidebarOpen}
            updateQuery={this.state.updateQuery}
            displaySidebar={displaySidebar} />

          <div id="map-container" role="application" tabIndex="-1">
            <div id="map" role="region" aria-label="Philadelphia Neighborhood"></div>
          </div>

        </div>

      </div>
    )
  }
}

export default NeighborhoodMapApp
