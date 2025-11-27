import express from "express";
import { handleFormSubmit } from "../controller";

const router = express.Router();

router.route("/submit-user-response").get(handleFormSubmit);

export default router;