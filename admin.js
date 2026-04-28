const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

function loginAdmin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem("adminLogin", "yes");
    window.location.href = "dashboard.html";
  } else {
    error.textContent = "Нэвтрэх нэр эсвэл нууц үг буруу байна.";
  }
}

function checkLogin() {
  if (sessionStorage.getItem("adminLogin") !== "yes") {
    window.location.href = "index.html";
  }
}

function logout() {
  sessionStorage.removeItem("adminLogin");
  window.location.href = "index.html";
}

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getProjects() {
  return JSON.parse(localStorage.getItem("projects") || "[]");
}

function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addProject(e) {
  e.preventDefault();

  const name = document.getElementById("projectName").value.trim();
  const desc = document.getElementById("projectDesc").value.trim();

  if (!name || !desc) {
    alert("Төслийн нэр болон тайлбарыг бөглөнө үү.");
    return;
  }

  const projects = getProjects();
  projects.push({ name, desc });
  saveProjects(projects);

  e.target.reset();
  renderProjects();
}

function renderProjects() {
  const tbody = document.getElementById("projectTable");
  if (!tbody) return;

  const projects = getProjects();

  if (projects.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">Одоогоор нэмсэн төсөл байхгүй.</td></tr>`;
    return;
  }

  tbody.innerHTML = projects.map((project, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHTML(project.name)}</td>
      <td>${escapeHTML(project.desc)}</td>
      <td><button class="delete-btn" onclick="deleteProject(${index})">Устгах</button></td>
    </tr>
  `).join("");
}

function deleteProject(index) {
  const projects = getProjects();
  projects.splice(index, 1);
  saveProjects(projects);
  renderProjects();
}

function getNews() {
  return JSON.parse(localStorage.getItem("news") || "[]");
}

function saveNews(news) {
  localStorage.setItem("news", JSON.stringify(news));
}

function addNews(e) {
  e.preventDefault();

  const title = document.getElementById("newsTitle").value.trim();
  const body = document.getElementById("newsBody").value.trim();

  if (!title || !body) {
    alert("Мэдээний гарчиг болон агуулгыг бөглөнө үү.");
    return;
  }

  const news = getNews();
  news.push({ title, body });
  saveNews(news);

  e.target.reset();
  renderNews();
}

function renderNews() {
  const tbody = document.getElementById("newsTable");
  if (!tbody) return;

  const news = getNews();

  if (news.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">Одоогоор нэмсэн мэдээ байхгүй.</td></tr>`;
    return;
  }

  tbody.innerHTML = news.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHTML(item.title)}</td>
      <td>${escapeHTML(item.body)}</td>
      <td><button class="delete-btn" onclick="deleteNews(${index})">Устгах</button></td>
    </tr>
  `).join("");
}

function deleteNews(index) {
  const news = getNews();
  news.splice(index, 1);
  saveNews(news);
  renderNews();
}

function loadDashboard() {
  const projectCount = getProjects().length;
  const newsCount = getNews().length;

  const p = document.getElementById("projectCount");
  const n = document.getElementById("newsCount");

  if (p) p.textContent = projectCount;
  if (n) n.textContent = newsCount;
}
