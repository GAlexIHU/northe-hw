import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { Controller,useForm } from 'react-hook-form'
import Datepicker from 'react-tailwindcss-datepicker'

import { createNewCampaign } from '../../api/campaigns'
import { processFormValuesForRequest } from '../../utils/campaign'

import BackNavButton from '../shared/BackNavButton'
import Toast from '../shared/Toast'
import CampaignTooltip from './CampaignTooltip'
import ErrorMessage from './ErrorMessage'

export default function CreateCampaign() {
  const router = useRouter()
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm()
  const [serverError, setServerError] = useState(null)

  const onSubmit = useCallback(
    (values: { [key: string]: string }) => {
      createNewCampaign(processFormValuesForRequest(values))
        .then(() => {
          router.push('/campaigns')
        })
        .catch((error) => {
          setServerError(error.message)
        })
    },
    [router]
  )

  const onHideToast = useCallback(() => {
    setServerError(null)
  }, [])

  return (
    <>
      <div className="p-8">
        <BackNavButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-extrabold mb-5">
            Create a new Campaign
          </h2>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="discount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Discount(in $)
              </label>
              <input
                id="discount"
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="10$"
                {...register('amount', { required: true })}
              />
              <ErrorMessage
                message={
                  errors.discount?.type === 'required'
                    ? 'Discount field is required'
                    : null
                }
              />
            </div>
            <div>
              <span className="flex justify-items-center mb-2">
                <label
                  htmlFor="prefix"
                  className="block text-sm font-medium text-gray-900 dark:text-black"
                >
                  Prefix(For Voucher)
                </label>
                <CampaignTooltip />
              </span>
              <input
                type="text"
                id="prefix"
                className="uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="RECHARGE"
                maxLength={10}
                {...register('prefix', { required: true, maxLength: 10 })}
              />
              <ErrorMessage
                message={
                  errors.prefix?.type === 'required'
                    ? 'Prefix field is required'
                    : null
                }
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-3 text-sm font-medium text-gray-900 dark:text-black"
              >
                Validity date
              </label>
              <Controller
                name="validityDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Datepicker
                    {...field}
                    minDate={new Date()}
                    classNames={{
                      input: () =>
                        'relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-gray-900',
                    }}
                  />
                )}
              />
              <ErrorMessage
                message={
                  errors.validityDate?.type === 'required'
                    ? 'Validity date field is required'
                    : null
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </div>
      {serverError && <Toast message={serverError} onHideToast={onHideToast} />}
    </>
  )
}
