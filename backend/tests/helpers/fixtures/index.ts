import campaignWithVouchers from "./campaignWithVouchers";
import createVouchers from "./createVouchers";
import deleteCampaign from "./deleteCampaign";
import existentCampaign from "./existentCampaign";

export default [
  ...createVouchers,
  ...campaignWithVouchers,
  ...deleteCampaign,
  ...existentCampaign,
];
