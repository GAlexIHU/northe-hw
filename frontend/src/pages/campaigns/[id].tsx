import React from "react";
import { getCampaignById } from "../../api/campaigns";
import Campaign from "../../components/Campaign";
import { ICampaign } from "../../interfaces";

export async function getServerSideProps({ params }) {
  try {
    const campaign = await getCampaignById(params.id);

    return { props: { campaign } };
  } catch (error) {
    console.error("error", error);
    return { props: { campaign: null } };
  }
}

export default function CampaignPage({
  campaign,
}: {
  campaign: ICampaign | null;
}) {
  return <Campaign campaign={campaign} />;
}
