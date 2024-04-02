import { validator } from "@backend/services";
import express, { Router } from "express";
import CampaignController from "../controllers/campaign";
import VoucherController from "../controllers/voucher";

function createRouter(): Router {
  const router = express.Router();

  const campaignController = new CampaignController();
  const voucherController = new VoucherController();

  router.post("/", validator.run("campaign.create"), campaignController.create);
  router.get("/", validator.run("campaign.list"), campaignController.list);

  router.get("/:id", campaignController.getById);
  router.delete("/:id", campaignController.delete);
  router.post(
    "/:id/vouchers/batch",
    validator.run("voucher.createMany"),
    voucherController.createMany,
  );
  router.get(
    "/:id/vouchers",
    validator.run("voucher.list"),
    voucherController.list,
  );
  router.get(
    "/:id/vouchers/export",
    validator.run("voucher.export"),
    voucherController.export,
  );

  return router;
}

export default {
  createRouter,
};
