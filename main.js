function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadProjects() {
  const defaultProjects = [
    {
      name: "University Web System",
      desc: "Оюутан, багш, сургалтын алба, календарь, login хэсэгтэй веб систем."
    },
    {
      name: "Portfolio Admin Panel",
      desc: "Админ хэсгээс төсөл болон мэдээ нэмэх, устгах боломжтой веб систем."
    }
  ];

  const projects = JSON.parse(localStorage.getItem("projects") || JSON.stringify(defaultProjects));
  const box = document.getElementById("projectList");

  if (!box) return;

  box.innerHTML = projects.map(project => `
    <div class="project-card">
      <h3>${escapeHTML(project.name)}</h3>
      <p>${escapeHTML(project.desc)}</p>
    </div>
  `).join("");
}

function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();

  alert("Баярлалаа, " + name + "! Таны мэдээлэл хүлээн авлаа.");
  e.target.reset();
}

loadProjects();
