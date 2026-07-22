import { describe, expect, it, vi } from "vitest";

import { sendConfirmCode } from "@/lib/api/auth";

describe("sendConfirmCode (integration)", () => {
  it("отправляет phone_number и code, возвращает токены", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        message: "ok",
        access: "access-token",
        refresh: "refresh-token",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendConfirmCode({
      phoneNumber: "+79991234567",
      code: "1234",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://dev-api-shop.altawest.ru/api/verify_confirmation_code/",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          phone_number: "+79991234567",
          code: "1234",
        }),
      })
    );
    expect(result.access).toBe("access-token");
  });

  it("мапит HTTP 400 в ошибку неверного кода", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
      })
    );

    await expect(
      sendConfirmCode({ phoneNumber: "+79991234567", code: "0000" })
    ).rejects.toThrow("Неправильный код");
  });
});
