import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { deleteCampaignById, generateVouchers } from "../../api/campaigns";
import { ICampaign, IVoucher } from "../../interfaces";
import { prepareVouchersForCSVExport } from "../../utils/csv";
import { processCampaignItemData } from "../../utils/table";
import CreateVouchersModal from "../CreateVouchersModal";
import DeleteCampaignModal from "../DeleteCampaignModal";
import BackNavButton from "../shared/BackNavButton";
import Spinner from "../shared/Spinner";
import TableComponent from "../shared/Table";
import Toast from "../shared/Toast";
import { columns } from "./columns";

export default function Campaign({ campaign }: { campaign: ICampaign | null }) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isGenerateVouchersModalOpen, setIsGenerateVouchersModalOpen] =
    useState(false);
  const [campaignData, setCampaignData] = useState<ICampaign | null>(null);
  const [csvVouchers, setCsvVouchers] = useState([] as string[][]);

  useEffect(() => {
    if (campaign) {
      setCampaignData(processCampaignItemData(campaign));
      setCsvVouchers(prepareVouchersForCSVExport(campaign.vouchers));
    }
  }, [campaign]);

  const onCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const openDeleteCampaignModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const openGenerateVouchersModal = useCallback(() => {
    setIsGenerateVouchersModalOpen(true);
  }, []);

  const closeGenerateVouchersModal = useCallback(() => {
    setIsGenerateVouchersModalOpen(false);
  }, []);

  const onSubmitDeleteCampaign = useCallback(() => {
    deleteCampaignById(campaign?.id)
      .then(() => {
        router.push("/campaigns");
      })
      .catch((error) => {
        setToastMessage(error.message);
      });
  }, [campaign?.id, router]);

  const onSubmitGeneratingVouchersModal = useCallback(
    (values: { [key: string]: string }) => {
      generateVouchers(campaign?.id, +values.vouchersAmount)
        .then(() => {
          router.reload();
        })
        .catch((error) => {
          setToastMessage(error.message);
        });
    },
    [campaign?.id, router],
  );

  const onHideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const copyToClipboard = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setToastMessage("Copied to clipboard");
  }, []);

  if (!campaignData) {
    return <Spinner />;
  }

  return (
    <>
      <div className="p-8">
        <BackNavButton />
        <h2 className="text-2xl font-extrabold mb-5">Campaign</h2>
        <div className="flex justify-between  p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-300">
          <div>
            <span className="flex space-x-3 font-normal text-black">
              Name: {campaignData.name}
            </span>
            <span className="flex space-x-3 font-normal text-black">
              Discount: {campaignData.discount}
            </span>
            <span className="flex space-x-3 font-normal text-black">
              Validity of Date: {campaignData.dateFromTo}
            </span>
            {campaignData.vouchers.length > 0 && (
              <CSVLink
                data={csvVouchers}
                filename={`${campaign.name} vouchers`}
              >
                <span className="underline text-sky-500">
                  Download vouchers
                </span>
              </CSVLink>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="button"
              onClick={openGenerateVouchersModal}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Generate Vouchers
            </button>

            <button
              type="button"
              onClick={openDeleteCampaignModal}
              className="h-fit focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete Campaign
            </button>
          </div>
        </div>
        {campaignData.vouchers.length > 0 && (
          <>
            <p className="font-semibold text-black mb-6">
              {campaignData.vouchers.length} Voucher(s) in Campaign
            </p>
            <TableComponent columns={columns}>
              {campaignData.vouchers.map((voucher: IVoucher) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={voucher.discountCode}
                >
                  <td className="px-6 py-4">
                    <button
                      className="underline text-blue-500"
                      onClick={() => {
                        copyToClipboard(voucher.discountCode);
                      }}
                    >
                      {voucher.discountCode}
                    </button>
                  </td>
                </tr>
              ))}
            </TableComponent>
          </>
        )}
      </div>
      <DeleteCampaignModal
        campaign={campaign}
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onSubmit={onSubmitDeleteCampaign}
      />
      <CreateVouchersModal
        campaign={campaign}
        isOpen={isGenerateVouchersModalOpen}
        onClose={closeGenerateVouchersModal}
        onSubmit={onSubmitGeneratingVouchersModal}
      />
      {toastMessage && (
        <Toast message={toastMessage} onHideToast={onHideToast} />
      )}
    </>
  );
}
