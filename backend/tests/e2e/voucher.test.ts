import apiRequest from "../helpers/apiRequest";

const nonExistentCampaignId = "00000000-0000-0000-0000-000000000000";
const invalidCampaignId = "invalid";

describe("Voucher controller test", () => {
  describe("Voucher create", () => {
    const defaultCampaignId = "00000000-0000-0000-0000-000000000002";
    const method = "POST";

    it("Can create", async () => {
      const payload = {
        amount: 1,
      };
      const url = `${defaultCampaignId}/vouchers/batch`;
      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(200);
    });

    it("Can create 100 vouchers", async () => {
      const payload = {
        amount: 100,
      };
      const url = `${defaultCampaignId}/vouchers/batch`;
      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(200);
    });

    it("Can NOT create more than 100 vouchers", async () => {
      const payload = {
        amount: 101,
      };
      const url = `${defaultCampaignId}/vouchers/batch`;
      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(400);
    });

    it("Can NOT create less than 1 vouchers", async () => {
      const payload = {
        amount: 0,
      };
      const url = `${defaultCampaignId}/vouchers/batch`;
      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(400);
    });

    it("Returns vouchers", async () => {
      const payload = {
        amount: 1,
      };

      const url = `${defaultCampaignId}/vouchers/batch`;

      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(200);
      expect(result?.data.vouchers).toHaveLength(1);
      expect(result?.data.vouchers[0].campaignId).toBe(defaultCampaignId);
    });

    it("Can NOT create w/o campaignId", async () => {
      const payload = {
        amount: 1,
      };
      const url = `//vouchers/batch`;
      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(400);
    });

    it("Can NOT create for invalid campaignId", async () => {
      const payload = {};
      const url = `${invalidCampaignId}/vouchers/batch`;
      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(400);
    });

    it("Can NOT create w/o amount", async () => {
      const payload = {};
      const url = `${defaultCampaignId}/vouchers/batch`;
      const result = await apiRequest({ url, method, body: payload });
      expect(result?.status).toBe(400);
    });
  });

  describe("Voucher list", () => {
    const defaultCampaignId = "00000000-0000-0000-0000-000000000004";
    const method = "GET";

    it("Can list with min payload", async () => {
      const payload = {};

      const url = `${defaultCampaignId}/vouchers`;
      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(200);
      expect(result?.data.success).toBeTruthy();
      expect(result?.data.vouchers.length).toBeTruthy();
    });

    it("Can list with take", async () => {
      const payload = {
        take: 10,
      };

      const url = `${defaultCampaignId}/vouchers`;
      const result = await apiRequest({ url, method, queryParams: payload });

      expect(result?.status).toBe(200);
      expect(result?.data.success).toBeTruthy();
      expect(result?.data.vouchers.length).toBeTruthy();
    });

    it("Can list with skip", async () => {
      const payload = {
        skip: 1,
      };

      const url = `${defaultCampaignId}/vouchers`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(200);
      expect(result?.data.success).toBeTruthy();
      expect(result?.data.vouchers.length).toBeTruthy();
    });

    it("Can list with take and skip", async () => {
      const payload = {
        take: 10,
        skip: 1,
      };

      const url = `${defaultCampaignId}/vouchers`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(200);
      expect(result?.data.success).toBeTruthy();
      expect(result?.data.vouchers.length).toBeTruthy();
    });

    it("Returns vouchers", async () => {
      const payload = {
        take: 2,
      };

      const url = `${defaultCampaignId}/vouchers`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(200);
      expect(result?.data.vouchers).toHaveLength(2);
    });

    it("Can NOT list with negative take", async () => {
      const payload = {
        take: -1,
      };

      const url = `${defaultCampaignId}/vouchers`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(400);
    });

    it("Can NOT list with big take", async () => {
      const payload = {
        take: 1_000,
      };

      const url = `${defaultCampaignId}/vouchers`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(400);
    });

    it("Can NOT list with negative skip", async () => {
      const payload = {
        skip: -1,
      };

      const url = `${defaultCampaignId}/vouchers`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(400);
    });
  });

  describe("Voucher export", () => {
    const method = "GET";

    it("Can export", async () => {
      const payload = {
        campaignId: "00000000-0000-0000-0000-000000000004",
      };

      const url = `${payload.campaignId}/vouchers/export`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(200);
      expect(result?.headers["content-type"]).toBe("text/csv");
      expect(result?.data).toBeTruthy();
    });

    it("Can export when no vouchers", async () => {
      const payload = {
        campaignId: "00000000-0000-0000-0000-000000000004",
      };

      const url = `${payload.campaignId}/vouchers/export`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(200);
      expect(result?.headers["content-type"]).toBe("text/csv");
      expect(result?.data).toBeTruthy();
    });

    it("Can NOT export for non-existent campaign", async () => {
      const payload = {
        campaignId: nonExistentCampaignId,
      };

      const url = `${payload.campaignId}/vouchers/export`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(404);
    });

    it("Can NOT export for invalid campaign", async () => {
      const payload = {
        campaignId: invalidCampaignId,
      };

      const url = `${payload.campaignId}/vouchers/export`;

      const result = await apiRequest({ url, method, queryParams: payload });
      expect(result?.status).toBe(400);
    });
  });
});
