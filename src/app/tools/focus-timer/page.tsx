"use client";

import { useState, useEffect, useRef } from "react";
import SmartBanner from "@/components/SmartBanner";

export default function FocusTimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [cycles, setCycles] = useState(0);
  
  // Use a ref to store the interval ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update document title with current time
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.title = `${timeString} - ${mode === "focus" ? "Focus" : "Break"} | DevTools Pro`;
    
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      
      // Play a notification sound if possible
      try {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");
        audio.play().catch(e => console.log("Audio play blocked by browser"));
      } catch (e) {}

      if (mode === "focus") {
        setMode("break");
        setTimeLeft(5 * 60); // 5 min break
        setCycles(c => c + 1);
      } else {
        setMode("focus");
        setTimeLeft(25 * 60); // 25 min focus
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, timeLeft, mode]);

  // Clean up title on unmount
  useEffect(() => {
    return () => { document.title = "DevTools Pro"; };
  }, []);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const setFocusMode = () => {
    setIsActive(false);
    setMode("focus");
    setTimeLeft(25 * 60);
  };

  const setBreakMode = () => {
    setIsActive(false);
    setMode("break");
    setTimeLeft(5 * 60);
  };

  // Format time for display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const isFocus = mode === "focus";
  const primaryColor = isFocus ? "#ef4444" : "#10b981"; // Red for focus, Green for break
  const primaryColorRgb = isFocus ? "239, 68, 68" : "16, 185, 129";

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Pomodoro Focus Timer</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Boost your productivity with the Pomodoro technique. Keep this tab open to track your work sessions and breaks.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Timer Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
          
          <div 
            className="glass-panel" 
            style={{ 
              padding: '3rem', 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              border: `2px solid rgba(${primaryColorRgb}, 0.3)`,
              boxShadow: `0 0 40px rgba(${primaryColorRgb}, 0.1)`,
              transition: 'all 0.5s ease'
            }}
          >
            {/* Mode Switchers */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
              <button 
                onClick={setFocusMode}
                style={{ 
                  background: isFocus ? `rgba(${primaryColorRgb}, 0.2)` : 'transparent',
                  color: isFocus ? primaryColor : 'var(--text-secondary)',
                  border: isFocus ? `1px solid ${primaryColor}` : '1px solid var(--glass-border)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Focus (25m)
              </button>
              <button 
                onClick={setBreakMode}
                style={{ 
                  background: !isFocus ? `rgba(${primaryColorRgb}, 0.2)` : 'transparent',
                  color: !isFocus ? primaryColor : 'var(--text-secondary)',
                  border: !isFocus ? `1px solid ${primaryColor}` : '1px solid var(--glass-border)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Break (5m)
              </button>
            </div>

            {/* The Timer */}
            <div style={{ 
              fontSize: '8rem', 
              fontWeight: 800, 
              letterSpacing: '-2px',
              fontFamily: 'monospace',
              color: '#fff',
              textShadow: `0 0 20px rgba(${primaryColorRgb}, 0.4)`,
              lineHeight: 1,
              marginBottom: '3rem'
            }}>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '300px' }}>
              <button 
                onClick={toggleTimer}
                style={{ 
                  flex: 2,
                  background: isActive ? 'transparent' : primaryColor,
                  color: isActive ? primaryColor : '#fff',
                  border: `2px solid ${primaryColor}`,
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  transition: 'all 0.2s'
                }}
              >
                {isActive ? "PAUSE" : "START"}
              </button>
              <button 
                onClick={resetTimer}
                style={{ 
                  flex: 1,
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                RESET
              </button>
            </div>

            {/* Stats */}
            <div style={{ marginTop: '3rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Completed Focus Sessions: <strong style={{ color: '#fff' }}>{cycles}</strong>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SmartBanner type="productivity" />
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>How it works</h3>
            <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Decide on the task to be done.</li>
              <li style={{ marginBottom: '0.5rem' }}>Set the timer to 25 minutes.</li>
              <li style={{ marginBottom: '0.5rem' }}>Work on the task until the timer rings.</li>
              <li style={{ marginBottom: '0.5rem' }}>Take a short 5 minute break.</li>
              <li>After 4 cycles, take a longer 15-30 minute break.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
