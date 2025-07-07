export const avatars = ["/assets/images/avatar-1.png", "/assets/images/avatar-1.png", "/assets/images/avatar-1.png", "/assets/images/avatar-1.png"];


export const MESSAGES = {
  SIGNUP_SUCCESS: "Account created successfully. Please check your email to verify your account."
}


export const gradingScale = (score: number) => {
  if (score >= 10.0) { // PSA 10, CGC 10, BGS 10 Pristine / Black Label
    return {
      grade: "★★★★★ Pristine",
      tier: "Tier 1 (Ultimate Collector Quality)",
      stars: "★★★★★"
    };
  } else if (score >= 9.5) { // BGS 9.5 Gem Mint, CGC 9.5 Mint+
    return {
      grade: "★★★★★ Mint+",
      tier: "Tier 1 (Premium Collector Quality)",
      stars: "★★★★★"
    };
  } else if (score >= 9.0) { // PSA 9, BGS 9, CGC 9 Mint
    return {
      grade: "★★★★☆ Mint",
      tier: "Tier 2 (High Collector Quality)",
      stars: "★★★★☆"
    };
  } else if (score >= 8.0) { // PSA 8, BGS 8, CGC 8 Near Mint-Mint
    return {
      grade: "★★★★☆ Near Mint-Mint (NM-MT)",
      tier: "Tier 2 (High Collector Quality)",
      stars: "★★★★☆"
    };
  } else if (score >= 7.0) { // PSA 7, BGS 7, CGC 7 Near Mint
    return {
      grade: "★★★☆☆ Near Mint (NM)",
      tier: "Tier 3 (Good Collector Quality)",
      stars: "★★★☆☆"
    };
  } else if (score >= 6.0) { // PSA 6, BGS 6, CGC 6 Excellent-Mint
    return {
      grade: "★★★☆☆ Excellent-Mint (EX-MT)",
      tier: "Tier 3 (Good Collector Quality)",
      stars: "★★★☆☆"
    };
  } else if (score >= 5.0) { // PSA 5, BGS 5, CGC 5 Excellent
    return {
      grade: "★★☆☆☆ Excellent (EX)",
      tier: "Tier 4 (Fair Collector Quality)",
      stars: "★★☆☆☆"
    };
  } else if (score >= 4.0) { // PSA 4, BGS 4, CGC 4 Very Good-Excellent
    return {
      grade: "★★☆☆☆ Very Good-Excellent (VG-EX)",
      tier: "Tier 4 (Fair Collector Quality)",
      stars: "★★☆☆☆"
    };
  } else if (score >= 3.0) { // PSA 3, BGS 3, CGC 3 Very Good
    return {
      grade: "★☆☆☆☆ Very Good (VG)",
      tier: "Tier 5 (Entry Collector Quality)",
      stars: "★☆☆☆☆"
    };
  } else if (score >= 2.0) { // PSA 2, BGS 2, CGC 2 Good
    return {
      grade: "★☆☆☆☆ Good (GOOD)",
      tier: "Tier 5 (Entry Collector Quality)",
      stars: "★☆☆☆☆"
    };
  } else if (score >= 1.5) { // PSA 1.5, BGS 1.5, CGC 1.5 Fair
    return {
      grade: "☆☆☆☆☆ Fair (FR)",
      tier: "Tier 6 (Collector Grade - Heavy Wear)",
      stars: "☆☆☆☆☆"
    };
  } else if (score >= 1.0) { // PSA 1, BGS 1, CGC 1 Poor
    return {
      grade: "☆☆☆☆☆ Poor (PR)",
      tier: "Tier 6 (Collector Grade - Heavy Wear)",
      stars: "☆☆☆☆☆"
    };
  } else {
    // For scores less than 1.0, or possibly "Authentic" if you want to include that.
    return {
      grade: "☆☆☆☆☆ Authentic / Damaged",
      tier: "Tier 7 (Reference / Filler)",
      stars: "☆☆☆☆☆"
    };
  }
};