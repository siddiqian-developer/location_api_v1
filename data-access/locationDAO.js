//declare database collections here
let vendorsColl
let dbName = process.env.DB_NS
export default class LocationDAO {
  static async injectDB(conn) {
    if (vendorsColl) {
      return
    }
    try {
      //define database collections here
      vendorsColl = await conn.db(dbName).collection("vendors")
    } catch (e) {
      console.error(`Unable to establish collection handles in LocationDAO: ${e}`)
    }
  }
  /*====================
  Location Access Object Methods
  ====================*/
  static async getVendors() {
    try {
      console.log(vendorsColl)
      const vendors = await vendorsColl.find().toArray()
      return vendors
    } catch (e) {
      return console.error(`error: ${e}`)
    }
  }
  // Write database methods here, call these methods in location.controller.js file :)
  // Feel free to simplify the location object in the database, especially if there is a performance gain!
  // Your db username will have admin privileges, if not, please send me a message. Thank you!
}
