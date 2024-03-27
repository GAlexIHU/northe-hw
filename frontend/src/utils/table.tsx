import React from 'react';

import { ICampaign } from '../interfaces';

export const processCampaignItemData = (item: ICampaign) => ({
    ...item,
    dateFromTo: `${item.from} to ${item.to}`,
    discount: `${item.amount} ${item.currency}`,
    hasVouchers: item.vouchers.length > 0 ? 'Yes' : 'No',
});

export const processDataForCampaignsTable = (data: ICampaign[]) => {
    return data.map((item) => processCampaignItemData(item));
};

export const getCellForCampaignTable = (
    columnId: string,
    campaign: { [key: string]: string },
) => {
    if (columnId === 'id')
        return (
            <a className="text-white underline" href={`/campaigns/${campaign.id}`}>
                {campaign.id}
            </a>
        );

    if (columnId === 'dateFromTo')
      return <span>{campaign.from} - {campaign.to}</span>;

    else return campaign[columnId];
};
