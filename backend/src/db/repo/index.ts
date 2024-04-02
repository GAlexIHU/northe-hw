import VoucherRepo from "@backend/db/repo/voucher.repo";
import _ from "lodash";
import { DataSource } from "typeorm";
import { IRepoManager } from "../types";
import CampaignRepo from "./campaign.repo";

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
