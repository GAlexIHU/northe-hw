import config from "@backend/config";
import { CatchError } from "@backend/decorators";
import { db, getRequestParams, NotFoundError } from "@backend/services";
import {
  CreateCampaignInput,
  DeleteCampaignInput,
  ListCampaignInput,
  MiddlewareResponse,
  Request,
  Response,
} from "@backend/types";
import { ICampaignController } from "./types";

class CampaignController implements ICampaignController {
  @CatchError({ message: "Failed to create campaign." })
  async create(req: Request, res: Response): Promise<MiddlewareResponse> {
    const params = getRequestParams<CreateCampaignInput>(req);
    const campaign = await db.repoManager.campaignRepo.create(params);
    console.log(campaign);
    return res.json({ success: true, campaign });
  }

  @CatchError({ message: "Failed to list campaigns." })
  async list(req: Request, res: Response): Promise<MiddlewareResponse> {
    const { take = config.pageLimit, skip = 0 } =
      getRequestParams<ListCampaignInput>(req);
    const campaigns = await db.repoManager.campaignRepo.find({
      take,
      skip,
      relations: ["vouchers"],
    });
    res.json({ success: true, campaigns });
  }

  @CatchError({ message: "Failed to get campaign." })
  async getById(req: Request, res: Response): Promise<MiddlewareResponse> {
    const { id } = req.params as DeleteCampaignInput;
    console.log(id);
    const campaign = await db.repoManager.campaignRepo.findById(id);
    if (!campaign) {
      throw new NotFoundError("Campaign does not exist");
    }
    res.json({ success: true, campaign });
  }

  @CatchError({ message: "Failed to delete campaign." })
  async delete(req: Request, res: Response): Promise<MiddlewareResponse> {
    const { id } = req.params as DeleteCampaignInput;
    const result = await db.repoManager.campaignRepo.deleteById(id);

    if (!result.success) {
      throw new NotFoundError("Campaign does not exist or is already deleted");
    }

    res.json({ success: true });
  }
}

export default CampaignController;
