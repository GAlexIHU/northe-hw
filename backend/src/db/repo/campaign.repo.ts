import { DataSource } from 'typeorm';
import BaseRepo from '@backend/db/repo/base.repo';
import { Campaign } from '@backend/db/entities';
import { CreateCampaignInput } from "@backend/types";


class CampaignRepo extends BaseRepo {
    protected readonly modelName = 'campaign';

    constructor(dataSource: DataSource) {
        super(dataSource, Campaign.name);
    }

    create(data: CreateCampaignInput): Promise<Campaign> {
        return this.repo.save(data as Campaign);
    }
}

export default CampaignRepo;
