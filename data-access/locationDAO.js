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
  static async getVendors() {
    try {
      // console.log(vendorsColl)

      let userCoordinates = [-73.987049, 40.716457];

      // vendorsColl.createIndex({location: "2dsphere" } )

      // const vendors = await vendorsColl.find().toArray()

      const vendors = await vendorsColl
        .aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: userCoordinates,
              },
              distanceField: "shopDistance",
              $maxDistance: 400000,
              spherical: true,
            },
          },
          {
            $sort: {
              shopDistance: -1,
            },
          },
        ])
        .toArray();

      // console.log(await vendors.toArray());

      return vendors;
    } catch (e) {
      return console.error(`error: ${e}`);
    }
  }
  // Write database methods here, call these methods in location.controller.js file :)
  // Feel free to simplify the location object in the database, especially if there is a performance gain!
  // Your db username will have admin privileges, if not, please send me a message. Thank you!

  findVendors() {
    // sample userLocation = [, -73.987049, 40.716457]
  }

  async findAllVendors() {
    // console.log("vendorsColl: ", vendorsColl);
    try {
      let cursor = await vendorsColl.find({});
      return await cursor.toArray();
    } catch (e) {
      console.error("Error in querying: " + e.message);
    }
  }
}
