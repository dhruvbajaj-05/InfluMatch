import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../Css files/Questionnaire.module.css";
export default function Questionnaire() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handlePrevious = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const progressPercent = totalPages > 1 ? ((currentPage - 1) / (totalPages - 1)) * 100 : 0;

  const renderPage = (page) => {
    switch (page) {
      case 1:
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>What is your brand's name?</label>
              <input className={styles.input} type="text" placeholder="ABC, XYZ, Minge, etc" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>What is your official website URL?</label>
              <input className={styles.input} type="text" placeholder="www.google.com, etc" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Which industry or niche does your brand belong to?</label>
              <select className={styles.select}>
                <option value="">Select a niche</option>
                <option value="fashion">Fashion</option>
                <option value="beauty">Beauty & Makeup</option>
                <option value="fitness">Fitness & Health</option>
                <option value="tech">Tech & Gadgets</option>
                <option value="gaming">Gaming</option>
              </select>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>What is your target audience?</label>
              <input className={styles.input} type="text" placeholder="e.g., 18-30, India, Tech enthusiasts" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Campaign goals</label>
              <select className={styles.select}>
                <option value="">Select a goal</option>
                <option value="awareness">Brand Awareness</option>
                <option value="engagement">Engagement</option>
                <option value="sales">Sales/Conversions</option>
                <option value="traffic">Website Traffic</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Estimated monthly budget (USD)</label>
              <input className={styles.input} type="number" min="0" placeholder="e.g., 2000" />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Preferred platforms</label>
              <select multiple className={styles.select}>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="x">X (Twitter)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Campaign timeline</label>
              <input className={styles.input} type="text" placeholder="e.g., 6 weeks starting Sept 1" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Any additional requirements?</label>
              <input className={styles.input} type="text" placeholder="e.g., Location, content type, language" />
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
                aria-disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={styles.primaryButton}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-disabled={currentPage === totalPages}
              >
                {currentPage === totalPages ? "Done" : "Next"}
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
