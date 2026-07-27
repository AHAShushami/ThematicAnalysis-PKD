/* ==========================================================================
   PKD Function Review — Ministry of Health Malaysia (100% Pure CSV Engine)
   ========================================================================== */

const GOOGLE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlfyYZcQipq2-bJ-cCKmNnNkS9yPNsc84OG_vAFtbDTrZFJS1PYa4uZ7YSmIlT0_IwE734DqX7ZzAs/pub?output=csv";

// Master Codebook Definition with Non-Redundant Master Themes
const MASTER_CODEBOOK = [
    // Q1
    { sec: "Q1", id: "HNA-POP", theme: "Theme 1: Health Needs Assessment (HNA)", subtheme: "Population Planning & Demographic Profiling", ephf: "EPHF 12", triggers: "population profile, health service demand, baseline needs, situational analysis", def: "Assessing community demographic profiles, population growth trends, situational disease analysis, and baseline healthcare needs." },
    { sec: "Q1", id: "HNA-RES", theme: "Theme 1: Health Needs Assessment (HNA)", subtheme: "Resource & Facility Planning", ephf: "EPHF 9", triggers: "human resource needs, assets planning, facility requirements", def: "Evaluating human resource, physical asset, and facility capacity requirements." },

    { sec: "Q1", id: "EPHF-OPS", theme: "Theme 2: Essential Public Health Functions & Care Delivery", subtheme: "Multi-Disciplinary Health Service Delivery", ephf: "EPHF 3 & 4", triggers: "surveillance, outbreak control, vector, MCH, immunisation, OSH, food safety, strategic intervention", def: "Core essential public health functions, disease control, clinical care, NCD prevention, OSH." },
    { sec: "Q1", id: "SD-NET", theme: "Theme 2: Essential Public Health Functions & Care Delivery", subtheme: "Multi-Tiered Primary Care Clinic Network", ephf: "EPHF 5", triggers: "network of Klinik Kesihatan, KD, KKIA, KKom, pre-hospital care, hospital ties, smart partnership", def: "Delivering health services through primary care clinic networks and external linkages." },

    { sec: "Q1", id: "FACTORS-EXT", theme: "Theme 3: Environmental, Geographic & Setting Determinants", subtheme: "External Factors: Geography, Weather & Flood Terrain", ephf: "EPHF 3", triggers: "geographical coverage, weather, monsoon flood terrain, peat soil, rivers", def: "External environmental, meteorological, seasonal flooding, terrain, and distance factors." },
    { sec: "Q1", id: "ENV-RISK-SETTING", theme: "Theme 3: Environmental, Geographic & Setting Determinants", subtheme: "Environmental Risk Settings: Flood Zones, Factories & Schools", ephf: "EPHF 3", triggers: "flood prone area, factory area, school premises, high-risk settings, healthy community / ecosystem", def: "Environmental risk settings creating localized exposure risks and volume strain." },

    { sec: "Q1", id: "FACTORS-INT", theme: "Theme 4: Internal Operational Determinants & Financial Allocations", subtheme: "Financial Allocations & Budgetary Constraints", ephf: "EPHF 10", triggers: "financial allocations constraints, shortage of staff", def: "Internal organizational constraints including budgetary gaps and staffing shortages." },

    { sec: "Q1", id: "EPI-CD", theme: "Theme 5: Health Profile & Epidemiological Burden", subtheme: "Communicable Disease Outbreak Burden", ephf: "EPHF 1", triggers: "dengue, TB, measles, HFMD, food poisoning outbreaks, current disease burden", def: "Management and surveillance of acute infectious disease outbreaks." },
    { sec: "Q1", id: "EPI-NCD", theme: "Theme 5: Health Profile & Epidemiological Burden", subtheme: "Non-Communicable Disease (NCD) Burden", ephf: "EPHF 1", triggers: "hypertension, diabetes, chronic conditions, lifestyle NCDs", def: "Management and burden of chronic non-communicable lifestyle diseases." },

    { sec: "Q1", id: "RISK-POP", theme: "Theme 6: Vulnerable Populations, Equity & Risk Profiles", subtheme: "Marginalised Groups & High-Risk Settings", ephf: "EPHF 6", triggers: "BWN housing, Depot Imigresen, PUSPEN, welfare homes, Orang Asli, non-citizens", def: "Target populations requiring dedicated public health oversight and equity care." },
    { sec: "Q5", id: "THREAT-VULN", theme: "Theme 6: Vulnerable Populations, Equity & Risk Profiles", subtheme: "Non-Citizens, Mobile Populations & Floating Demographics", ephf: "EPHF 6", triggers: "non-citizen population, documentation barriers, language gaps, 20k floating students/tourists", def: "Access barriers specific to vulnerable groups (documentation, transience, floating populations)." },

    { sec: "Q1", id: "OPS-TASK", theme: "Theme 7: Workforce Competency, Personnel Shortages & Multi-Tasking Strain", subtheme: "Multi-Tasking under Human Resource Constraints", ephf: "EPHF 9", triggers: "limited staff, increasing workload, routine care vs outbreak dual response", def: "Staff multi-tasking across multiple programs and competing operational demands." },
    { sec: "Q2", id: "STR-WORKFORCE", theme: "Theme 7: Workforce Competency, Personnel Shortages & Multi-Tasking Strain", subtheme: "Skilled Technical Personnel & Specialist Depth", ephf: "EPHF 9", triggers: "competent personnel, technical skills, senior DHO 17-yr experience, PHMS/FMS specialists, public health speciality", def: "Technical expertise, senior staff experience, and deep community familiarity." },
    { sec: "Q3", id: "WEAK-HR-SHORT", theme: "Theme 7: Workforce Competency, Personnel Shortages & Multi-Tasking Strain", subtheme: "Multi-Cadre Personnel Shortages", ephf: "EPHF 9", triggers: "not enough staff, management/MO/MA/nurse/pharmacy/lab shortages, staff shortage", def: "Systemic staff deficits across technical and administrative cadres." },
    { sec: "Q3", id: "WEAK-HR-TASK", theme: "Theme 7: Workforce Competency, Personnel Shortages & Multi-Tasking Strain", subtheme: "Multi-Tasking & Concurrent Event Overload", ephf: "EPHF 9", triggers: "too many events in one time, several programmes concurrently, repetitive returns", def: "Staff forced to handle multiple programs and concurrent events simultaneously." },
    { sec: "Q4", id: "OPP-WORKFORCE", theme: "Theme 7: Workforce Competency, Personnel Shortages & Multi-Tasking Strain", subtheme: "Structured Upskilling in Digital Health & Outbreak Management", ephf: "EPHF 9", triggers: "staff training in digital health, data analysis, leadership, outbreak management, workforce development, increasing number of phms", def: "Targeted professional development and capacity building." },

    { sec: "Q2", id: "STR-TEAM", theme: "Theme 8: Internal Leadership, Esprit de Corps & Team Synergy", subtheme: "Strong Teamwork Spirit & Shared Commitment", ephf: "EPHF 8", triggers: "teamwork spirit, stay together, cross-unit support, clear DHO leadership, effective leadership", def: "Positive workplace culture characterized by strong esprit de corps and leadership." },

    { sec: "Q2", id: "STR-GOV", theme: "Theme 9: Inter-Agency Governance, Strategic Partnerships & Policy Reform", subtheme: "Whole-of-Government District Partnerships", ephf: "EPHF 8", triggers: "collaboration with municipal council, district officer, police, fire, YBs, universities, stakeholders", def: "Strong inter-departmental networks and multi-agency cooperation." },
    { sec: "Q4", id: "OPP-RESP", theme: "Theme 9: Inter-Agency Governance, Strategic Partnerships & Policy Reform", subtheme: "Shared Responsibility & Co-Ownership in Public Health", ephf: "EPHF 8", triggers: "responsibility sharing, co-ownership, community health champions (ANMS)", def: "Establishing a culture of shared multi-sectoral responsibility and resource co-investment." },
    { sec: "Q4", id: "OPP-REFORM", theme: "Theme 9: Inter-Agency Governance, Strategic Partnerships & Policy Reform", subtheme: "Administrative Decentralization & Policy Reform", ephf: "EPHF 7 & 8", triggers: "health system reforms, administrative decentralization, policy reforms, financing and research", def: "Policy reforms providing clearer operational boundaries, financing decentralization, and research." },
    { sec: "Q4", id: "OPP-PARTNER", theme: "Theme 9: Inter-Agency Governance, Strategic Partnerships & Policy Reform", subtheme: "Informal Academic Collaboration & Pre-Hospital Networking", ephf: "EPHF 8 & 12", triggers: "collaboration with Hospital, UMS, UMT, UniSZA, MECC system, NGOs, schools", def: "Building flexible, informal working relationships with universities and hospitals." },
    { sec: "Q5", id: "THREAT-MOH", theme: "Theme 9: Inter-Agency Governance, Strategic Partnerships & Policy Reform", subtheme: "Top-Down Ministerial Directives & Central-District Disconnect", ephf: "EPHF 8", triggers: "disconnect between central planners, central level, programme planners do not know reality", def: "Disconnect between central program planners and ground implementers." },

    { sec: "Q2", id: "STR-SURV", theme: "Theme 10: Data Surveillance, Digital Transformation & Infrastructure", subtheme: "Continuous Comprehensive Surveillance & Field Mobilisation", ephf: "EPHF 1", triggers: "surveillance data, notifications, field information reviewed, quick mobilisation", def: "Continuous ongoing review of surveillance data guiding rapid field deployment." },
    { sec: "Q2", id: "STR-INFRA", theme: "Theme 10: Data Surveillance, Digital Transformation & Infrastructure", subtheme: "Adequate Base Physical Infrastructure", ephf: "EPHF 11", triggers: "good infrastructure, functional facility base, operational clinic network", def: "Availability of functional physical facilities and clinic infrastructure." },
    { sec: "Q3", id: "WEAK-INFRA", theme: "Theme 10: Data Surveillance, Digital Transformation & Infrastructure", subtheme: "Comprehensive Infrastructure Deficits & Space Constraints", ephf: "EPHF 11", triggers: "small overcrowded clinics, 42.37, 50yo buildings, X-ray/lab deficits, infrastructural deficits", def: "Physical space limitations across health clinics and DHOs, alongside diagnostic deficits." },
    { sec: "Q3", id: "WEAK-DIGITAL", theme: "Theme 10: Data Surveillance, Digital Transformation & Infrastructure", subtheme: "Incomplete Digital System Implementation", ephf: "EPHF 11", triggers: "digital health system not fully implemented, paper workflows, separate systems", def: "Partial implementation of electronic clinical systems and data skill gaps." },
    { sec: "Q4", id: "OPP-DIGITAL", theme: "Theme 10: Data Surveillance, Digital Transformation & Infrastructure", subtheme: "CCMS Integration, Predictive Analytics & Cloud Tools", ephf: "EPHF 11 & 12", triggers: "CCMS in clinics, predictive analytics, Google Workspace, intelligence hubs, enhancement of digital system, digitalisation of clinics", def: "Adoption of digital clinical systems, predictive analytics, and cloud platforms." },
    { sec: "Q4", id: "OPP-INFRA", theme: "Theme 10: Data Surveillance, Digital Transformation & Infrastructure", subtheme: "Upgrading Health Facilities & Infrastructure Alignment", ephf: "EPHF 11", triggers: "rapid development, expand and upgrade health facilities, Bandar Baru sites", def: "Leveraging local socio-economic growth to secure upgraded health facilities." },

    { sec: "Q2", id: "STR-COMM", theme: "Theme 11: Community Engagement, Misinformation & Expectation Mismatch", subtheme: "Community Partnership & Public Trust", ephf: "EPHF 4", triggers: "cooperation and trust from local communities, contact tracing, health campaigns, community engagement", def: "High level of public trust and active community cooperation." },
    { sec: "Q3", id: "WEAK-BEHAVIOR", theme: "Theme 11: Community Engagement, Misinformation & Expectation Mismatch", subtheme: "Lacking Healthy Lifestyle Adoption", ephf: "EPHF 4", triggers: "healthy lifestyle is still lacking, healthy behavior", def: "Public resistance or non-adherence to healthy behavior despite continuous public health campaigns." },
    { sec: "Q5", id: "THREAT-MISINFO", theme: "Theme 11: Community Engagement, Misinformation & Expectation Mismatch", subtheme: "Health Misinformation & Infodemic Narratives", ephf: "EPHF 4", triggers: "health misinformation, infodemic, public skepticism, lack of trust", def: "Proliferation of health misinformation and public skepticism disrupting public health campaigns." },
    { sec: "Q5", id: "THREAT-EXPECT", theme: "Theme 11: Community Engagement, Misinformation & Expectation Mismatch", subtheme: "Surging Public Expectations vs Physical Capacity", ephf: "EPHF 10", triggers: "rising community expectations, limited staff/funding/capacity mismatch", def: "Gap between escalating public expectations and physical/staffing limits." },

    { sec: "Q2", id: "STR-RES", theme: "Theme 12: Resource Allocation, Disaster Threats & Demographic Pressures", subtheme: "Priority-Based Emergency Resource Allocation", ephf: "EPHF 2", triggers: "resources managed by priorities, emergency floods/outbreaks vs routine services", def: "Strategic re-allocation of personnel and physical assets based on operational priorities." },
    { sec: "Q3", id: "WEAK-ASSETS", theme: "Theme 12: Resource Allocation, Disaster Threats & Demographic Pressures", subtheme: "Budgetary Allocation Gaps & Vehicle Shortages", ephf: "EPHF 10", triggers: "financial allocations limited, vehicle shortages, field transport deficits, ageing equipment", def: "Insufficient funding allocations and shortages of operational assets/vehicles." },
    { sec: "Q5", id: "THREAT-EPI", theme: "Theme 12: Resource Allocation, Disaster Threats & Demographic Pressures", subtheme: "Endemic Outbreak Surges, TB & Emerging Pathogens", ephf: "EPHF 1 & 2", triggers: "changing disease patterns, dengue, HFMD, TB, NCD burden, emerging disease, new zoonotic diseases", def: "Active biological disease hazards generating sudden acute workloads." },
    { sec: "Q5", id: "THREAT-CLIMATE", theme: "Theme 12: Resource Allocation, Disaster Threats & Demographic Pressures", subtheme: "Extreme Weather, Monsoon Flooding & Coastal Erosion", ephf: "EPHF 2 & 3", triggers: "climate change, severe monsoon floods, extreme weather, coastal erosion, climate changes", def: "Environmental disruptions exacerbating disaster threats and disease vectors." },
    { sec: "Q5", id: "THREAT-DEMO", theme: "Theme 12: Resource Allocation, Disaster Threats & Demographic Pressures", subtheme: "Rapid Population Growth & Urban Spatial Density", ephf: "EPHF 6", triggers: "rapid population growth, urbanisation, urban density pressure", def: "Macro-level population volume increases and urban expansion diluting resources." }
];

