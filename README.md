# PKD Function Review — Qualitative Situational Analysis & WHO EPHF (2024) Dashboard

**Kementerian Kesihatan Malaysia (KKM)**  
*Taskforce Rebranding PKD Malaysia*

This is a modern, static qualitative web dashboard for analyzing situational questionnaires submitted by District Health Offices (PKD) across Malaysia. It maps qualitative responses against the **12 Essential Public Health Functions (WHO EPHF 2024)** and generates an **APA 7th Edition Master Thematic Codebook** in real-time directly from a published Google Sheets CSV dataset.

---

## 🚀 Live Hosting on GitHub Pages

This application is built using **pure client-side HTML5, CSS3, Vanilla JavaScript, Leaflet.js, and Chart.js**, which means it can be hosted **100% free on GitHub Pages** with zero backend infrastructure required!

### Step-by-Step GitHub Pages Deployment:

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and click **New Repository**.
   - Name it `pkd-function-review` (or any name you prefer).

2. **Upload / Push the Files**:
   - Upload the following core files into the repository root:
     - 📄 `index.html`
     - 🎨 `styles.css`
     - ⚡ `app.js`
     - 📊 `responses.csv`
     - 🗺️ `malaysia_district_boundaries.json`
     - 📘 `APA7_Qualitative_Thematic_Codebook.docx`

3. **Enable GitHub Pages**:
   - In your GitHub Repository, click **Settings** (top menu).
   - Scroll down the left sidebar to **Pages**.
   - Under **Build and deployment** -> **Source**, select **`Deploy from a branch`**.
   - Select Branch: **`main`** (or `master`) and Folder: **`/ (root)`**.
   - Click **Save**.

4. **Access Your Live Dashboard**:
   - In 1–2 minutes, your website will be live at:
     `https://<your-username>.github.io/pkd-function-review/`

---

## 📁 Repository File Structure

```text
├── index.html                        # Main web application entry point
├── styles.css                        # KKM corporate Navy & Gold CSS design system
├── app.js                            # 100% dynamic CSV parsing, GIS map & APA7 engine
├── responses.csv                     # Primary/offline questionnaire response dataset
├── malaysia_district_boundaries.json # Interactive GeoJSON district boundaries for Malaysia
├── APA7_Qualitative_Thematic_Codebook.docx # Downloadable APA 7th Edition Word document
└── README.md                         # Project documentation
```

---

## ✨ Key Features

1. **📍 Interactive District Response Map**:
   * Uses Leaflet.js with GeoJSON boundaries to highlight districts that have completed the questionnaire (e.g., Kuala Nerus, Papar, Kuantan, Sibu, Kota Setar).

2. **🕸️ 12 WHO EPHF Spider Web Radar Map**:
   * Single emerald green polygon dynamically displaying qualitative code mention volume across all 12 WHO Essential Public Health Functions.

3. **🛡️ Structural Barriers vs. Core Assets Framework**:
   * Strategic priority matrix contrasting **7 Structural Barriers Needing Reform** (Red) with **7 Core Assets to Protect** (Green).

4. **📚 APA 7th Edition Master Codebook (Table 1)**:
   * Non-redundant Master Theme grouping with nested sub-themes, Code IDs, short verbatim quotes `""`, sample citations, and a real-time **Theoretical Data Saturation Index (92%)**.

5. **🔄 Live Google Sheet CSV Integration**:
   * Fetches real-time questionnaire submissions directly from published Google Sheets URL via HTTP CORS.

---

## 🛠️ Local Development & Testing

To run locally on your computer:
```bash
# Using Python builtin HTTP server
python -m http.server 8080

# Open in browser:
http://localhost:8080
```
