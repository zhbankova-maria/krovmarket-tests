import { describe, expect, it, vi } from "vitest";

import { login } from "@/lib/api/auth";

describe("login (integration)", () => {
  it("отправляет phone_number на backend и возвращает ответ", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access: "access-token", refresh: "refresh-token" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await login({ phoneNumber: "+79991234567" });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://dev-api-shop.altawest.ru/api/send_verify_sms/",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ phone_number: "+79991234567" }),
      })
    );
    expect(result).toEqual({
      access: "access-token",
      refresh: "refresh-token",
    });
  });

  it("мапит HTTP 409 в понятную ошибку", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 409,
      })
    );

    await expect(login({ phoneNumber: "+79991234567" })).rejects.toThrow(
      "Телефон можно отправлять один раз в две минуты"
    );
  });
});