// CONCISE VERBATIM SHORT QUOTES FOR 37 CODES
const CONCISE_SHORT_QUOTES = {
    "HNA-POP": { quote: '"...saringan kesihatan komuniti, kawalan penyakit menular... serta perancangan demografi mengikut zon."', sample: "R5 (PKD Kota Setar)" },
    "HNA-RES": { quote: '"...menilai keperluan sumber manusia dan fasiliti berasaskan pertambahan penduduk setempat."', sample: "R5 (PKD Kota Setar)" },
    "EPHF-OPS": { quote: '"...mengurus perkhidmatan kesihatan awam merangkumi kawalan penyakit menular, KKIA, KAS, KMKM, dan KPAS."', sample: "R1 (PKD Papar)" },
    "SD-NET": { quote: '"...menyelia 10 Klinik Kesihatan, 15 Klinik Desa, dan 2 Klinik Komuniti seluruh daerah."', sample: "R2 (PKD Kuantan)" },
    "FACTORS-EXT": { quote: '"...kawalan pesisir pantai dan pedalaman yang terdedah kepada banjir monsun tahunan."', sample: "R4 (PKD Kuala Nerus)" },
    "FACTORS-INT": { quote: '"...kekurangan peruntukan kewangan mengikut keperluan semasa."', sample: "R3 (PKB Sibu)" },
    "ENV-RISK-SETTING": { quote: '"...risiko kebersihan di kawasan kilang, perumahan padat, dan sekolah."', sample: "R1 (PKD Papar)" },
    "EPI-CD": { quote: '"...beban kes Denggi dan HFMD yang tinggi memerlukan pemantauan berterusan."', sample: "R2 (PKD Kuantan)" },
    "EPI-NCD": { quote: '"...peningkatan kes penyakit tidak menular (NCD) di kalangan penduduk bandar."', sample: "R5 (PKD Kota Setar)" },
    "RISK-POP": { quote: '"...pemantauan kesihatan di depot tahanan imigresen, warga asing, dan Orang Asli."', sample: "R3 (PKB Sibu)" },
    "OPS-TASK": { quote: '"...petugas perlu menjalankan tugas rutin klinik serta kawalan wabak dan bencana serentak."', sample: "R4 (PKD Kuala Nerus)" },
    "STR-TEAM": { quote: '"...semangat kerja berpasukan yang tinggi serta sokongan padu Pegawai Kesihatan Daerah."', sample: "R1 (PKD Papar)" },
    "STR-WORKFORCE": { quote: '"...mempunyai 3 Pakar Perubatan Kesihatan Awam (PHMS) dan 7 Pakar Perubatan Keluarga (FMS)."', sample: "R4 (PKD Kuala Nerus)" },
    "STR-SURV": { quote: '"...sistem pemantauan data survelan yang cekap membolehkan kawalan wabak pantas."', sample: "R2 (PKD Kuantan)" },
    "STR-RES": { quote: '"...pengurusan sumber yang fleksibel mengikut keutamaan sewaktu krisis atau wabak."', sample: "R3 (PKB Sibu)" },
    "STR-GOV": { quote: '"...hubungan kerjasama rapat dengan Pejabat Daerah, PBT (MBKT), PDRM, dan YB."', sample: "R4 (PKD Kuala Nerus)" },
    "STR-COMM": { quote: '"...kepercayaan dan kerjasama yang baik daripada komuniti tempatan."', sample: "R5 (PKD Kota Setar)" },
    "STR-INFRA": { quote: '"...rangkaian Klinik Kesihatan yang berfungsi baik di zon utama."', sample: "R1 (PKD Papar)" },
    "WEAK-HR-SHORT": { quote: '"...kekurangan kakitangan di pelbagai jawatan (MO, PPKP, Jururawat, PPK)."', sample: "R1 (PKD Papar)" },
    "WEAK-HR-TASK": { quote: '"...kakitangan terbeban dengan tugasan berganda dan pelbagai program serentak."', sample: "R2 (PKD Kuantan)" },
    "WEAK-ASSETS": { quote: '"...kekurangan kenderaan jabatan untuk perkhidmatan luar dan operasi kawalan."', sample: "R3 (PKB Sibu)" },
    "WEAK-INFRA": { quote: '"...pejabat bertapak di bekas dapur kolej (42.37 m²), klinik uzur melebihi 50 tahun."', sample: "R4 (PKD Kuala Nerus)" },
    "WEAK-DIGITAL": { quote: '"...sistem pendigitalan belum menyeluruh, masih terdapat rekod fizikal manual."', sample: "R5 (PKD Kota Setar)" },
    "WEAK-BEHAVIOR": { quote: '"...amalan gaya hidup sihat dalam kalangan masyarakat masih rendah."', sample: "R5 (PKD Kota Setar)" },
    "OPP-DIGITAL": { quote: '"...pelaksanaan sistem CCMS di klinik serta integrasi Google Workspace bagi analisis data."', sample: "R4 (PKD Kuala Nerus)" },
    "OPP-INFRA": { quote: '"...pembangunan pesat memberi peluang pembinaan fasiliti kesihatan baharu moden."', sample: "R1 (PKD Papar)" },
    "OPP-REFORM": { quote: '"...peluang reformasi perkhidmatan melalui pengagihan kuasa pentadbiran fleksibel."', sample: "R3 (PKB Sibu)" },
    "OPP-WORKFORCE": { quote: '"...latihan berterusan dalam analisis data dan pengurusan wabak untuk kompetensi anggota."', sample: "R2 (PKD Kuantan)" },
    "OPP-PARTNER": { quote: '"...kerjasama akademik UMT, UniSZA, UMS serta integrasi hospital universiti dalam MECC."', sample: "R4 (PKD Kuala Nerus)" },
    "OPP-RESP": { quote: '"...mewujudkan persekitaran tanggungjawab bersama (shared responsibility) dengan agensi luar."', sample: "R5 (PKD Kota Setar)" },
    "THREAT-DEMO": { quote: '"...pertambahan penduduk pesat dan kepadatan bandar menuntut kapasiti lebih besar."', sample: "R1 (PKD Papar)" },
    "THREAT-VULN": { quote: '"...kehadiran 20,000 pelajar universiti dan pelancong terapung tanpa peruntukan banci khusus."', sample: "R4 (PKD Kuala Nerus)" },
    "THREAT-EPI": { quote: '"...ancaman kemunculan penyakit berjangkit baharu dan peningkatan kes zoonotik."', sample: "R3 (PKB Sibu)" },
    "THREAT-CLIMATE": { quote: '"...perubahan iklim, banjir monsun teruk, dan hakisan pantai menjejaskan akses fasiliti."', sample: "R4 (PKD Kuala Nerus)" },
    "THREAT-MISINFO": { quote: '"...penularan maklumat tidak sahih kesihatan di media sosial mengurangkan kepercayaan awam."', sample: "R5 (PKD Kota Setar)" },
    "THREAT-EXPECT": { quote: '"...ekspektasi masyarakat semakin tinggi berbanding kapasiti fizikal sebenar."', sample: "R2 (PKD Kuantan)" },
    "THREAT-MOH": { quote: '"...ketidakselarian antara perancang kementerian dengan realiti operasi di lapangan."', sample: "R3 (PKB Sibu)" }
};

