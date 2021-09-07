import { Router } from "express"
import locationCtrl from "../controller/location.controller"

const router = new Router()

/*====================
  Location Routes
  ====================*/
router.route("/").post(locationCtrl.getLocalVendors)

export default router