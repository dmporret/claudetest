"use client";

import { useState } from "react";
import Image from "next/image";

const questions = [
  {
    text: "When do you usually have your first coffee of the day?",
    options: [
      { label: "Before the sun's fully up — coffee is my alarm clock", personality: "Cozy Classic" },
      { label: "Mid-morning, once I've caught up with everyone", personality: "Social Butterfly" },
      { label: "After my workout — fuel up, then caffeinate", personality: "Health Nut" },
      { label: "Whenever I've had time to properly grind and brew", personality: "Deep Dive Purist" },
      { label: "Around 2pm — it's basically a second morning for me", personality: "Afternoon Wanderer" },
    ],
  },
  {
    text: "What does your ideal coffee moment look like?",
    options: [
      { label: "Quiet corner, a good book, familiar mug in hand", personality: "Cozy Classic" },
      { label: "Around a big table with friends, catching up", personality: "Social Butterfly" },
      { label: "Standing at the counter between tasks — efficient", personality: "Health Nut" },
      { label: "Alone, nose-deep in tasting notes, full attention on the cup", personality: "Deep Dive Purist" },
      { label: "A slow window seat, watching the street, nowhere to be", personality: "Afternoon Wanderer" },
    ],
  },
  {
    text: "How do you take your coffee?",
    options: [
      { label: "Black or with a splash of cream — nothing fancy", personality: "Cozy Classic" },
      { label: "Whatever sounds fun on the menu today", personality: "Social Butterfly" },
      { label: "Oat milk, no syrup — I know what I want", personality: "Health Nut" },
      { label: "Black, always — anything else masks the flavor", personality: "Deep Dive Purist" },
      { label: "A latte with a little something sweet — I'm treating myself", personality: "Afternoon Wanderer" },
    ],
  },
  {
    text: "Which describes your relationship with coffee shops?",
    options: [
      { label: "I have a regular order and my barista knows it", personality: "Cozy Classic" },
      { label: "My favorite place to meet up with people", personality: "Social Butterfly" },
      { label: "A quick stop before I get where I'm going", personality: "Health Nut" },
      { label: "I only go to ones I've researched — sourcing matters", personality: "Deep Dive Purist" },
      { label: "A refuge. I linger longer than I probably should", personality: "Afternoon Wanderer" },
    ],
  },
  {
    text: "What's your go-to coffee shop vibe?",
    options: [
      { label: "Warm lighting, worn leather chairs, slow music", personality: "Cozy Classic" },
      { label: "Buzzy and social — I love a bit of noise", personality: "Social Butterfly" },
      { label: "Clean, bright, efficient — get in, get out", personality: "Health Nut" },
      { label: "Minimal, serious, smell of fresh grounds — like a lab", personality: "Deep Dive Purist" },
      { label: "Relaxed and unhurried — time moves differently here", personality: "Afternoon Wanderer" },
    ],
  },
  {
    text: "Someone offers to buy you a coffee. You order:",
    options: [
      { label: "My usual — same thing every time, no hesitation", personality: "Cozy Classic" },
      { label: "The seasonal special — let's try something new", personality: "Social Butterfly" },
      { label: "An americano with oat milk — light and clean", personality: "Health Nut" },
      { label: "Whatever single origin they have on pour-over today", personality: "Deep Dive Purist" },
      { label: "A cortado — small, rich, something to savor slowly", personality: "Afternoon Wanderer" },
    ],
  },
];

const personalities: Record<string, { coffee: string; tagline: string }> = {
  "Cozy Classic": {
    coffee: "Medium Roast Drip",
    tagline: "You know what you love and you love it deeply. Coffee is ritual, not trend.",
  },
  "Social Butterfly": {
    coffee: "Cappuccino",
    tagline: "Coffee is your excuse to connect. Every cup is better shared.",
  },
  "Health Nut": {
    coffee: "Oat Milk Americano",
    tagline: "You're intentional about what goes in your body — and your schedule.",
  },
  "Deep Dive Purist": {
    coffee: "Single Origin Pour-Over",
    tagline: "Coffee isn't a habit for you — it's a practice. You taste what others miss.",
  },
  "Afternoon Wanderer": {
    coffee: "Cortado",
    tagline: "You treat the afternoon like a second chance at the day. Coffee is how you arrive.",
  },
};

type PersonalityKey = keyof typeof personalities;