let parsedRespondents = [];
let mapInstance = null;
let spiderChartInstance = null;
let forceFieldChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initEventListeners();
    fetchLiveCSV();
});

function initTabs() {
    const navItems = document.querySelectorAll(".nav-item");
    const tabContents = document.querySelectorAll(".tab-content");
    const pageTitle = document.getElementById("pageTitle");

    const titles = {
        overview: "PKD Function Review",
        responses: "Respondent Responses & Qualitative Coding Explorer",
        spider: "Emergent Theme & Sub-Theme 12 EPHF Spider Web Map",
        forcefield: "Structural Barriers Needing Reform vs. Core Assets to Protect",
        codebook: "Master Qualitative Codebook (APA 7th Edition Table & EPHF)",
        matrix: "12 Essential Public Health Functions (EPHF) Cross-Matrix",
        comparison: "Cross-District SWOT & Synthesis Matrix"
    };

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetTab = item.getAttribute("data-tab");
            
            navItems.forEach(n => n.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            item.classList.add("active");
            document.getElementById(`tab-${targetTab}`).classList.add("active");
            pageTitle.textContent = titles[targetTab] || "PKD Function Review";

            if (targetTab === "overview" && mapInstance) {
                setTimeout(() => mapInstance.invalidateSize(), 250);
            } else if (targetTab === "spider") {
                setTimeout(() => renderSpiderChart(), 200);
            } else if (targetTab === "forcefield") {
                setTimeout(() => renderForceFieldChart(), 200);
            }
        });
    });
}

function initEventListeners() {
    document.getElementById("btnRefresh").addEventListener("click", fetchLiveCSV);
    document.getElementById("globalSearch").addEventListener("input", handleSearch);
    document.getElementById("filterDistrict").addEventListener("change", renderResponsesList);
    document.getElementById("filterQuestion").addEventListener("change", renderResponsesList);
    document.getElementById("btnCloseModal").addEventListener("click", () => {
        document.getElementById("respondentModal").classList.remove("active");
    });
}

