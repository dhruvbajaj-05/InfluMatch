import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../Css files/Questionnaire.module.css";
import { useNavigate } from "react-router-dom"; // Added: for redirecting to Analytics after submit

export default function Questionnaire() {
  const navigate = useNavigate(); // Added: navigation hook
  const [formData, setFormData] = useState({
    brand_name: "",
    website_url: "",
    niche: "",
    campaign_goal: "",
    campaign_timeline: "",
    influencer_size: "",
    target_age_range: "",
    target_gender: "",
    target_city: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  // handle change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // submit function
  const handleSubmit = async () => {
    // basic required checks to match backend schema
    const required = [
      'brand_name','niche','target_gender','target_age_range','target_city','campaign_goal'
    ];
    const missing = required.filter(k => !formData[k] || String(formData[k]).trim() === "");
    if (missing.length) {
      alert(`Please fill required fields: ${missing.join(", ")}`);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("❌ Backend error:", data);
        alert(data?.error || "Submission failed");
        return;
      }
      console.log("✅ Submitted:", data);
      // After successful submission, redirect to Analytics page
      // Explanation: The user asked to go from the last questions page to analytics on submit.
      // We use React Router's navigate to move to '/analytics'.
      // Optionally, pass along IDs/state if Analytics needs it: navigate('/analytics', { state: { brandId: data?._id } })
      navigate('/analytics');
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("Network error. Is the backend running on port 5000?");
    }
  };

  // page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handlePrevious = () => goToPage(currentPage - 1);
  const handleNext = () => {
    if (currentPage === totalPages) {
      handleSubmit(); // final submit
    } else {
      goToPage(currentPage + 1);
    }
  };

  const progressPercent =
    totalPages > 1 ? ((currentPage - 1) / (totalPages - 1)) * 100 : 0;

  // render pages
  const renderPage = (page) => {
    switch (page) {
      case 1:
        return (
          <>
            <div className={styles.formGroup}>
              <h1>Brand Details</h1>
              <label className={styles.label}>What is your brand's name?</label>
              <input 
                className={styles.input} 
                type="text" 
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                placeholder="ABC, XYZ, Minge, etc" 
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>What is your official website URL?</label>
              <input 
                className={styles.input} 
                type="text"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                placeholder="www.google.com, etc" 
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Which industry or niche does your brand belong to?</label>
              <select 
                className={styles.select} 
                name="niche"
                value={formData.niche}
                onChange={handleChange}
              >
                <option value="">Select a niche</option>
                <option value="fashion">Fashion</option>
                <option value="beauty">Beauty & Makeup</option>
                <option value="fitness">Fitness & Health</option>
              </select>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.formGroup}>
              <h1>Campaign Goals</h1>
              <label className={styles.label}>Primary Objective</label>
              <select 
                className={styles.select} 
                name="campaign_goal"
                value={formData.campaign_goal}
                onChange={handleChange}
              >
                <option value="awareness">Brand Awareness</option>
                <option value="engagement">Engagement</option>
                <option value="sales">Sales/Conversions</option>
              </select>
            </div>
            <div className={styles.formGroup}> 
              <label className={styles.label}>Timeline of Campaign?</label>
              <select 
                className={styles.select}
                name="campaign_timeline"
                value={formData.campaign_timeline}
                onChange={handleChange}
              >
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="4 months">4 months</option>
                <option value="5 months">5 months</option>
                <option value="6 months">6 months</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Preferred Influencer Size?</label>
              <select 
                className={styles.select}
                name="influencer_size"
                value={formData.influencer_size}
                onChange={handleChange}
              >
                <option value="">Select a size</option>
                <option value="nano">Nano</option>
                <option value="micro">Micro</option>
                <option value="mid">Mid</option>
                <option value="macro">Macro</option>
              </select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.formGroup}>
              <h1>Target Audience</h1>
              <label className={styles.label}>Target age group?</label>
              <select 
                className={styles.select}
                name="target_age_range"
                value={formData.target_age_range}
                onChange={handleChange}
              >
                <option value="">Select an age group</option>
                <option value="all">All</option>
                <option value="13-17">13-17</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Target Gender?</label>
              <select 
                className={styles.select}
                name="target_gender"
                value={formData.target_gender}
                onChange={handleChange}
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Target City?</label>
              <select 
                className={styles.select}
                name="target_city"
                value={formData.target_city}
                onChange={handleChange}
              >
                <option value="">Select a city</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
                <option value="kolkata">Kolkata</option>
                <option value="pune">Pune</option>
                <option value="all">All</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <div className={styles.pageList}>
                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  const active = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${styles.pageButton} ${active ? styles.pageButtonActive : ""}`}
                    >
                      Page {page}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <section className={styles.content}>
            {/* Progress bar */}
            <div className={styles.progressTracker}>
              <div className={styles.progressLine}></div>
              <div
                className={styles.progressFill}
                style={{ width: `calc((100% - 16px) * ${progressPercent / 100})` }}
              ></div>
              <div className={styles.progressDots}>
                {[...Array(totalPages)].map((_, idx) => {
                  const dotIndex = idx + 1;
                  const dotClasses = [styles.dot];
                  if (dotIndex < currentPage) dotClasses.push(styles.completed);
                  if (dotIndex === currentPage) dotClasses.push(styles.active);
                  return <span key={dotIndex} className={dotClasses.join(" ")}></span>;
                })}
              </div>
            </div>

            <div className={styles.questions}>{renderPage(currentPage)}</div>

            <div className={styles.navButtons}>
              <button
                className={styles.secondaryButton}
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={styles.primaryButton}
                onClick={handleNext}
              >
                {currentPage === totalPages ? "Submit" : "Next"}
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
