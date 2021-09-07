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
    
    We also need the result of this method to return as a paginated list from the db.
    The pagination does not need to extensive. 
    A page limit of 20 documents, that can be updated through a method argument is sufficient.
    Please use mongodb limit method.
    Thank you!
    */
  }
  
}