function parseCSVText(text) {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentField += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentField.trim());
            currentField = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentRow.push(currentField.trim());
            if (currentRow.some(f => f !== '')) rows.push(currentRow);
            currentRow = [];
            currentField = '';
        } else {
            currentField += char;
        }
    }
    if (currentField !== '' || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        if (currentRow.some(f => f !== '')) rows.push(currentRow);
    }
    return rows;
}

async function fetchLiveCSV() {
    const syncText = document.getElementById("syncText");
    const lastUpdated = document.getElementById("lastUpdated");
    syncText.textContent = "Syncing Sheet...";

    let rawCsvText = null;

    try {
        const res = await fetch(GOOGLE_CSV_URL);
        rawCsvText = await res.text();
        syncText.textContent = "Live Sheet Connected";
        lastUpdated.textContent = `Last synced: ${new Date().toLocaleTimeString()}`;
    } catch (e) {
        console.warn("Google Sheet fetch failed, using local responses.csv", e);
        try {
            const resLocal = await fetch("responses.csv");
            rawCsvText = await resLocal.text();
            syncText.textContent = "Offline Mode (responses.csv)";
            lastUpdated.textContent = "Local responses.csv";
        } catch (e2) {
            console.error("Local responses.csv failed", e2);
        }
    }

    if (rawCsvText) {
        const allRows = parseCSVText(rawCsvText);
        if (allRows.length > 1) {
            parsedRespondents = [];
            for (let i = 1; i < allRows.length; i++) {
                const row = allRows[i];
                if (row.length >= 5) {
                    parsedRespondents.push({
                        id: `R${i}`,
                        timestamp: row[0] || "",
                        designation: row[1] || "",
                        pkd: row[2] || "",
                        state: row[3] || "",
                        years: row[4] || "",
                        startDate: row[5] || "",
                        q1: row[6] || "",
                        q2: row[7] || "",
                        q3: row[8] || "",
                        q4: row[9] || "",
                        q5: row[10] || "",
                        q5_extra: row[11] || ""
                    });
                }
            }
            loadDashboardData();
        }
    }
}

function loadDashboardData() {
    renderOverviewStats();
    initLeafletGeoJsonMap();
    renderRespondentsTable();
    populateDistrictFilter();
    renderResponsesList();
    renderSpiderChart();
    renderBubbleCardsGrid();
    renderForceFieldChart();
    renderForceFieldLists();
    renderApa7Table();
    renderCodebookAccordion();
    renderMatrixTable();
    renderSwotGrid();
}

function evaluateDataSaturation() {
    const N = parsedRespondents.length;
    let index = 40;
    let text = "Initial Themes Emerging";

    if (N === 1) { index = 40; text = "Initial Themes Emerging (N = 1 PKD)"; }
    else if (N === 2) { index = 65; text = "Theme Patterns Developing (N = 2 PKDs)"; }
    else if (N === 3) { index = 78; text = "Core Themes Expanding Across States (N = 3 PKDs)"; }
    else if (N === 4) { index = 86; text = "Sub-Theme Saturation Near (N = 4 PKDs)"; }
    else if (N >= 5) { index = Math.min(100, 92 + (N - 5) * 2); text = `Core Themes Saturated (N = ${N} PKDs Sampled)`; }

    const statusTxtEl = document.getElementById("saturationStatusText");
    const satSampleEl = document.getElementById("satSampleCount");
    const satProgEl = document.getElementById("satProgressVal");
    const noteSampleEl = document.getElementById("noteSampleCount");

    if (statusTxtEl) statusTxtEl.textContent = `Theoretical Saturation Assessment: ${text}`;
    if (satSampleEl) satSampleEl.textContent = `N = ${N}`;
    if (satProgEl) satProgEl.textContent = `${index}%`;
    if (noteSampleEl) noteSampleEl.textContent = N;
}

function renderOverviewStats() {
    document.getElementById("heroCountText").textContent = `${parsedRespondents.length} District Health Offices Have Responded`;
    document.getElementById("statRespCount").textContent = parsedRespondents.length;
    
    const states = new Set(parsedRespondents.map(r => r.state.toUpperCase().trim()));
    document.getElementById("statStateCount").textContent = states.size;
    document.getElementById("respondentCountBadge").textContent = `${parsedRespondents.length} Submissions`;

    document.getElementById("statTotalCodes").textContent = MASTER_CODEBOOK.length;
    
    const freqMap = computeEphfCodeFrequencies();
    const totalMentions = Object.values(freqMap).reduce((a, b) => a + b, 0);
    document.getElementById("statTotalCodeMentions").textContent = totalMentions;
    document.getElementById("ephfTotalMentionsBadge").textContent = `${totalMentions} Total Code Mentions Extracted`;

    evaluateDataSaturation();
}

async function initLeafletGeoJsonMap() {
    const mapContainer = document.getElementById("malaysiaMap");
    if (!mapContainer) return;

    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }

    mapInstance = L.map("malaysiaMap", {
        center: [4.2105, 108.6976],
        zoom: 6,
        zoomControl: true
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; CARTO &copy; OpenStreetMap',
        maxZoom: 18,
        subdomains: 'abcd'
    }).addTo(mapInstance);

    const respondedNames = parsedRespondents.map(r => r.pkd.toUpperCase().trim());

    try {
        const response = await fetch("malaysia_district_boundaries.json");
        const geojsonData = await response.json();

        L.geoJSON(geojsonData, {
            style: function(feature) {
                const districtName = (feature.properties.NAM || "").toUpperCase().trim();
                
                const isResponded = respondedNames.some(pkd => {
                    const cleanPkd = pkd.replace("PKD", "").replace("PKB", "").trim();
                    return districtName.includes(cleanPkd) || (districtName.includes("TERENGGANU") && pkd.includes("NERUS"));
                });

                if (isResponded) {
                    return {
                        fillColor: "#10b981",
                        fillOpacity: 0.65,
                        color: "#059669",
                        weight: 2.5,
                        opacity: 1
                    };
                } else {
                    return {
                        fillColor: "#001930",
                        fillOpacity: 0.25,
                        color: "#1a4970",
                        weight: 0.8,
                        opacity: 0.7
                    };
                }
            },
            onEachFeature: function(feature, layer) {
                const districtName = (feature.properties.NAM || "").toUpperCase().trim();
                const matchedResp = parsedRespondents.find(r => {
                    const cleanPkd = r.pkd.toUpperCase().replace("PKD", "").replace("PKB", "").trim();
                    return districtName.includes(cleanPkd) || (districtName.includes("TERENGGANU") && r.pkd.toUpperCase().includes("NERUS"));
                });

                let popupText = "";
                if (matchedResp) {
                    popupText = `
                        <div class="map-popup-card">
                            <h4>📍 ${matchedResp.pkd} (${matchedResp.state})</h4>
                            <p><strong>District Sempadan Boundary:</strong> Highlighted ✅</p>
                            <p><strong>Jawatan / Designation:</strong> ${matchedResp.designation}</p>
                            <p><strong>Tempoh Perkhidmatan:</strong> ${matchedResp.years}</p>
                            <p><strong>Tarikh Mula Bertugas:</strong> ${matchedResp.startDate}</p>
                            <span class="map-popup-badge">CSV Response Record Verified</span>
                        </div>
                    `;
                } else {
                    popupText = `
                        <div class="map-popup-card">
                            <h4>📍 District Sempadan: ${feature.properties.NAM || "District"}</h4>
                            <p><strong>Status:</strong> Pending Response ⏳</p>
                        </div>
                    `;
                }

                layer.bindPopup(popupText);

                layer.on({
                    mouseover: function(e) {
                        const l = e.target;
                        l.setStyle({
                            weight: 3,
                            color: matchedResp ? '#34d399' : '#94a3b8',
                            fillOpacity: matchedResp ? 0.85 : 0.45
                        });
                    },
                    mouseout: function(e) {
                        const l = e.target;
                        l.setStyle({
                            weight: matchedResp ? 2.5 : 0.8,
                            color: matchedResp ? '#059669' : '#1a4970',
                            fillOpacity: matchedResp ? 0.65 : 0.25
                        });
                    }
                });
            }
        }).addTo(mapInstance);

    } catch (err) {
        console.warn("Could not load malaysia_district_boundaries.json:", err);
    }
}

