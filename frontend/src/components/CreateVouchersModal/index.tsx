import React from 'react'
import { useForm } from 'react-hook-form'

import { ICampaign } from '../../interfaces'

import ErrorMessage from '../CreateCampaign/ErrorMessage'
import Modal from '../shared/Modal'

interface ICreateVouchersModalProps {
  campaign: ICampaign
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: { [key: string]: string }) => void
}

export default function CreateVouchersModal({
  campaign,
  isOpen,
  onClose,
  onSubmit,
}: ICreateVouchersModalProps) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create vouchers for Campaign ${campaign.name}`}
      modalBody={
        <>
          <p className="text-white">
            Enter an amount of vouchers that needs to be generated for this
            campaign:
          </p>
          <input
            type="number"
            id="vouchers_amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
            placeholder="10"
            {...register('vouchersAmount', { required: true })}
          />
          <ErrorMessage
            message={
              errors.vouchersAmount?.type === 'required'
                ? 'Amount field is required'
                : null
            }
          />
        </>
      }
      modalActions={
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Generate vouchers
        </button>
      }
    />
  )
}
