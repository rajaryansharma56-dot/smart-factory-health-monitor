import Chart from "chart.js/auto";
import "./style.css";

const machines = [
  {id:"MCH-001",name:"CNC Milling Machine",department:"Production A",temp:68,vibration:3.2,rpm:1450,status:"Healthy"},
  {id:"MCH-002",name:"Hydraulic Press",department:"Production B",temp:89,vibration:7.8,rpm:1200,status:"Critical"},
  {id:"MCH-003",name:"Industrial Motor",department:"Assembly",temp:74,vibration:5.1,rpm:1380,status:"Warning"},
  {id:"MCH-004",name:"Conveyor System",department:"Packaging",temp:55,vibration:2.1,rpm:980,status:"Healthy"},
  {id:"MCH-005",name:"Robotic Arm",department:"Assembly",temp:62,vibration:2.8,rpm:1600,status:"Healthy"}
];

const alerts = [
  {level:"critical",machine:"Hydraulic Press",message:"Temperature exceeded safe operating threshold",time:"2 min ago"},
  {level:"warning",machine:"Industrial Motor",message:"Abnormal vibration detected",time:"8 min ago"},
  {level:"info",machine:"CNC Milling Machine",message:"Routine inspection completed",time:"24 min ago"}
];

const app = document.querySelector("#app");

app.innerHTML = `
<div class="layout">
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-icon">?</div>
      <div><strong>FACTORY<span>OS</span></strong><small>INDUSTRIAL INTELLIGENCE</small></div>
    </div>

    <div class="nav-label">WORKSPACE</div>
    <nav>
      <a class="nav-link active" href="#overview">? <span>Overview</span></a>
      <a class="nav-link" href="#machines">? <span>Machines</span></a>
      <a class="nav-link" href="#analytics">? <span>Sensor Analytics</span></a>
      <a class="nav-link" href="#alerts">? <span>Alert Centre</span></a>
    </nav>

    <div class="nav-label">MANAGEMENT</div>
    <nav>
      <a class="nav-link" href="#maintenance">? <span>Maintenance</span></a>
      <a class="nav-link" href="#reports">? <span>Reports</span></a>
    </nav>

    <div class="sidebar-bottom">
      <div class="connection"><span class="pulse"></span> System operational</div>
      <small>SMART FACTORY HEALTH MONITOR</small>
      <small>VERSION 1.0.0</small>
    </div>
  </aside>

  <main class="main">
    <header class="topbar">
      <div>
        <div class="breadcrumb">WORKSPACE / OVERVIEW</div>
        <h1>Factory Overview</h1>
        <p class="muted">Monitor your industrial operations in real time.</p>
      </div>
      <div class="top-actions">
        <span class="demo-tag">? DEMO MODE</span>
        <button class="refresh-btn" id="refresh">? Refresh Data</button>
      </div>
    </header>

    <section class="welcome">
      <div>
        <div class="eyebrow">INDUSTRIAL MONITORING SYSTEM</div>
        <h2>Factory Intelligence Dashboard</h2>
        <p>Track machine performance, detect abnormalities and prevent unexpected downtime.</p>
      </div>
      <div class="welcome-mark">?</div>
    </section>

    <section class="metrics">
      <article class="metric-card">
        <div class="metric-top"><span>Total Machines</span><span class="metric-icon blue">?</span></div>
        <div class="metric-value" id="totalMachines">05</div>
        <div class="metric-foot">Registered equipment</div>
      </article>
      <article class="metric-card">
        <div class="metric-top"><span>Healthy Machines</span><span class="metric-icon green">?</span></div>
        <div class="metric-value" id="healthyMachines">03</div>
        <div class="metric-foot"><span class="green-text">Operating normally</span></div>
      </article>
      <article class="metric-card">
        <div class="metric-top"><span>Warning Status</span><span class="metric-icon amber">!</span></div>
        <div class="metric-value" id="warningMachines">01</div>
        <div class="metric-foot">Requires inspection</div>
      </article>
      <article class="metric-card">
        <div class="metric-top"><span>Critical Machines</span><span class="metric-icon red">?</span></div>
        <div class="metric-value" id="criticalMachines">01</div>
        <div class="metric-foot"><span class="red-text">Immediate attention</span></div>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel chart-panel" id="analytics">
        <div class="panel-heading">
          <div><h3>Sensor Analytics</h3><p>Temperature monitoring across the factory</p></div>
          <span class="live-label"><span class="pulse"></span> LIVE SIMULATION</span>
        </div>
        <div class="chart-wrap"><canvas id="sensorChart"></canvas></div>
      </article>

      <article class="panel alerts-panel" id="alerts">
        <div class="panel-heading">
          <div><h3>Recent Alerts</h3><p>Latest machine notifications</p></div>
          <span class="alert-count" id="alertCount">03</span>
        </div>
        <div id="alertList" class="alert-list"></div>
      </article>
    </section>

    <section class="panel machine-panel" id="machines">
      <div class="panel-heading machine-heading">
        <div><h3>Machine Registry</h3><p>Equipment status and operating conditions</p></div>
        <div class="table-tools">
          <input id="machineSearch" placeholder="Search machines..." />
          <select id="statusFilter">
            <option value="All">All Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>
      <div class="table-scroll">
        <table>
          <thead><tr><th>MACHINE</th><th>DEPARTMENT</th><th>TEMPERATURE</th><th>VIBRATION</th><th>RPM</th><th>HEALTH STATUS</th></tr></thead>
          <tbody id="machineRows"></tbody>
        </table>
      </div>
    </section>

    <footer>FACTORYOS © 2026 <span>SMART INDUSTRIAL MONITORING PLATFORM</span><span>DEVELOPMENT BUILD 1.0</span></footer>
  </main>
</div>`;