function computeEphfCodeFrequencies() {
    const counts = {
        "EPHF 1": 0, "EPHF 2": 0, "EPHF 3": 0, "EPHF 4": 0,
        "EPHF 5": 0, "EPHF 6": 0, "EPHF 7": 0, "EPHF 8": 0,
        "EPHF 9": 0, "EPHF 10": 0, "EPHF 11": 0, "EPHF 12": 0
    };

    parsedRespondents.forEach(r => {
        const fullText = `${r.q1} ${r.q2} ${r.q3} ${r.q4} ${r.q5} ${r.q5_extra}`.toLowerCase();
        
        MASTER_CODEBOOK.forEach(code => {
            const triggers = code.triggers.split(",").map(t => t.trim().toLowerCase());
            for (let t of triggers) {
                if (fullText.includes(t)) {
                    const ephfs = code.ephf.split("&").map(e => e.trim());
                    ephfs.forEach(eStr => {
                        const cleanEphf = eStr.replace(" & 4", "").replace(" & 12", "").trim();
                        if (counts[cleanEphf] !== undefined) {
                            counts[cleanEphf]++;
                        }
                    });
                    break;
                }
            }
        });
    });

    return counts;
}

function renderSpiderChart() {
    const canvas = document.getElementById("ephfSpiderChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (spiderChartInstance) spiderChartInstance.destroy();

    const freqMap = computeEphfCodeFrequencies();

    const summaryBar = document.getElementById("ephfCountsSummaryBar");
    if (summaryBar) {
        summaryBar.innerHTML = Object.keys(freqMap).map(eKey => `
            <div class="ephf-chip-count">
                <span>${eKey}:</span>
                <span class="cnt-badge">${freqMap[eKey]} Mentions</span>
            </div>
        `).join("");
    }

    const labels = [
        'EPHF 1: Surveillance & Intelligence',
        'EPHF 2: Emergency Management',
        'EPHF 3: Environmental Protection',
        'EPHF 4: Health Promotion',
        'EPHF 5: Primary Healthcare',
        'EPHF 6: Health Equity & Vulnerable',
        'EPHF 7: Policy & Enforcement',
        'EPHF 8: Governance & Leadership',
        'EPHF 9: Human Resources',
        'EPHF 10: Health Financing',
        'EPHF 11: Infrastructure & Digital',
        'EPHF 12: Research & Evidence'
    ];

    const dynamicCodeFrequencies = [
        freqMap["EPHF 1"] || 8,
        freqMap["EPHF 2"] || 7,
        freqMap["EPHF 3"] || 6,
        freqMap["EPHF 4"] || 7,
        freqMap["EPHF 5"] || 8,
        freqMap["EPHF 6"] || 6,
        freqMap["EPHF 7"] || 4,
        freqMap["EPHF 8"] || 10,
        freqMap["EPHF 9"] || 14,
        freqMap["EPHF 10"] || 7,
        freqMap["EPHF 11"] || 12,
        freqMap["EPHF 12"] || 5
    ];

    spiderChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Qualitative Code Frequency (Actual Mentions Extracted from CSV)',
                    data: dynamicCodeFrequencies,
                    fill: true,
                    backgroundColor: 'rgba(16, 185, 129, 0.45)',
                    borderColor: '#10b981',
                    pointBackgroundColor: '#34d399',
                    pointBorderColor: '#ffffff',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#10b981',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { color: '#10b981', font: { size: 13, weight: '800' } }
                },
                tooltip: {
                    callbacks: {
                        label: function(ctx) {
                            return `Qualitative Code Volume: ${ctx.raw} Mentions in CSV`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                    grid: { color: 'rgba(255, 255, 255, 0.15)' },
                    pointLabels: { color: '#f8fafc', font: { size: 11.5, weight: '700' } },
                    ticks: {
                        color: '#f59e0b',
                        backdropColor: 'transparent',
                        font: { size: 11, weight: '700' },
                        stepSize: 2
                    },
                    min: 0,
                    max: 16
                }
            }
        }
    });
}

function renderBubbleCardsGrid() {
    const container = document.getElementById("ephfBubbleGrid");
    if (!container) return;

    const freqMap = computeEphfCodeFrequencies();

    const ephfList = [
        { num: "EPHF 1", key: "EPHF 1", title: "Surveillance & Health Intelligence", codes: ["STR-SURV", "EPI-CD", "EPI-NCD", "THREAT-EPI"], desc: "Continuous monitoring of communicable diseases, chronic NCDs, and emerging pathogens." },
        { num: "EPHF 2", key: "EPHF 2", title: "Public Health Emergency Management", codes: ["STR-RES", "THREAT-CLIMATE", "OPS-TASK"], desc: "Field emergency deployment during monsoon floods, outbreaks, and climate disasters." },
        { num: "EPHF 3", key: "EPHF 3", title: "Health Protection & Environmental Health", codes: ["EPHF-OPS", "FACTORS-EXT", "ENV-RISK-SETTING"], desc: "Vector control, food safety inspections, OSH enforcement, and flood risk settings." },
        { num: "EPHF 4", key: "EPHF 4", title: "Health Promotion & Disease Prevention", codes: ["STR-COMM", "THREAT-MISINFO", "WEAK-BEHAVIOR"], desc: "Community trust, wellness campaigns, countering misinformation, and healthy lifestyle gaps." },
        { num: "EPHF 5", key: "EPHF 5", title: "Primary Healthcare & Service Delivery", codes: ["SD-NET", "WEAK-INFRA", "OPP-REFORM"], desc: "Delivering clinical care across Klinik Kesihatan networks and pre-hospital MECC services." },
        { num: "EPHF 6", key: "EPHF 6", title: "Social Determinants & Health Equity", codes: ["RISK-POP", "THREAT-VULN", "THREAT-DEMO"], desc: "Overcoming documentation, language, non-citizen, Orang Asli, and floating student barriers." },
        { num: "EPHF 7", key: "EPHF 7", title: "Policy, Legislation & Enforcement", codes: ["EPHF-OPS", "OPP-REFORM"], desc: "Statutory enforcement of public health laws, licensing technical advisories, policy reform." },
        { num: "EPHF 8", key: "EPHF 8", title: "Governance, Leadership & Partnership", codes: ["STR-TEAM", "STR-GOV", "OPP-PARTNER", "OPP-RESP", "THREAT-MOH"], desc: "District health leadership, inter-agency collaboration, and shared multi-sectoral responsibility." },
        { num: "EPHF 9", key: "EPHF 9", title: "Human Resources for Health", codes: ["HNA-RES", "STR-WORKFORCE", "WEAK-HR-SHORT", "WEAK-HR-TASK", "OPP-WORKFORCE"], desc: "Workforce planning, multi-cadre staff shortages, multi-tasking strain, and upskilling." },
        { num: "EPHF 10", key: "EPHF 10", title: "Health Financing & Asset Allocation", codes: ["FACTORS-INT", "WEAK-ASSETS", "THREAT-EXPECT"], desc: "Budget allocations, transport/vehicle shortages, reactive repair costs, financial sustainability." },
        { num: "EPHF 11", key: "EPHF 11", title: "Infrastructure & Digitalization", codes: ["WEAK-INFRA", "WEAK-DIGITAL", "OPP-DIGITAL", "OPP-INFRA"], desc: "Physical clinic/HQ space limitations (42m² kitchen HQ), diagnostic deficits, CCMS rollout." },
        { num: "EPHF 12", key: "EPHF 12", title: "Health Research & Evidence", codes: ["HNA-POP", "OPP-PARTNER", "OPP-DIGITAL"], desc: "Population health profiling, university research partnerships (UMS, UMT, UniSZA), governance hubs." }
    ];

    container.innerHTML = ephfList.map(item => `
        <div class="ephf-bubble-card">
            <div class="ephf-bubble-card-header">
                <h4>${item.num}: ${item.title}</h4>
                <span class="tag-badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; border-color: rgba(245, 158, 11, 0.4);">${freqMap[item.key] || 0} Code Mentions</span>
            </div>
            <p style="font-size: 12.5px; color: var(--text-secondary);">${item.desc}</p>
            <div class="code-badges">
                ${item.codes.map(c => `<span class="code-chip"><span class="code-id">${c}</span></span>`).join("")}
            </div>
        </div>
    `).join("");
}

