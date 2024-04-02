import React from "react";
import { ICampaign } from "../../interfaces";
import Modal from "../shared/Modal";

interface IDeleteCampaignModalProps {
  campaign: ICampaign;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function DeleteCampaignModal({
  campaign,
  isOpen,
  onClose,
  onSubmit,
}: IDeleteCampaignModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete Campaign: ${campaign.name}`}
      modalBody={
        <p className="text-white">
          Are you sure that you want to delete this campaign?
        </p>
      }
      modalActions={
        <>
          <button
            type="button"
            onClick={onSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete Campaign
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cancel
          </button>
        </>
      }
    />
  );
}