function calculateResults(answers: string[]) {
  const counts: Record<string, number> = {};
  for (const a of answers) {
    counts[a] = (counts[a] || 0) + 1;
  }
  return (Object.keys(personalities) as PersonalityKey[])
    .map((name) => ({
      name,
      count: counts[name] || 0,
      percentage: Math.round(((counts[name] || 0) / answers.length) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  function handleAnswer(personality: string) {
    setSelected(personality);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQuestion + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleReset() {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelected(null);
    setShowResults(false);
  }

  const results = showResults ? calculateResults(answers) : [];
  const topResult = results[0];

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", padding: "0 0 60px 0" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>

        {!showResults ? (
          <>
            {/* Progress bar */}
            <div style={{ paddingTop: 32, paddingBottom: 24 }}>
              <div style={{ display: "flex", gap: 6 }}>
                {questions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: i <= currentQuestion ? "#c8a96e" : "#2a2a2a",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
              <p style={{ color: "#888", fontSize: 12, marginTop: 10, fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Basecamp Coffee — Find Your Blend
              </p>
            </div>

            {/* Hero image */}
            <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 28 }}>
              <Image
                src="/header-coffee.jpg"
                alt="Basecamp Coffee"
                width={640}
                height={280}
                style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
                priority
              />
            </div>

            {/* Question */}
            <h1
              style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "clamp(2rem, 6vw, 3rem)",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: 28,
                letterSpacing: "0.02em",
              }}
            >
              {questions[currentQuestion].text}
            </h1>

            {/* Answer options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {questions[currentQuestion].options.map((option, i) => {
                const isSelected = selected === option.personality;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.personality)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      background: isSelected ? "#1e1a13" : "#161616",
                      border: `1px solid ${isSelected ? "#c8a96e" : "#2a2a2a"}`,
                      borderRadius: 10,
                      padding: "16px 20px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.2s, background 0.2s",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8a96e";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
                      }
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-bebas-neue), sans-serif",
                        fontSize: 18,
                        color: "#c8a96e",
                        minWidth: 28,
                        lineHeight: 1.4,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        color: isSelected ? "#ffffff" : "#cccccc",
                        fontSize: 15,
                        lineHeight: 1.5,
                        fontFamily: "var(--font-dm-sans), sans-serif",
                      }}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            {selected && (
              <button
                onClick={handleNext}
                style={{
                  marginTop: 24,
                  width: "100%",
                  background: "#c8a96e",
                  color: "#0d0d0d",
                  border: "none",
                  borderRadius: 10,
                  padding: "16px 24px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "0.04em",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
              >
                {currentQuestion + 1 >= questions.length ? "See My Results" : "Next Question"}
              </button>
            )}
          </>
        ) : (
          <>
            {/* Results screen */}
            <div style={{ paddingTop: 32, paddingBottom: 20 }}>
              <p style={{ color: "#c8a96e", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 4 }}>
                Your Coffee Personality
              </p>
            </div>

            {/* Hero image */}
            <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 28 }}>
              <Image
                src="/header-coffee.jpg"
                alt="Basecamp Coffee"
                width={640}
                height={280}
                style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Primary result */}
            <h1
              style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                color: "#ffffff",
                lineHeight: 1.05,
                marginBottom: 8,
                letterSpacing: "0.02em",
              }}
            >
              {topResult.name}
            </h1>
            <p style={{ color: "#c8a96e", fontSize: 15, marginBottom: 32, fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.6 }}>
              {personalities[topResult.name].tagline}
            </p>

            {/* All personality breakdowns */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              {results.map((result) => (
                <div
                  key={result.name}
                  style={{
                    background: "#161616",
                    border: "1px solid #2a2a2a",
                    borderRadius: 10,
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-bebas-neue), sans-serif",
                        fontSize: 20,
                        color: result.name === topResult.name ? "#c8a96e" : "#ffffff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {result.name}
                    </span>
                    <span style={{ color: "#888", fontSize: 13, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      {result.percentage}%
                    </span>
                  </div>
                  {/* Percentage bar */}
                  <div style={{ background: "#2a2a2a", borderRadius: 3, height: 4, marginBottom: 10 }}>
                    <div
                      style={{
                        background: "#c8a96e",
                        height: 4,
                        borderRadius: 3,
                        width: `${result.percentage}%`,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <p style={{ color: "#888", fontSize: 13, fontFamily: "var(--font-dm-sans), sans-serif", margin: 0 }}>
                    Try: <span style={{ color: "#cccccc" }}>{personalities[result.name].coffee}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Reset button */}
            <button
              onClick={handleReset}
              style={{
                width: "100%",
                background: "transparent",
                color: "#c8a96e",
                border: "1px solid #c8a96e",
                borderRadius: 10,
                padding: "16px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.04em",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#c8a96e";
                (e.currentTarget as HTMLButtonElement).style.color = "#0d0d0d";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#c8a96e";
              }}
            >
              Take the quiz again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