function renderMachines() {
  const search = document.querySelector("#machineSearch").value.toLowerCase();
  const filter = document.querySelector("#statusFilter").value;

  const filtered = machines.filter(m =>
    (m.name.toLowerCase().includes(search) || m.id.toLowerCase().includes(search)) &&
    (filter === "All" || m.status === filter)
  );

  document.querySelector("#machineRows").innerHTML = filtered.map(m => `
    <tr>
      <td><strong>${m.name}</strong><small>${m.id}</small></td>
      <td>${m.department}</td>
      <td>${m.temp} °C</td>
      <td>${m.vibration.toFixed(1)} mm/s</td>
      <td>${m.rpm.toLocaleString()}</td>
      <td><span class="status ${m.status.toLowerCase()}">${m.status}</span></td>
    </tr>
  `).join("") || '<tr><td colspan="6" class="empty">No machines found.</td></tr>';
}

function updateMetrics() {
  document.querySelector("#totalMachines").textContent = String(machines.length).padStart(2,"0");
  document.querySelector("#healthyMachines").textContent = String(machines.filter(m=>m.status==="Healthy").length).padStart(2,"0");
  document.querySelector("#warningMachines").textContent = String(machines.filter(m=>m.status==="Warning").length).padStart(2,"0");
  document.querySelector("#criticalMachines").textContent = String(machines.filter(m=>m.status==="Critical").length).padStart(2,"0");
}

function renderAlerts() {
  document.querySelector("#alertCount").textContent = String(alerts.length).padStart(2,"0");
  document.querySelector("#alertList").innerHTML = alerts.map(a => `
    <div class="alert-item">
      <span class="alert-dot ${a.level}"></span>
      <div class="alert-content">
        <strong>${a.machine}</strong>
        <p>${a.message}</p>
        <small>${a.time}</small>
      </div>
    </div>
  `).join("");
}

const chart = new Chart(document.querySelector("#sensorChart"), {
  type:"line",
  data:{
    labels:["09:00","09:10","09:20","09:30","09:40","09:50","10:00"],
    datasets:[{
      label:"Temperature",
      data:[61,65,63,69,66,72,68],
      borderColor:"#38bdf8",
      backgroundColor:"rgba(56,189,248,0.10)",
      fill:true,
      tension:0.4,
      pointRadius:3,
      pointBackgroundColor:"#38bdf8"
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{
      x:{grid:{display:false},ticks:{color:"#8492a8"}},
      y:{grid:{color:"rgba(148,163,184,0.10)"},ticks:{color:"#8492a8"},title:{display:true,text:"Temperature (°C)",color:"#8492a8"}}
    }
  }
});

document.querySelector("#machineSearch").addEventListener("input",renderMachines);
document.querySelector("#statusFilter").addEventListener("change",renderMachines);

document.querySelector("#refresh").addEventListener("click",() => {
  machines.forEach(m => {
    m.temp = Math.max(35,Math.min(100,m.temp + Math.round((Math.random()-0.5)*6)));
    m.vibration = Math.max(0.5,Math.min(12,m.vibration + (Math.random()-0.5)*0.6));
    m.status = m.temp >= 85 || m.vibration >= 7.5 ? "Critical" :
               m.temp >= 75 || m.vibration >= 5.5 ? "Warning" : "Healthy";
  });

  chart.data.datasets[0].data.push(machines[0].temp);
  chart.data.datasets[0].data.shift();
  chart.update();
  renderMachines();
  updateMetrics();
  document.querySelector("#refresh").textContent = "? Updated";
  setTimeout(() => document.querySelector("#refresh").textContent = "? Refresh Data",1000);
});

renderMachines();
updateMetrics();
renderAlerts();
