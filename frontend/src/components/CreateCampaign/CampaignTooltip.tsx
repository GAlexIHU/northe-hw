import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function CampaignTooltip() {
  return (
    <>
      <button
        data-tooltip-target="tooltip"
        data-tooltip-trigger="hover"
        type="button"
      >
        <InformationCircleIcon className="h-6 w-6" />
      </button>
      <div
        id="tooltip"
        role="tooltip"
        className=" mt-10 absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        This Prefix will be used for your generated vouchers. Example,
        RECHARGE-XXXXXX
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  );
}
