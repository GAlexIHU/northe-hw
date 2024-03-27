import React from 'react'

import { getCampaignById, getCampaigns } from '../../api/campaigns'
import Campaign from '../../components/Campaign'
import { ICampaign } from '../../interfaces'

export async function getStaticPaths() {
  const campaigns = await getCampaigns()
  const paths = campaigns.map((campaign: ICampaign) => ({
    params: { id: `${campaign.id}` },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const campaign = await getCampaignById(params.id)

  return { props: { campaign } }
}

export default function CampaignPage({ campaign }: { campaign: ICampaign }) {
  return <Campaign campaign={campaign} />
}
