// ============================================================
//  HOW TO ADD A SPONSOR
//  1. Put the logo file in  src/assets/sponsors/
//     (PNG with transparent background or SVG works best)
//  2. Import it below, e.g.
//       import starfishLogo from "../assets/sponsors/starfish.png";
//  3. Add one entry to the `sponsors` list:
//       { name: "StarFish Medical", tier: "gold", logo: starfishLogo, url: "https://starfishmedical.com" },
//  Sponsors without a `logo` show their name in a card instead.
// ============================================================

// --- logo imports go here ---
// import starfishLogo from "../assets/sponsors/starfish.png";

import sponsor1Logo from "../assets/sponsors/apsc.webp";
import CHBELogo from "../assets/sponsors/CHBE.jpg";
import SBMELogo from "../assets/sponsors/SBME_UBC.png";

type Tier = "platinum" | "gold" | "bronze" | "past";

type Sponsor = {
  name: string;
  tier: Tier;
  logo?: string; // imported image
  url?: string; // where clicking the logo goes
};

// --- sponsor list: edit this ---
const sponsors: Sponsor[] = [
  { name: "UBC Applied Science", tier: "bronze", logo: sponsor1Logo, url: "https://apsc.ubc.ca" },
  { name: "UBC SBME", tier: "bronze", logo: SBMELogo, url: "https://bme.ubc.ca/" },
  { name: "UBC CHBE", tier: "bronze", logo: CHBELogo, url: "https://chbe.ubc.ca/" },
  // { name: "Walter H. Gage Memorial Fund", tier: "bronze", logo: sponsor2Logo, url:"https://students.ubc.ca/campus-life/involved/funding-project/walter-gage-memorial-fund/" },
  { name: "HALLAM LAB", tier: "bronze", url:"https://hallamlab.ca/" },
];

// Links for the two buttons at the bottom
// const SPONSORSHIP_PACKAGE_URL = ""; // e.g. a PDF in /public, like "/sponsorship-package.pdf"
const BECOME_A_SPONSOR_URL = "mailto:team@ubcbiomod.com"; // e.g. "mailto:team@ubcbiomod.com"

// Order and look of each section
const tiers: { key: Tier; label: string; color: string; logoHeight: number }[] = [
  { key: "bronze", label: "BRONZE TIER", color: "#CD7F32", logoHeight: 80 },
  { key: "gold", label: "GOLD TIER", color: "#D4AF37", logoHeight: 100 },
  { key: "platinum", label: "PLATINUM TIER", color: "#808080", logoHeight: 120 },
  { key: "past", label: "PAST SPONSORS", color: "transparent", logoHeight: 70 },
];

const font = "'Inter', sans-serif";

function SponsorCard({ sponsor, logoHeight }: { sponsor: Sponsor; logoHeight: number }) {
  const content = sponsor.logo ? (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      style={{ maxHeight: logoHeight, maxWidth: "100%", objectFit: "contain" }}
    />
  ) : (
    <span style={{ fontFamily: font, fontWeight: 600, fontSize: "1.1rem", color: "#2E343F" }}>
      {sponsor.name}
    </span>
  );

  const card = (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        width: 220,
        height: logoHeight + 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      className="transition-transform duration-200 hover:scale-105"
    >
      {content}
    </div>
  );

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  ) : (
    card
  );
}

function TierSection({ tier }: { tier: (typeof tiers)[number] }) {
  const list = sponsors.filter((s) => s.tier === tier.key);
  if (list.length === 0) return null;

  return (
    <section style={{ width: "90%", marginTop: 30 }}>
      {/* <div
        style={{
          backgroundColor: tier.color,
          display: "flex",
          justifyContent: "center",
          padding: "8px 0",
          fontFamily: font,
          fontWeight: isPast ? 700 : 200,
          fontSize: isPast ? "3rem" : "1rem",
        }}
      >
        {isPast ? <h1>{tier.label}</h1> : <p>{tier.label}</p>}
      </div> */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          marginTop: 20,
        }}
      >
        {list.map((s, i) => (
          <SponsorCard key={`${s.name}-${i}`} sponsor={s} logoHeight={tier.logoHeight} />
        ))}
      </div>
    </section>
  );
}

function SponsorsPage() {
  const buttonStyle = {
    marginInline: 30,
    marginBlock: 10,
    padding: 10,
    backgroundColor: "#664381",
    color: "#FFFFFF",
    display: "inline-block",
  };

  return (
    <div
      style={{
        backgroundColor: "#BCBDEF",
        minHeight: "100vh",
        width: "100%",
        padding: "50px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {tiers.map((t) => (
        <TierSection key={t.key} tier={t} />
      ))}

      <div
        style={{
          marginTop: 120,
          marginBottom: 60,
          width: "80%",
          padding: "60px 20px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: font, fontWeight: 700, fontSize: "3rem", color: "#000000" }}>
          BECOME A SPONSOR
        </h1>
        <p style={{ marginTop: 5, maxWidth: 700 }}>
          Want to support our cause? Become a sponsor! Our strong performances in previous BIOMOD
          competitions wouldn't be possible without sponsors like you.
        </p>
        <div style={{ marginTop: 35 }}>
          {/* <a href={SPONSORSHIP_PACKAGE_URL || undefined} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
            SPONSORSHIP PACKAGE
          </a> */}
        
          <a href={BECOME_A_SPONSOR_URL || undefined} style={buttonStyle}>
            BECOME A SPONSOR!
          </a>
        </div>
        
      </div>
    </div>
  );
}

export default SponsorsPage;
