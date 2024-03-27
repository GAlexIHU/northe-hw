import { DataSource } from 'typeorm';
import CampaignRepo from '@backend/db/repo/campaign.repo';
import VoucherRepo from '@backend/db/repo/voucher.repo';

export type Repo = ReturnType<DataSource['getRepository']>;

export interface IRepoManager {
    readonly campaignRepo: CampaignRepo;
    readonly voucherRepo: VoucherRepo;
}

export type DeleteResult = {
    success: boolean;
};
