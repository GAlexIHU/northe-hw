import { Voucher } from "@backend/db/entities";
import BaseRepo from "@backend/db/repo/base.repo";
import { createCode } from "@backend/services";
import { PREFIX } from "@backend/types";
import { DataSource } from "typeorm";

class VoucherRepo extends BaseRepo {
  protected readonly modelName = "voucher";

  constructor(dataSource: DataSource) {
    super(dataSource, Voucher.name);
  }

  async createMany(
    campaignId: string,
    campaignPrefix: PREFIX,
    amount: number,
  ): Promise<Voucher[]> {
    const valuesTemplate = new Array(amount).fill("*");
    const values = valuesTemplate.map(() => ({
      campaignId,
      discountCode: `${campaignPrefix}-${createCode()}`,
    }));

    const result = await this.repo
      .createQueryBuilder()
      .insert()
      .returning("*")
      .values(values)
      .execute();

    return result.generatedMaps as Voucher[];
  }

  async find(options: object): Promise<Voucher[]> {
    return this.repo.find(options) as unknown as Voucher[];
  }
}

export default VoucherRepo;