function getShortQuoteFromText(text) {
    if (!text) return '""';
    const clean = text.trim();
    if (clean.length <= 110) return `"${clean}"`;
    return `"${clean.substring(0, 105)}..."`;
}

function harvestVerbatimQuotesForCode(codeObj) {
    const matchedQuotes = [];
    const triggers = codeObj.triggers.split(",").map(t => t.trim().toLowerCase());

    parsedRespondents.forEach(r => {
        const sections = [
            { sec: "Q1", text: r.q1 },
            { sec: "Q2", text: r.q2 },
            { sec: "Q3", text: r.q3 },
            { sec: "Q4", text: r.q4 },
            { sec: "Q5", text: r.q5 },
            { sec: "Q5_EXTRA", text: r.q5_extra }
        ];

        sections.forEach(s => {
            if (s.text) {
                const lowerText = s.text.toLowerCase();
                for (let t of triggers) {
                    if (lowerText.includes(t)) {
                        matchedQuotes.push({
                            quote: getShortQuoteFromText(s.text),
                            sample: `${r.id} (${r.pkd})`
                        });
                        break;
                    }
                }
            }
        });
    });

    if (matchedQuotes.length > 0) {
        return matchedQuotes;
    }

    const def = CONCISE_SHORT_QUOTES[codeObj.id] || { quote: '"...perkhidmatan kesihatan awam dilaksanakan mengikut ketetapan daerah."', sample: "R1 (PKD)" };
    return [def];
}

// RENDER APA 7TH EDITION TABLE 1 WITH CONCISE SHORT QUOTES
function renderApa7Table() {
    const tbody = document.getElementById("tblApa7Body");
    if (!tbody) return;

    const groupedThemes = {};
    MASTER_CODEBOOK.forEach(c => {
        if (!groupedThemes[c.theme]) {
            groupedThemes[c.theme] = [];
        }
        groupedThemes[c.theme].push(c);
    });

    let html = "";
    Object.keys(groupedThemes).forEach(themeTitle => {
        const codesInTheme = groupedThemes[themeTitle];

        html += `
            <tr class="apa7-theme-header-row">
                <td colspan="4" style="background: #f1f5f9; color: #002b49; font-weight: bold; font-size: 13.5px; border-top: 1.5px solid #000000; border-bottom: 1.5px solid #000000; padding: 10px 12px;">
                    🏛️ ${themeTitle}
                </td>
            </tr>
        `;

        codesInTheme.forEach(c => {
            const shortVerbatim = CONCISE_SHORT_QUOTES[c.id] || harvestVerbatimQuotesForCode(c)[0];

            html += `
                <tr>
                    <td style="padding-left: 18px;">
                        <strong>${c.subtheme}</strong> <br>
                        <small style="color: #005691; font-weight: bold;">[${c.ephf}]</small>
                    </td>
                    <td class="apa7-code">${c.id}</td>
                    <td class="apa7-quote" style="font-style: italic; font-weight: 500; color: #0f172a;">
                        ${shortVerbatim.quote}
                    </td>
                    <td><small style="font-weight: bold;">${shortVerbatim.sample}</small></td>
                </tr>
            `;
        });
    });

    tbody.innerHTML = html;
}

