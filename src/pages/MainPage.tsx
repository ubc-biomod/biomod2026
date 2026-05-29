import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import dnaImg from "../assets/images/DNA.png";
import dna2Img from "../assets/images/DNA2.png";

// All measurements scaled from Figma's 1440×917px canvas.
// Horizontal: px / 1440 * 100 = vw value
// Vertical:   px / 917  * 100 = vh value

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Project Ideas", to: "/project-ideas" },
  { label: "Team", to: "/team" },
  { label: "Sponsors", to: "/sponsors" },
];

export default function MainPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#BCBDEF",
        overflow: "hidden",
      }}
    >
      {/* ── Navbar ─────────────────────────────────────────────────── */}
      {/* Figma: left 88px, top 15px, gap 80px between logo and menu  */}
      <nav
        style={{
          position: "absolute",
          left: "6.11vw",
          top: "1.64vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5.56vw",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img
            src={logo}
            alt=""
            style={{ width: "22px", height: "22px", objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Krub', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.9rem, 1.67vw, 1.5rem)",
              lineHeight: "100%",
              color: "#2E343F",
            }}
          >
            UBC BIOMOD
          </span>
        </div>

        {/* Nav links — Figma: gap 32px, Krub 500 16px letter-spacing 1px */}
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2.22vw",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                style={{
                  fontFamily: "'Krub', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.75rem, 1.11vw, 1rem)",
                  lineHeight: "140%",
                  letterSpacing: "1px",
                  color: "#2E343F",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Hero Title ─────────────────────────────────────────────── */}
      {/* Figma: left 88px, top 110px, Inter 700 128px, color #000    */}
      {/* text-shadow: -5px 5px 4px rgba(0,0,0,0.25)                  */}
      <h1
        style={{
          position: "absolute",
          left: "6.11vw",
          top: "11.99vh",
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "clamp(3rem, 8.89vw, 8rem)",
          lineHeight: 1.21,
          color: "#000000",
          textShadow: "-5px 5px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        DNA
        <br />
        ABUNDANCE
        <br />
        SORTER
      </h1>

      {/* ── Small DNA icon (next to "DNA") ─────────────────────────── */}
      {/* Figma: left 360px, top 96px, 150×142px,                      */}
      {/* transform: matrix(-0.93, 0.37, 0.37, 0.93, 0, 0)             */}
      <img
        src={dna2Img}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "25vw",
          top: "10.47vh",
          width: "clamp(70px, 10.42vw, 150px)",
          height: "auto",
          transform: "matrix(-0.93, 0.37, 0.37, 0.93, 0, 0)",
          pointerEvents: "none",
        }}
      />

      {/* ── Subtitle ───────────────────────────────────────────────── */}
      {/* Figma: left 92px, top 595px, Krub 500 20px, color #664381   */}
      <p
        style={{
          position: "absolute",
          left: "6.39vw",
          top: "64.89vh",
          width: "clamp(200px, 42.78vw, 616px)",
          margin: 0,
          fontFamily: "'Krub', sans-serif",
          fontWeight: 500,
          fontSize: "clamp(0.875rem, 1.39vw, 1.25rem)",
          lineHeight: "1.3",
          letterSpacing: "-0.05em",
          color: "#664381",
        }}
      >
        The DNA Abundance Sorter (DAS for short) is a nanostructure that adopts
        a specific conformation based on relative levels of mRNA transcript in a
        cell
      </p>

      {/* ── Large DNA helix image ──────────────────────────────────── */}
      {/* Figma: left 621px, top 0, 1140×856px, rotate(90.26deg)      */}
      {/* The 90° rotation turns the diagonal helix into a vertical one */}
      <img
        src={dnaImg}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "43.13vw",
          top: 0,
          width: "79.22vw",
          height: "auto",
          transform: "rotate(90.26deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
