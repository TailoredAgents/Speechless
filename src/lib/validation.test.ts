import { describe, expect, it } from "vitest";
import { waitlistSchema } from "@/lib/validation";

describe("waitlist validation", () => {
  it("accepts a first-drop signup source and optional product interest", () => {
    const result = waitlistSchema.safeParse({
      email: "Person@Example.com",
      source: "saved-drawer",
      productId: "prod_more_than_words",
      website: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("person@example.com");
      expect(result.data.source).toBe("saved-drawer");
    }
  });

  it("rejects honeypot content", () => {
    expect(waitlistSchema.safeParse({ email: "person@example.com", website: "spam" }).success).toBe(false);
  });
});