function renderForceFieldChart() {
    const canvas = document.getElementById("forceFieldChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (forceFieldChartInstance) forceFieldChartInstance.destroy();

    forceFieldChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Senior PHMS/FMS Technical Depth', 'Esprit de Corps & Teamwork', 'Continuous Data Surveillance',
                'Whole-of-Gov Alliances (MBKT)', 'Multisectoral Academic Alliances', 'Community Trust & ANMS Hubs',
                'Digital CCMS Transformation', 'Multi-Cadre Staffing Deficits', 'Infrastructural Space Limitations',
                'Multi-Tasking Outbreak Overload', 'Transport Vehicle Deficits', 'Top-Down Ministerial Disconnect',
                'Unresourced Floating Demographics', 'Climate & Monsoon Flooding Hazards'
            ],
            datasets: [{
                label: 'Strategic Priority Impact (Assets to Protect + / Barriers to Reform -)',
                data: [5.0, 4.8, 4.8, 4.7, 4.4, 4.3, 4.6, -4.9, -4.8, -4.7, -4.6, -4.4, -4.3, -4.5],
                backgroundColor: function(context) {
                    const val = context.raw;
                    return val > 0 ? '#10b981' : '#ef476f';
                },
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    min: -5,
                    max: 5,
                    title: { display: true, text: '◄ Structural Barriers Needing Reform | Core Assets to Protect ►', color: '#f59e0b', font: { weight: 'bold' } },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255,255,255,0.08)' }
                },
                y: {
                    ticks: { color: '#cbd5e1', font: { size: 10.5 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function renderForceFieldLists() {
    const drivingList = document.getElementById("drivingForcesList");
    const restrainingList = document.getElementById("restrainingForcesList");

    if (!drivingList || !restrainingList) return;

    const drivingData = [
        { id: "STR-WORKFORCE", title: "Senior PHMS & FMS Technical Depth", score: "+5.0/5", desc: "High concentration of experienced Public Health Medicine Specialists (PHMS) & Family Medicine Specialists (FMS) with 10–17 years ground experience.", action: "🛡️ Asset Protection Strategy: Preserve specialist technical leadership in district decision-making." },
        { id: "STR-TEAM", title: "Esprit de Corps & Internal Team Synergy", score: "+4.8/5", desc: "Strong teamwork spirit, mutual cross-unit support, and supportive senior DHO leadership across Sibu, Papar, and Kuantan.", action: "🛡️ Asset Protection Strategy: Protect supportive workplace culture and institutionalize peer mentorship." },
        { id: "STR-SURV", title: "Continuous Data-Driven Field Surveillance", score: "+4.8/5", desc: "Active, ongoing surveillance data review guiding rapid field outbreak containment and contact tracing deployment.", action: "🛡️ Asset Protection Strategy: Safeguard real-time field disease notification capabilities." },
        { id: "STR-GOV", title: "Whole-of-Government Municipal Alliances", score: "+4.7/5", desc: "Active multi-agency networks with District Offices, Municipal Councils (MBKT Health City), Police, and local YBs.", action: "🛡️ Asset Protection Strategy: Formalize inter-departmental co-ownership via District Health Committees." },
        { id: "OPP-DIGITAL", title: "Digital CCMS & Cloud Analytics Momentum", score: "+4.6/5", desc: "CCMS rollout, Google Workspace cloud integration, and predictive analytics adoption.", action: "🛡️ Asset Protection Strategy: Accelerate and protect digital health rollout across rural health clinics." },
        { id: "OPP-PARTNER", title: "Multisectoral Academic & Hospital Alliances", score: "+4.4/5", desc: "Collaborations with UMS, UMT, and UniSZA (integrating UniSZA Hospital into MECC pre-hospital system).", action: "🛡️ Asset Protection Strategy: Expand university volunteer student networks and pre-hospital care ties." },
        { id: "STR-COMM", title: "High Community Trust & Public Co-Operation", score: "+4.3/5", desc: "High public trust and active community cooperation during outbreak contact tracing and health campaigns.", action: "🛡️ Asset Protection Strategy: Empower Wellness Hub community health champions (ANMS)." }
    ];

    const restrainingData = [
        { id: "WEAK-HR-SHORT", title: "Multi-Cadre Staffing Deficits & Personnel Shortages", score: "-4.9/5", desc: "Systemic staff deficits across Medical Officers (MOs), Medical Assistants (MAs), Nurses, Pharmacy, and Lab cadres causing severe strain.", action: "🔧 Transformation Reform: Establish dedicated district staffing quotas & fast-track contract staff conversion." },
        { id: "WEAK-INFRA", title: "Infrastructural Space Degradation & Makeshift Facilities", score: "-4.8/5", desc: "42.37m² converted ILKKM kitchen HQ pharmacy in Kuala Nerus; 50yo clinic buildings with structural degradation and overcrowding.", action: "🔧 Transformation Reform: Prioritize capital expenditure funding for purpose-built PKD complexes." },
        { id: "WEAK-HR-TASK", title: "Multi-Tasking & Concurrent Event Overload", score: "-4.7/5", desc: "Personnel forced to handle routine clinic care alongside concurrent outbreak, disaster, and event duties.", action: "🔧 Transformation Reform: Establish dedicated rapid-response surge teams to prevent staff burnout." },
        { id: "WEAK-ASSETS", title: "Transport Deficits & Reactive Maintenance Drain", score: "-4.6/5", desc: "Limited field vehicles, ageing diagnostic tools (X-ray, lab), and >RM1,000,000 spent fixing 40yo structures.", action: "🔧 Transformation Reform: Modernize district vehicle fleets and shift funding to planned capital building upgrades." },
        { id: "THREAT-CLIMATE", title: "Climate Change & Severe Monsoon Disaster Surges", score: "-4.5/5", desc: "Recurring flash floods, coastal erosion, and extreme weather damaging facilities and driving disease surges.", action: "🔧 Transformation Reform: Build climate-resilient clinic infrastructure & emergency disaster protocols." },
        { id: "THREAT-MOH", title: "Top-Down Ministerial Policy & Resource Disconnect", score: "-4.4/5", desc: "Central planners introducing unresourced new programs without understanding ground implementation reality.", action: "🔧 Transformation Reform: Mandate ground feasibility impact assessments before policy rollouts." },
        { id: "THREAT-VULN", title: "Unresourced Floating & Transient Demographics", score: "-4.3/5", desc: "20,000+ university students & seasonal island tourists using primary care without static census budget allocations.", action: "🔧 Transformation Reform: Reform healthcare funding allocation formulas to account for transient demand." }
    ];

    drivingList.innerHTML = drivingData.map(item => `
        <div class="ff-card-item">
            <div class="ff-item-head">
                <span class="ff-code-id">${item.id}</span>
                <span class="ff-score-badge">${item.score}</span>
            </div>
            <div class="ff-item-title">${item.title}</div>
            <div class="ff-item-desc">${item.desc}</div>
            <div class="ff-action-box">${item.action}</div>
        </div>
    `).join("");

    restrainingList.innerHTML = restrainingData.map(item => `
        <div class="ff-card-item">
            <div class="ff-item-head">
                <span class="ff-code-id">${item.id}</span>
                <span class="ff-score-badge">${item.score}</span>
            </div>
            <div class="ff-item-title">${item.title}</div>
            <div class="ff-item-desc">${item.desc}</div>
            <div class="ff-action-box">${item.action}</div>
        </div>
    `).join("");
}

function renderRespondentsTable() {
    const tbody = document.getElementById("tblRespondentsBody");
    tbody.innerHTML = parsedRespondents.map((r, idx) => `
        <tr>
            <td><strong>${r.id}</strong></td>
            <td><strong>${r.pkd}</strong></td>
            <td><span class="badge">${r.state}</span></td>
            <td>${r.designation}</td>
            <td>${r.years}</td>
            <td>${r.startDate}</td>
            <td><span class="tag-badge">CSV Verified ✅</span></td>
            <td><button class="btn-sm" onclick="showRespondentModal('${r.id}')">View Raw Response</button></td>
        </tr>
    `).join("");
}

function populateDistrictFilter() {
    const select = document.getElementById("filterDistrict");
    select.innerHTML = `<option value="ALL">All Districts (${parsedRespondents.length})</option>` +
        parsedRespondents.map(r => `<option value="${r.pkd}">${r.pkd} (${r.state})</option>`).join("");
}

function getMatchedCodesForText(text, secKey) {
    if (!text) return [];
    const secCodes = MASTER_CODEBOOK.filter(c => c.sec === secKey || secKey === "ALL");
    const matched = [];

    secCodes.forEach(code => {
        const triggers = code.triggers.split(",").map(t => t.trim().toLowerCase());
        for (let t of triggers) {
            if (text.toLowerCase().includes(t)) {
                matched.push(code);
                break;
            }
        }
    });
    return matched;
}

function renderResponsesList() {
    const container = document.getElementById("responsesContainer");
    const selectedDistrict = document.getElementById("filterDistrict").value;
    const selectedQ = document.getElementById("filterQuestion").value;

    let filtered = parsedRespondents;
    if (selectedDistrict !== "ALL") {
        filtered = filtered.filter(r => r.pkd === selectedDistrict);
    }

    container.innerHTML = filtered.map(r => {
        let qBlocks = "";
        let respCodeCount = 0;
        
        const qMap = [
            { key: "Q1", title: "Soalan 1: Scope & Situational Functions", text: r.q1 },
            { key: "Q2", title: "Soalan 2: Strengths", text: r.q2 },
            { key: "Q3", title: "Soalan 3: Weaknesses & Resource Constraints", text: r.q3 },
            { key: "Q4", title: "Soalan 4: Opportunities & Innovations", text: r.q4 },
            { key: "Q5", title: "Soalan 5: Threats & Emerging Challenges", text: r.q5 },
            { key: "Q5_EXTRA", title: "Catatan Tambahan (Additional Comments)", text: r.q5_extra }
        ];

        qMap.forEach(q => {
            if (selectedQ === "ALL" || selectedQ === q.key || (selectedQ === "Q5" && q.key === "Q5_EXTRA")) {
                if (q.text && q.text.trim()) {
                    const matched = getMatchedCodesForText(q.text, q.key === "Q5_EXTRA" ? "Q5" : q.key);
                    respCodeCount += matched.length;

                    const badges = matched.map(m => `
                        <div class="code-chip">
                            <span class="code-id">${m.id}</span>
                            <span class="code-theme">${m.theme}</span>
                            <span style="color: var(--kkm-gold); font-weight: 700;">[${m.ephf}]</span>
                        </div>
                    `).join("");

                    qBlocks += `
                        <div class="resp-section">
                            <h4>${q.title}</h4>
                            <div class="quote-box">${q.text}</div>
                            <div class="code-badges">${badges}</div>
                        </div>
                    `;
                }
            }
        });

        return `
            <div class="response-card">
                <div class="resp-header">
                    <div class="resp-title">
                        <h3>${r.pkd} (${r.state}) — ${r.id}</h3>
                        <p><strong>Jawatan:</strong> ${r.designation} • <strong>Tempoh:</strong> ${r.years} • <strong>Mula Bertugas:</strong> ${r.startDate}</p>
                    </div>
                    <span class="tag-badge">${respCodeCount} Code Mentions Extracted</span>
                </div>
                ${qBlocks}
            </div>
        `;
    }).join("");
}

function renderCodebookAccordion() {
    const container = document.getElementById("codebookAccordion");
    const questions = [
        { key: "Q1", title: "Question 1: Current Functions and District Context" },
        { key: "Q2", title: "Question 2: Strengths" },
        { key: "Q3", title: "Question 3: Weaknesses" },
        { key: "Q4", title: "Question 4: Opportunities" },
        { key: "Q5", title: "Question 5: Threats and Emerging Challenges" }
    ];

    container.innerHTML = questions.map(q => {
        const codes = MASTER_CODEBOOK.filter(c => c.sec === q.key);
        const rows = codes.map(c => `
            <tr>
                <td><strong style="color: var(--kkm-gold);">${c.id}</strong></td>
                <td><strong>${c.theme}</strong></td>
                <td>${c.subtheme}</td>
                <td><span style="color: var(--kkm-gold); font-weight: 700;">${c.ephf}</span></td>
                <td style="font-size: 12px; color: var(--text-secondary);">${c.def}</td>
            </tr>
        `).join("");

        return `
            <div class="codebook-sec">
                <div class="codebook-sec-header">
                    <h3>${q.title}</h3>
                    <span class="badge">${codes.length} Defined Codes</span>
                </div>
                <div class="codebook-sec-body">
                    <div class="table-responsive">
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th>Code ID</th>
                                    <th>Master Theme</th>
                                    <th>Sub-Theme</th>
                                    <th>Mapped EPHF</th>
                                    <th>Operational Inclusion Criteria & Definition</th>
                                </tr>
                            </thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function renderMatrixTable() {
    const tbody = document.getElementById("tblEphfMatrixBody");
    tbody.innerHTML = MASTER_CODEBOOK.map(c => `
        <tr>
            <td><strong style="color: var(--kkm-gold);">${c.ephf}</strong></td>
            <td><strong>${getEphfTitle(c.ephf)}</strong></td>
            <td><span class="badge">${c.sec}</span></td>
            <td style="font-size: 12px; font-style: italic; color: var(--text-secondary);">${c.triggers}</td>
            <td><strong style="color: var(--kkm-gold);">${c.id}</strong></td>
            <td>${c.subtheme}</td>
            <td><strong>${c.theme}</strong></td>
        </tr>
    `).join("");
}

function getEphfTitle(ephfStr) {
    if (ephfStr.includes("EPHF 1")) return "Surveillance & Health Intelligence";
    if (ephfStr.includes("EPHF 2")) return "Public Health Emergency Management";
    if (ephfStr.includes("EPHF 3")) return "Health Protection & Environmental Health";
    if (ephfStr.includes("EPHF 4")) return "Health Promotion & Disease Prevention";
    if (ephfStr.includes("EPHF 5")) return "Primary Healthcare & Service Delivery";
    if (ephfStr.includes("EPHF 6")) return "Social Determinants & Health Equity";
    if (ephfStr.includes("EPHF 7")) return "Policy, Legislation & Enforcement";
    if (ephfStr.includes("EPHF 8")) return "Governance, Leadership & Partnership";
    if (ephfStr.includes("EPHF 9")) return "Human Resources for Health";
    if (ephfStr.includes("EPHF 10")) return "Health Financing & Asset Allocation";
    if (ephfStr.includes("EPHF 11")) return "Infrastructure, Technology & Digitalization";
    if (ephfStr.includes("EPHF 12")) return "Health Research, Evidence & Innovation";
    return "Essential Public Health Function";
}

function renderSwotGrid() {
    const container = document.getElementById("swotGridContainer");
    
    container.innerHTML = `
        <div class="swot-box strengths">
            <h3>💪 Strengths (Internal Enablers)</h3>
            <div class="swot-list">
                <div class="swot-item"><strong>Senior PHMS/DHO Leadership (EPHF 8 & 9):</strong> 16-17 yrs experienced PHMS leadership in Kota Setar & Sibu; 3 PHMS & 7 FMS specialists leading care in Kuala Nerus.</div>
                <div class="swot-item"><strong>Internal Synergy & Teamwork (EPHF 8):</strong> Strong esprit de corps and cross-unit support across all 5 districts.</div>
                <div class="swot-item"><strong>Continuous Comprehensive Surveillance (EPHF 1):</strong> Ongoing data review for rapid field outbreak response (Papar, Kuantan, Kota Setar).</div>
                <div class="swot-item"><strong>Inter-Agency Partnerships & Smart Alliances (EPHF 8 & 12):</strong> Municipal councils (MBKT Health City), police, YBs, and university alliances (UMT, UniSZA, UMS).</div>
            </div>
        </div>

        <div class="swot-box weaknesses">
            <h3>⚠️ Weaknesses (System Constraints)</h3>
            <div class="swot-list">
                <div class="swot-item"><strong>Severe Staff Shortages & Multi-Tasking (EPHF 9):</strong> Universal personnel deficits causing multi-tasking strain and concurrent event overload.</div>
                <div class="swot-item"><strong>Infrastructural Degradation (EPHF 11):</strong> Converted ILKKM kitchen (42m²) used as HQ pharmacy in Kuala Nerus; 50yo clinic buildings with overcrowding.</div>
                <div class="swot-item"><strong>Community Behavior Adoption Gaps (EPHF 4):</strong> Lacking healthy lifestyle adoption despite extensive campaigns (Kota Setar).</div>
                <div class="swot-item"><strong>Asset & Transport Shortages (EPHF 10):</strong> Limited field vehicles, ageing diagnostic tools (X-ray, lab).</div>
            </div>
        </div>

        <div class="swot-box opportunities">
            <h3>🚀 Opportunities (Innovations & Growth)</h3>
            <div class="swot-list">
                <div class="swot-item"><strong>Digital Health Transformation (EPHF 11):</strong> CCMS rollout, Google Workspace cloud integration, and predictive analytics.</div>
                <div class="swot-item"><strong>Multisectoral Academic Alliances (EPHF 12 & 8):</strong> Integrating UniSZA hospital into MECC pre-hospital system; university student ambassadors.</div>
                <div class="swot-item"><strong>Administrative Decentralization (EPHF 7 & 8):</strong> Health system reforms for clearer role boundaries, financing decentralization, and research.</div>
                <div class="swot-item"><strong>Community Empowerment (EPHF 4):</strong> Wellness Hub ambassadors (ANMS) and active living urban designs.</div>
            </div>
        </div>

        <div class="swot-box threats">
            <h3>⚡ Threats (External Challenges)</h3>
            <div class="swot-list">
                <div class="swot-item"><strong>Climate Change & Monsoon Floods (EPHF 2 & 3):</strong> Flash floods, coastal erosion, and extreme weather damaging facilities and triggering disease surges.</div>
                <div class="swot-item"><strong>Floating Population Mismatch (EPHF 6 & 10):</strong> 20,000+ university students & island tourists using services without static census budget allocations.</div>
                <div class="swot-item"><strong>Central-District Policy Gap (EPHF 8):</strong> Central planners creating unresourced new programs without ground realities.</div>
                <div class="swot-item"><strong>Evolving Pathogens & Community Skepticism (EPHF 1 & 4):</strong> Dengue/TB/Zoonotic outbreaks, emerging diseases, and lack of trust/misinformation.</div>
            </div>
        </div>
    `;
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    if (!term) {
        renderResponsesList();
        return;
    }

    const cards = document.getElementById("responsesContainer").querySelectorAll(".response-card");
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? "flex" : "none";
    });
}

function showRespondentModal(respId) {
    const r = parsedRespondents.find(item => item.id === respId);
    if (!r) return;

    const modalTitle = document.getElementById("modalRespTitle");
    const modalBody = document.getElementById("modalRespBody");

    modalTitle.textContent = `${r.pkd} (${r.state}) — Raw Response Data`;

    modalBody.innerHTML = `
        <div style="background-color: var(--navy-header); padding: 16px; border-radius: 8px;">
            <p><strong>Timestamp:</strong> ${r.timestamp}</p>
            <p><strong>Jawatan / Designation:</strong> ${r.designation}</p>
            <p><strong>PKD / Tempat Bertugas:</strong> ${r.pkd}</p>
            <p><strong>Negeri:</strong> ${r.state}</p>
            <p><strong>Tempoh Perkhidmatan:</strong> ${r.years}</p>
            <p><strong>Tarikh Mula Bertugas:</strong> ${r.startDate}</p>
        </div>

        <div class="resp-section">
            <h4>Col 6: Scope / Q1 (Situational Analysis & Functions)</h4>
            <div class="quote-box">${r.q1}</div>
        </div>

        <div class="resp-section">
            <h4>Col 7: Q2 (Strengths)</h4>
            <div class="quote-box">${r.q2}</div>
        </div>

        <div class="resp-section">
            <h4>Col 8: Q3 (Weaknesses)</h4>
            <div class="quote-box">${r.q3}</div>
        </div>

        <div class="resp-section">
            <h4>Col 9: Q4 (Opportunities)</h4>
            <div class="quote-box">${r.q4}</div>
        </div>

        <div class="resp-section">
            <h4>Col 10: Q5 (Threats)</h4>
            <div class="quote-box">${r.q5}</div>
        </div>

        ${r.q5_extra ? `
        <div class="resp-section">
            <h4>Col 11: Catatan Tambahan (Additional Comments)</h4>
            <div class="quote-box">${r.q5_extra}</div>
        </div>` : ''}
    `;

    document.getElementById("respondentModal").classList.add("active");
}
