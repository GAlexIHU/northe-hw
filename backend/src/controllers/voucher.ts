import config from "@backend/config";
import { CatchError } from "@backend/decorators";
import {
  db,
  getRequestParams,
  NotFoundError,
  vouchersToCSV,
} from "@backend/services";
import {
  CreateVoucherManyInput,
  ListVoucherInput,
  MiddlewareResponse,
  NextFunction,
  Request,
  Response,
} from "@backend/types";
import { IVoucherController } from "./types";

class VoucherController implements IVoucherController {
  @CatchError({ message: "Failed to create vouchers." })
  async createMany(req: Request, res: Response): Promise<MiddlewareResponse> {
    const { id } = req.params;

    const { amount } = getRequestParams<CreateVoucherManyInput>(req);
    const campaign = await db.repoManager.campaignRepo.findById(id);

    if (!campaign) {
      throw new Error(`Campaign doesn't exist`);
    }

    const vouchers = await db.repoManager.voucherRepo.createMany(
      campaign.id,
      campaign.prefix,
      amount,
    );
    res.status(200).json({ success: true, vouchers });
  }

  @CatchError({ message: "Failed to list vouchers." })
  async list(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<MiddlewareResponse> {
    const {
      campaignId,
      take = config.pageLimit,
      skip = 0,
    } = getRequestParams<ListVoucherInput>(req);

    const vouchers = await db.repoManager.voucherRepo.find({
      where: { campaignId },
      take,
      skip,
    });

    if (!vouchers.length) {
      return next(
        new NotFoundError(`There is no voucher for campaign ${campaignId}`),
      );
    }

    res.status(200).json({ success: true, vouchers });
  }

  @CatchError({ message: "Failed to export vouchers." })
  async export(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<MiddlewareResponse> {
    const { id } = req.params;

    if (!id) {
      return next(new NotFoundError(`There is no campaign with id ${id}`));
    }

    const filename = `vouchers_of_${id}.csv`;
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    return vouchersToCSV(id, () => res.status(200).end(), res);
  }
}

export default VoucherController;
