import { Campaign } from "@backend/db/entities";
import BaseRepo from "@backend/db/repo/base.repo";
import { CreateCampaignInput } from "@backend/types";
import { DataSource } from "typeorm";

export class CampaignPrefixAlreadyTakenError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

class CampaignRepo extends BaseRepo {
  protected readonly modelName = "campaign";

  constructor(dataSource: DataSource) {
    super(dataSource, Campaign.name);
  }

  async create(data: CreateCampaignInput): Promise<Campaign> {
    try {
      return await this.repo.save(data as Campaign);
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        if (error.code === "23505") {
          throw new CampaignPrefixAlreadyTakenError(
            `Prefix ${data?.prefix} already taken`,
          );
        }
      }
      throw error;
    }
  }
}

export default CampaignRepo;
