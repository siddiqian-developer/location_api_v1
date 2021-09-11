//declare database collections here
let vendorsColl;
let dbName = process.env.DB_NS;
export default class LocationDAO {
  static async injectDB(conn) {
    if (vendorsColl) {
      return;
    }
    try {
      //define database collections here
      vendorsColl = await conn.db(dbName).collection("vendors");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in LocationDAO: ${e}`
      );
    }
  }
  /*====================
  Location Access Object Methods
  ====================*/



  // inputParam1: userLocation = geoJSON point sent in request
  // inputParam2: proximityRadius = distance in meters
  // output: sorted list of JOSNs of vendors
  // it adds a property "vendorDistanceFromUser" in each vendor's JSON item 
  // NOTE: All distances are in meters
  
  static async getVendors(userLocation, proximityRadius) {
    try {
      const vendors = await vendorsColl
        .aggregate([
          {
            $geoNear: {
              near: userLocation,
              distanceField: "vendorDistanceFromUser",
              maxDistance: proximityRadius,
              spherical: true,
            },
          },
          {
            $sort: {
              vendorDistanceFromUser: -1,
            },
          },
        ])
        .toArray();
      return vendors;
    } catch (e) {
      return console.error(`error: ${e}`);
    }
  }
  // Write database methods here, call these methods in location.controller.js file :)
  // Feel free to simplify the location object in the database, especially if there is a performance gain!
  // Your db username will have admin privileges, if not, please send me a message. Thank you!

}
