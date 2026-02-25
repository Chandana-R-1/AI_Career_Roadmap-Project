"use client";
import { useState } from "react";

export default function Home() {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills_text: skills }),
      });
      if (!res.ok) throw new Error("Failed to predict careers");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateRoadmap = async (career) => {
    setRoadmapLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/generate-roadmap?career=${encodeURIComponent(career)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.extracted_skills),
      });
      if (!res.ok) throw new Error("Failed to generate roadmap");
      const data = await res.json();
      setRoadmap(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setRoadmapLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="hero-text">AI Powered Career Roadmap</h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Unleash your potential with a personalized learning path tailored specifically to your skills and aspirations.
        </p>
      </section>

      {!result && (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Where do you stand?</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                Enter your skills (e.g., Python, SQL, JavaScript, React)
              </label>
              <textarea
                className="glass-card"
                style={{
                  width: '100%',
                  minHeight: '120px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  color: 'white',
                  padding: '1rem',
                  border: '1px solid var(--glass-border)',
                  outline: 'none',
                  resize: 'vertical'
                }}
                placeholder="I am proficient in Python, have worked with SQL databases, and have basic knowledge of web development with HTML and CSS..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? "Analyzing..." : "Generate My Predictions"}
            </button>
          </form>
        </div>
      )}

      {error && (
        <p style={{ color: '#f87171', marginTop: '2rem', textAlign: 'center' }}>{error}</p>
      )}

      {result && !roadmap && (
        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => setResult(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '1rem' }}>
            ← Back to Input
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-card">
              <h3 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Identified Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.extracted_skills.map((skill, i) => (
                  <span key={i} style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.9rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-card">
              <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Choose Your Path</h3>
              <ul style={{ listStyle: 'none' }}>
                {result.predicted_careers.map((career, i) => (
                  <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>✨ {career}</span>
                    <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => generateRoadmap(career)}>
                      Get Roadmap
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {roadmapLoading && (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2 className="hero-text" style={{ fontSize: '2rem' }}>Generating Your Roadmap...</h2>
        </div>
      )}

      {roadmap && (
        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => setRoadmap(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '1rem' }}>
            ← Back to Careers
          </button>
          <div className="glass-card">
            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
              Your Path to <span style={{ color: 'var(--secondary)' }}>{roadmap.career}</span>
            </h2>

            <div className="roadmap-container">
              {roadmap.roadmap.map((step, i) => (
                <div key={i} className="roadmap-step" style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem',
                  position: 'relative',
                  paddingLeft: '3rem',
                  borderLeft: '2px dashed rgba(255,255,255,0.1)'
                }}>
                  <div className="step-number" style={{
                    position: 'absolute',
                    left: '-1rem',
                    width: '2rem',
                    height: '2rem',
                    background: step.status === 'Completed' ? 'var(--primary)' : '#334155',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
                  }}>
                    {step.status === 'Completed' ? '✓' : step.step}
                  </div>
                  <div className="glass-card" style={{ flex: 1, padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>{step.skill}</h4>
                      <span style={{
                        fontSize: '0.8rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '1rem',
                        background: step.status === 'Completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                        color: step.status === 'Completed' ? '#4ade80' : '#facc15'
                      }}>
                        {step.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
                      <strong>Resource:</strong> {step.learning_resource}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      <strong>Project:</strong> {step.project_idea}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
