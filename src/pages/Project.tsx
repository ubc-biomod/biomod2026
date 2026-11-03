import HtmlContent from "../components/HtmlContent";

function ProjectPage() {
  return (
    <>
      <div style={{ backgroundColor: "#BCBDEF", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "3rem", color: "#000" }}>
          Project Ideas
        </h1>
      </div>
      <HtmlContent src="/Project_page/project.html" />
    </>
  );
}

export default ProjectPage;