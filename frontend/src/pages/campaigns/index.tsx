import React from 'react';

import { getCampaigns } from '../../api/campaigns';
import CampaignsList from '../../components/CampaignsList';
import { ICampaign } from '../../interfaces';

export default function CampaignsPage({ campaigns }: { campaigns: ICampaign[] }) {
  return <CampaignsList campaigns={campaigns} />;
}

export async function getStaticProps() {
  try {
    const campaigns = await getCampaigns();

    return {
      props: {
        campaigns,
      },
    };
  } catch (error) {
    console.error('error', error);
    return {
      props: {
        campaigns: null,
      },
    };
  }
}
