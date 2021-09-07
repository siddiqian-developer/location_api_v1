import LocationDAO from "../data-access/locationDAO";

export default class LocationController {
/*=================================================
LocationController Methods
=================================================*/

  //define location request methods here
  static async getLocalVendors(req, res) {
    /*
    This method accepts geoJSON coordinates in the request body, 
    and return the result of geospatial query from mongodb, 
    sorted by proximity to the user.
    */
  }
  
}