import React, { useState, useEffect } from 'react';
import styles from '../Css files/Analytics.module.css';
import pic1 from '../pictures/pic1.jpeg';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('instagram'); 
  const [compatibility, setCompatibility] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock influencer for Instagram analytics
  const influencer = {
    id: "68d7c58c566d782002243992", // hardcoded for now
    name: 'Alex Rivera',
    photo: pic1,
  };

  const brandId = "68de734f82bbc0f9db7a04a3"; // hardcoded for now
  const followerGrowth = [
    { label: 'Jan', value: 40000 },
    { label: 'Feb', value: 41000 },
    { label: 'Mar', value: 42000 },
    { label: 'Apr', value: 44000 },
    { label: 'May', value: 46500 },
    { label: 'Jun', value: 48000 },
  ];

  const metrics = {
    avgReach: '45,230',
    avgImpressions: '120,540',
    engagementRate: '4.2%',
    followerGrowth: '+1.8% MoM',
    totalFollowers: '54,300',
  };

  const demographics = {
    age: [
      { label: '18-24', value: '32%' },
      { label: '25-34', value: '41%' },
      { label: '35-44', value: '17%' },
      { label: '45+', value: '10%' },
    ],
    gender: [
      { label: 'Female', value: '58%' },
      { label: 'Male', value: '42%' },
    ],
    cities: [
      { label: 'Mumbai', value: '18%' },
      { label: 'Delhi', value: '14%' },
      { label: 'Bengaluru', value: '11%' },
      { label: 'Hyderabad', value: '8%' },
      { label: 'Pune', value: '6%' },
    ],
  };


  // Fetch compatibility score whenever user switches to Pre tab
  useEffect(() => {
    if (activeTab === 'pre') {
      const fetchCompatibility = async () => {
        try {
          setLoading(true);
          const res = await fetch(`http://localhost:5000/api/compatibility/${brandId}/${influencer.id}`);
          const data = await res.json();
          setCompatibility(data);
        } catch (err) {
          console.error("Error fetching compatibility:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCompatibility();
    }
  }, [activeTab]);

  // ====== Instagram Section (unchanged) ======
  // ... keep your full InstagramSection, Sidebar, Charts code here unchanged ...

  const Sidebar = () => (
    <aside className={styles.sidebar}>
      <div className={styles['sidebar-head']}>
        <div className={styles['sidebar-title']}>Analytics</div>
        <div className={styles['sidebar-sub']}>Performance Dashboard</div>
      </div>
      <ul className={styles['sidebar-nav']}>
        <li
          className={activeTab === 'instagram' ? styles.active : ''}
          onClick={() => setActiveTab('instagram')}
        >
          Instagram Analytics
        </li>
        <li
          className={activeTab === 'pre' ? styles.active : ''}
          onClick={() => setActiveTab('pre')}
        >
          Pre-Compatibility Score
        </li>
        <li
          className={activeTab === 'post' ? styles.active : ''}
          onClick={() => setActiveTab('post')}
        >
          Post-Compatibility Score
        </li>
      </ul>
    </aside>
  );

  const FollowerGrowthChart = ({ data }) => {
    const width = 760; // wider canvas
    const height = 260; // taller to fit axes
    const padding = { top: 18, right: 24, bottom: 36, left: 56 };
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;
    const vals = data.map(d => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const y = v => padding.top + innerH - ((v - min) / (max - min || 1)) * innerH;
    const x = i => padding.left + (i / (data.length - 1 || 1)) * innerW;
    const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)},${y(d.value)}`).join(' ');
    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="260">
        {/* Y axis with ticks */}
        {[0,25,50,75,100].map((pct, idx) => {
          const yVal = min + ((max - min) * pct) / 100;
          const yy = y(yVal);
          return (
            <g key={`yt-${idx}`}>
              <line x1={padding.left} x2={width - padding.right} y1={yy} y2={yy} stroke="#e5e7eb" />
              <text x={padding.left - 10} y={yy + 4} textAnchor="end" fontSize="12" fill="#4b5563" fontWeight="700">{Math.round(yVal).toLocaleString()}</text>
            </g>
          );
        })}
        {/* X axis months */}
        <line x1={padding.left} x2={width - padding.right} y1={height - padding.bottom} y2={height - padding.bottom} stroke="#d1d5db" />
        {data.map((d, i) => (
          <text key={`xm-${d.label}`} x={x(i)} y={height - padding.bottom + 20} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="700">{d.label}</text>
        ))}
        {/* path */}
        <path d={line} fill="none" stroke="var(--accent)" strokeWidth="3" />
        {/* points */}
        {data.map((d, i) => (
          <circle key={d.label} cx={x(i)} cy={y(d.value)} r="5" fill="var(--accent)">
            <title>{`${d.label}: ${d.value.toLocaleString()}`}</title>
          </circle>
        ))}
      </svg>
    );
  };

  const toNumberPct = (s) => Number(String(s).replace(/[^0-9.]/g, '')) || 0;

  const BarRows = ({ data }) => (
    <div className={styles.bars}>
      {data.map((d) => {
        const pct = toNumberPct(d.value);
        return (
          <div key={d.label} className={styles['bar-row']}>
            <div className={styles['bar-label']}>{d.label}</div>
            <div className={styles['bar-track']}>
              <div className={styles['bar-fill']} style={{ width: `${pct}%` }} />
            </div>
            <div className={styles['bar-value']}>{d.value}</div>
          </div>
        );
      })}
    </div>
  );

  const VBarChart = ({ data }) => {
    const palette = ['#6d28d9', '#3b82f6', '#0ea5e9', '#f472b6', '#14b8a6'];
    const values = data.map(d => toNumberPct(d.value));
    const maxVal = Math.max(10, ...values);
    const roundedMax = Math.ceil(maxVal / 10) * 10 + (maxVal < 50 ? 10 : 0); // give some headroom

    const width = 720; // widen so it stretches closer to card edges
    const height = 220;
    const padding = { top: 14, right: 12, bottom: 36, left: 28 };
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;
    const barGap = 24; // more breathing room
    const barW = (innerW - barGap * (data.length - 1)) / data.length;

    const x = i => padding.left + i * (barW + barGap);
    const y = v => padding.top + innerH - (v / roundedMax) * innerH;

    const ticks = [];
    for (let t = 0; t <= roundedMax; t += 10) ticks.push(t);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220">
        {/* grid */}
        {ticks.map(t => (
          <g key={`g-${t}`}>
            <line x1={padding.left} x2={width - padding.right} y1={y(t)} y2={y(t)} stroke="#e5e7eb" />
            <text x={padding.left - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#4b5563" fontWeight="700">{t}</text>
          </g>
        ))}
        {/* bars */}
        {data.map((d, i) => {
          const v = values[i];
          const bx = x(i);
          const by = y(v);
          const h = padding.top + innerH - by;
          return (
            <g key={d.label}>
              <rect x={bx} y={by} width={barW} height={h} rx={10} fill={palette[i % palette.length]} style={{ transition: 'height 200ms ease-out' }}>
                <title>{`${d.label}: ${d.value}`}</title>
              </rect>
              <text x={bx + barW / 2} y={by - 6} textAnchor="middle" fontSize="12" fill="#111827" fontWeight="700">{d.value}</text>
              <text x={bx + barW / 2} y={height - 10} textAnchor="middle" fontSize="12" fill="#6b7280">{d.label}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  const InstagramSection = () => (
    <div className={`${styles.section} ${styles.fade}`}>
      {/* Header with name + profile photo (only here) */}
      <div className={styles['section-header']}>
        <div className={styles['profile-row']}>
          <img src={influencer.photo} alt="profile" className={styles['profile-pic']} />
          <div>
            <div className={styles['influencer-name']}>{influencer.name}</div>
            <div style={{ color: '#6b7280' }}>Instagram Performance Overview</div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className={styles['kpi-cards']}>
        <div className={styles.card}>
          <div className={styles['kpi-title']}>Average Reach</div>
          <div className={styles['kpi-value']}>{metrics.avgReach}</div>
        </div>
        <div className={styles.card}>
          <div className={styles['kpi-title']}>Average Impressions</div>
          <div className={styles['kpi-value']}>{metrics.avgImpressions}</div>
        </div>
        <div className={styles.card}>
          <div className={styles['kpi-title']}>Engagement Rate</div>
          <div className={styles['kpi-value']}>{metrics.engagementRate}</div>
        </div>
        <div className={styles.card}>
          <div className={styles['kpi-title']}>Total Followers</div>
          <div className={styles['kpi-value']}>{metrics.totalFollowers}</div>
        </div>
      </div>

      {/* Row 1: Follower Growth + Gender Split */}
      <div className={styles['two-up']}>
        <div className={`${styles.chart} large`}>
          <h3 style={{ marginTop: 0 }}>Follower Growth</h3>
          <FollowerGrowthChart data={followerGrowth} />
        </div>
        <div className={`${styles.chart} small`}>
          <h3 style={{ marginTop: 10, marginBottom: 25, textAlign: 'center' }}>Gender Split</h3>
          {(() => {                         
            const female = demographics.gender.find(g => g.label.toLowerCase().includes('female'));
            const male = demographics.gender.find(g => g.label.toLowerCase().includes('male'));
            const femaleRaw = toNumberPct(female?.value || 0);
            const maleRaw = toNumberPct(male?.value || 0);
            const total = femaleRaw + maleRaw || 1;
            const femalePctNum = Math.round((femaleRaw / total) * 100);
            const malePctNum = 100 - femalePctNum;
            const femalePct = `${femalePctNum}%`;
            const malePct = `${malePctNum}%`;
            return (
              <div className={styles['donut-wrap']}>
                <div className={styles.donut} style={{ '--p': femalePct, '--female': '#ec4899', '--male': '#3b82f6' }} title={`Female: ${femalePct} | Male: ${malePct}`} />
                <div className={styles.legend}>
                  <div className={styles['legend-item']} title={`Female: ${femalePct}`}><span className={styles.dot} /> Female: {femalePct}</div>
                  <div className={styles['legend-item']} title={`Male: ${malePct}`}><span className={`${styles.dot} male`} /> Male: {malePct}</div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Row 2: Age Distribution + Top Cities */}
      <div className={styles['two-up']}>
        <div className={`${styles.chart} small`}>
          <h3 style={{ marginTop: 0 }}>Age Distribution</h3>
          <VBarChart data={demographics.age} />
        </div>
        <div className={`${styles.chart} small`}>
          <h3 style={{ marginTop: 0 }}>Top Cities</h3>
          <VBarChart data={demographics.cities} />
        </div>
      </div>
    </div>
  );

  const Placeholder = ({ title }) => (
    <div className={`${styles.section} ${styles.fade}`}>
      <div className={styles['section-header']}>
        <h2 style={{ margin: 0 }}>{title}</h2>
      </div>
      <div className={styles.chart}>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This section will display the {title.toLowerCase()} with clear, dedicated visuals and scores.
        </p>
      </div>
    </div>
  );
  // Compatibility Section
  const CompatibilitySection = ({ title }) => (
    <div className={`${styles.section} ${styles.fade}`}>
      <div className={styles['section-header']}>
        <h2 style={{ margin: 0 }}>{title}</h2>
      </div>
      <div className={styles.chart}>
        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading compatibility...</p>
        ) : compatibility ? (
          <div>
            <h3>Score: {compatibility.score}%</h3>
            <p>{compatibility.message}</p>
          </div>
        ) : (
          <p style={{ color: '#6b7280' }}>
            No compatibility data available yet.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles['analytics-dashboard']}>
      <Sidebar />

      <main className={styles['main-content']}>
        <header className={styles.header}>
          <h1>Analytics Dashboard</h1>
        </header>

        {activeTab === 'instagram' && <InstagramSection />}
        {activeTab === 'pre' && <CompatibilitySection title="Pre-Compatibility Score" />}
        {activeTab === 'post' && <CompatibilitySection title="Post-Compatibility Score" />}
      </main>
    </div>
  );
};

export default Analytics;
