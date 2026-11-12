import { useEffect, useState } from "react";
import hallamImg from "../assets/images/HallamSteven.png";
import YadavImg from "../assets/images/Yadav.jpg";
import LuciaImg from "../assets/images/lucia.webp";
import AbiolaImg from "../assets/images/team/Abiola.jpg";
import GeorgeImg from "../assets/images/team/george.jpg";
import CooperImg from "../assets/images/team/Cooper_Nam.jpg";
import KevinImg from "../assets/images/team/kevin.jpeg";
import JisongImg from "../assets/images/team/Jisong_Han.jpg";
import JulianImg from "../assets/images/team/Julian_Mark-Santos.jpg";
import JosephImg from "../assets/images/team/Joseph_Deng.jpg";
import SelinaImg from "../assets/images/team/Selina_Fu.jpg";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  accent: string;
  image?: string;
  imagePosition?: string;
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
    description: "Shoebill enjoyer and the backbone of the team.",
    image: KevinImg,
    accent: "#6c63ff",
  },
  {
    name: "Abiola",
    role: "Wetlab",
    description: "T-shirts & Travel mastermind",
    image: AbiolaImg,
    accent: "#3aa6b9",
  },
  {
    name: "George",
    role: "Computational and Finance",
    description: "The Bread winner",
    image: GeorgeImg,
    accent: "#ff8e72",
  },
  {
    name: "Cooper",
    role: "Wetlab",
    description: "Gel electrophoresis enthusiast",
    image: CooperImg,
    accent: "#7e57c2",
  },
  {
    name: "Jisong",
    role: "Wetlab and Video",
    description: "Animation Accelerator",
    image: JisongImg,
    accent: "#4caf50",
  },
  {
    name: "Joseph",
    role: "Computational and Website",
    description: "Dude that codes",
    image: JosephImg,
    accent: "#f4b942",
  },
  {
    name: "Julian",
    role: "Computational and Video",
    description: "Filipino personality hire",
    image: JulianImg,
    accent: "#8d6e63",
  },
  {
    name: "Selina",
    role: "Computational",
    description: "Simulation Synthesizer",
    image: SelinaImg,
    accent: "#e57373",
  },
];

const Advisors: TeamMember[] = [
  {
    name: "Dr. Hallam",
    role: "Associate Professor",
    description: "Principal Investigator at Hallam Lab UBC",
    accent: "#000000",
    image: hallamImg,
    imagePosition: "center 20%",
  },
  {
    name: "Dr. Vikramaditya G. Yadav",
    role: "Associate Professor",
    description: "Director of MEL Program in Sustainable Process Engineering",
    accent: "#000000",
    image: YadavImg,
    imagePosition: "center 20%",
  },
  {
    name: "Lucia Tapia Alamos",
    role: "Lab Manager",
    description: "Research Associate/Lab Manager at Hallam Lab UBC",
    accent: "#000000",
    image: LuciaImg,
    imagePosition: "center 20%",
  },
  {
    name: "Marlene Chow",
    role: "Director of Academic Programs",
    description: "Director of Academic Programs, Administration and Resources University of British Columbia",
    accent: "#000000",
    imagePosition: "center 20%",
  },
]

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
        <h1 className="team-page__eyebrow">Meet the Team</h1>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="team-card" key={member.name}>
            <div className="team-card__inner">
              <div className="team-card__face team-card__face--front">
                <img
                  src={
                    member.image ||
                    createPlaceholderImage(member.name.split(" ").map((part) => part[0]).join(""), member.accent)
                  }
                  alt={member.name}
                  className="team-card__image"
                  style={{ 
                    objectPosition: member.imagePosition ||
                    "center"
                    }}
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

      <div className="team-page__header mt-10">
        <h1 className="team-page__eyebrow">Our Advisors</h1>
      </div>

      <div className="team-grid">
        {Advisors.map((member) => (
          <div className="team-card" key={member.name}>
            <div className="team-card__inner">
              <div className="team-card__face team-card__face--front">
                <img
                  src={
                    member.image ||
                    createPlaceholderImage(member.name.split(" ").map((part) => part[0]).join(""), member.accent)
                  }
                  alt={member.name}
                  className="team-card__image"
                  style={{ 
                    objectPosition: member.imagePosition ||
                    "center"
                    }}
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
