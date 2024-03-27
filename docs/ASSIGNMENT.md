## Documentation
This is a service that allows users to create campaigns, and add vouchers that other users can redeem.

### Definitions:

A (voucher) campaign:
 * Validity of date (from, to)
 * Amount/Currency
 * Prefix (Example: RECHARGE)
 * Contains vouchers that are generated after the campaign is created

A voucher is:
 * Discount code: Is the prefix of voucher campaign (For example, RECHARGE prefix, and random size 6) -> RECHARGE-XXXXXX (Randomly generated letters, unique globally)
Every voucher is assigned to a campaign, and a campaign can have many vouchers

The application has a bug that it only allows to create one campaign with one prefix (RECHARGE).

To run the service, you need to have a locally running Postgres database, and afterward start the service with `npm start`

## Task:
We expect this application to be used widely across the world, with thousands of requests per second, therefore its important that this service is scalable and can handle a large number of requests.

The current service is deployed with a locally running database, but we expect this to be deployed in the cloud in the future.

- Fix the bug with the prefix
- Write down a plan for CI/CD for this service and note any improvements or problems with the current setup.
- Analyze the architecture of the service, and find opportunities to improve it (improve the performance or scalability, for example).
- Write a plan on how you would deploy this service in AWS, and what services you would use.
- Write a script to manage a k8s deployment with a locally running [kind](https://kind.sigs.k8s.io) cluster.
  - You should be able to create, update, and delete the deployment(s) with this script.

If you have any questions, feel free to ask. Good luck!
