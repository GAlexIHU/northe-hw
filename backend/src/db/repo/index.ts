import _ from 'lodash';
import { DataSource } from 'typeorm';
import CampaignRepo from './campaign.repo';
import VoucherRepo from '@backend/db/repo/voucher.repo';
import { IRepoManager } from '../types';

const repoClasses = [CampaignRepo, VoucherRepo];

function init(dataSource: DataSource): IRepoManager {
    const repos = {};

    for (const R of repoClasses) {
        const repoName = _.camelCase(R.name);
        _.set(repos, repoName, new R(dataSource));
    }

    return repos as IRepoManager;
}

export default init;
