import React from 'react'
import { useEffect, useState } from 'react'

import { ICampaign } from '../../interfaces'
import {
  getCellForCampaignTable,
  processDataForCampaignsTable,
} from '../../utils/table'

import TableComponent from '../shared/Table'
import { columns } from './columns'

export default function CampaignsList({
  campaigns,
}: {
  campaigns: ICampaign[]
}) {
  const [tableData, setTableData] = useState<ICampaign[]>([])

  useEffect(() => {
    if (campaigns) setTableData(processDataForCampaignsTable(campaigns))
  }, [campaigns])

  return (
    <div className="p-8">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-extrabold">Campaigns List</h2>
        <a
          href="campaigns/create"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create a new Campaign
        </a>
      </div>
      <TableComponent columns={columns}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {tableData.map((campaign: { [key: string]: any }) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={campaign.id}
          >
            {columns.map((column) => (
              <td className="px-6 py-4" key={`${column.id}-${campaign.id}`}>
                {getCellForCampaignTable(column.id, campaign)}
              </td>
            ))}
          </tr>
        ))}
      </TableComponent>
    </div>
  )
}
