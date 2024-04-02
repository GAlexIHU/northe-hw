import { IVoucher } from "../interfaces";

export const prepareVouchersForCSVExport = (
  vouchers: IVoucher[],
): string[][] => {
  const csvData = [["Voucher"]];

  vouchers.forEach((voucher: IVoucher) => {
    csvData.push([voucher.discountCode]);
  });

  return csvData;
};
