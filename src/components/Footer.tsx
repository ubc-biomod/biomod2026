import logo from "../assets/images/logo.png";

type FooterLink = {
  title: string;
  href: string;
};

export default function Footer({ links }: { links: FooterLink[] }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-white shadow-t-md gap-y-4 z-10">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="UBC BIOMOD Logo" className="h-10 w-10" />
        <span className="font-bold text-lg">UBC BIOMOD</span>
      </div>

      <ul className="flex flex-wrap justify-center space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-gray-800 hover:text-blue-600 transition"
              target="blank"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}