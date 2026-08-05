'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  whoami      — who is Shaanif?
  skills      — technical skills
  experience  — work history
  projects    — featured projects
  education   — academic background
  contact     — how to reach me
  sudo hire-me — 😏
  coffee --brew — ☕
  clear       — clear terminal`,

  whoami: `Shaanif Ahmed
Backend & Full-Stack Developer from Karnataka, India.
Building REST APIs, SaaS backends, and ERP customizations
with Python, Node.js, and a love for clean architecture.`,

  skills: `Languages:    Python • SQL • JavaScript • Java
Frameworks:   FastAPI • Django • Flask • Node.js
ERP:          ERPNext • Odoo • Frappe
Databases:    PostgreSQL • MySQL • MariaDB • SQLite
Cloud/DevOps: AWS • Docker • Nginx
Tools:        Git • Postman • VS Code
GenAI:        HuggingFace • Ollama`,

  experience: `▸ Co-Founder @ AtomNext Solutions  (Jan 2025 – Jun 2026)
  AI chatbot integration & client delivery
▸ Mentor @ GirlScript SoC         (Aug 2025 – Oct 2025)
  Open-source mentorship & code reviews
▸ Intern @ Sada Smart Solutions    (May 2025 – Nov 2025)
  Backend APIs, ERPNext customization`,

  projects: `★ Voltix     — EV charging ecosystem (Django, Docker)
★ YentraSetu — Heavy machinery marketplace (Frappe)
★ AtomNext   — AI automation company site
★ VisionNetX — Image classification pipeline (TensorFlow)
★ BookHive   — Library management system (Django)
★ Nextomic   — AI-powered budgeting app`,

  education: `🎓 BCA — Anjuman Institute of Management
   CGPA: 8.64 | Oct 2023 – Jul 2026`,

  contact: `📧 shaaniffakki@gmail.com
🔗 linkedin.com/in/shaanif-ahmed-765934233
🐙 github.com/shaanlabs`,

  'sudo hire-me': `
  ╔═══════════════════════════════════════════╗
  ║                                           ║
  ║   🎉 Permission granted!                  ║
  ║                                           ║
  ║   Shaanif is available for hire.           ║
  ║   Send an email or connect on LinkedIn.   ║
  ║                                           ║
  ║   → shaaniffakki@gmail.com                ║
  ║   → /in/shaanif-ahmed-765934233           ║
  ║                                           ║
  ╚═══════════════════════════════════════════╝`,

  'coffee --brew': `
         ( (
          ) )
        ........
        |      |]
        \\      /
         \`----'
  
  ☕ Brewing... Done!
  Your coffee is ready. Now let's code.`,
};

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'Welcome to shaanif@portfolio. Type "help" for available commands.',
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', content: cmd },
    ];

    if (trimmed === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    if (trimmed === '') {
      setLines(newLines);
      setInput('');
      return;
    }

    const output = COMMANDS[trimmed];
    if (output) {
      newLines.push({ type: 'output', content: output });
    } else {
      newLines.push({
        type: 'output',
        content: `command not found: ${trimmed}. Type "help" for available commands.`,
      });
    }

    setLines(newLines);
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden max-w-2xl mx-auto"
      style={{ boxShadow: 'var(--shadow-lg), 0 0 40px rgba(99, 102, 241, 0.08)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-text-muted text-xs font-mono ml-2">
          shaanif@portfolio — bash
        </span>
      </div>

      {/* Terminal content */}
      <div
        ref={scrollRef}
        className="p-4 h-[320px] overflow-y-auto font-mono text-sm"
        style={{ background: 'var(--surface-solid)' }}
      >
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === 'input' ? (
              <div className="flex gap-2">
                <span className="text-accent-secondary">shaanif@portfolio</span>
                <span className="text-text-muted">:</span>
                <span className="text-accent">~</span>
                <span className="text-text-muted">$</span>
                <span className="text-text-primary">{line.content}</span>
              </div>
            ) : (
              <pre className="text-text-secondary whitespace-pre-wrap leading-relaxed">
                {line.content}
              </pre>
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex gap-2 items-center">
          <span className="text-accent-secondary">shaanif@portfolio</span>
          <span className="text-text-muted">:</span>
          <span className="text-accent">~</span>
          <span className="text-text-muted">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-text-primary outline-none
                       caret-accent font-mono text-sm"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
