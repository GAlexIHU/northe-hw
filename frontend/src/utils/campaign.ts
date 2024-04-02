export const processFormValuesForRequest = (formValues: {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
}) => ({
  amount: +formValues.amount,
  prefix: formValues.prefix,
  currency: "USD", // default value for now
  from: formValues.validityDate.startDate,
  to: formValues.validityDate.endDate,
});
