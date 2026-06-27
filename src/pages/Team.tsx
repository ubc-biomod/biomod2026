import { useEffect, useState } from "react";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  accent: string;
};

const createPlaceholderImage = (initials: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" rx="28" fill="#f4f1ff"/>
      <circle cx="200" cy="150" r="88" fill="${accent}"/>
      <path d="M110 350c28-84 86-126 90-126s62 42 90 126" fill="${accent}" opacity="0.82"/>
      <text x="200" y="360" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="700" fill="#1f2340">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const teamMembers: TeamMember[] = [
  {
    name: "Kevin",
    role: "Team Lead",
    description: "A Short Description",
    accent: "#6c63ff",
  },
  {
    name: "Abiola",
    role: "Wetlab",
    description: "A Short Description",
    accent: "#3aa6b9",
  },
  {
    name: "George",
    role: "Computational",
    description: "A Short Description",
    accent: "#ff8e72",
  },
  {
    name: "Jack",
    role: "Wetlab",
    description: "A Short Description",
    accent: "#7e57c2",
  },
  {
    name: "Jisong",
    role: "Wetlab",
    description: "A Short Description",
    accent: "#4caf50",
  },
  {
    name: "Joseph",
    role: "Computational and Website",
    description: "A Short Description",
    accent: "#f4b942",
  },
  {
    name: "Julian",
    role: "Computational and Video",
    description: "A Short Description",
    accent: "#8d6e63",
  },
  {
    name: "Selina",
    role: "Computational",
    description: "A Short Description",
    accent: "#e57373",
  },
];

function TeamPage() {
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  useEffect(() => {
    const secretWord = "james";
    let typed = "";

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key.length !== 1) {
        if (key === "backspace") {
          typed = typed.slice(0, -1);
        }
        return;
      }

      typed += key;

      if (typed.endsWith(secretWord)) {
        setIsSecretRevealed(true);
        typed = "";
      } else if (typed.length > secretWord.length) {
        typed = typed.slice(-secretWord.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="team-page">
      <div className="team-page__header">
        <p className="team-page__eyebrow">Meet the Team</p>
        <h1>Our interdisciplinary group</h1>
        <p>
          This team brings together biology, computation, design, and ethics to build the next generation of biomolecular tools.
        </p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="team-card" key={member.name}>
            <div className="team-card__inner">
              <div className="team-card__face team-card__face--front">
                <img
                  src={createPlaceholderImage(member.name.split(" ").map((part) => part[0]).join(""), member.accent)}
                  alt={member.name}
                  className="team-card__image"
                />
                <div className="team-card__content">
                  <h2>{member.name}</h2>
                  <p>{member.role}</p>
                </div>
              </div>

              <div className="team-card__face team-card__face--back">
                <p>{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`team-secret-card ${isSecretRevealed ? "is-visible" : ""}`}>
        <img src="james.jpg" alt="Secret team image" />
        <div>
          <h2>Thank you James!</h2>
          <p>We appreciate everything you've done for BIOMOD in the past even though you aren't here for this competition :')</p>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
