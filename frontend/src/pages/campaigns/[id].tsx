import React from "react";
import { getCampaignById, getCampaigns } from "../../api/campaigns";
import Campaign from "../../components/Campaign";
import { ICampaign } from "../../interfaces";

export async function getStaticPaths() {
  try {
    const campaigns = await getCampaigns();
    const paths = campaigns.map((campaign: ICampaign) => ({
      params: { id: `${campaign.id}` },
    }));
    return { paths, fallback: true };
  } catch (error) {
    console.error("error", error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const campaign = await getCampaignById(params.id);

    return { props: { campaign } };
  } catch (error) {
    console.error("error", error);
    return { props: { campaign: null } };
  }
}

export default function CampaignPage({ campaign }: { campaign: ICampaign }) {
  return <Campaign campaign={campaign} />;
}
