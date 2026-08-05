'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Folder, Mail, User, Code2, GraduationCap, Command, FileText } from 'lucide-react';

interface CommandItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
  section: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const closePalette = () => {
    setIsOpen(false);
    setSearch('');
  };

  const navigateTo = (selector: string) => {
    closePalette();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    { id: 'hero', name: 'Home', icon: <User className="w-4 h-4" />, action: () => navigateTo('#hero'), section: 'Navigation' },
    { id: 'about', name: 'About Me', icon: <FileText className="w-4 h-4" />, action: () => navigateTo('#about'), section: 'Navigation' },
    { id: 'experience', name: 'Experience', icon: <Folder className="w-4 h-4" />, action: () => navigateTo('#experience'), section: 'Navigation' },
    { id: 'projects', name: 'Projects', icon: <Code2 className="w-4 h-4" />, action: () => navigateTo('#projects'), section: 'Navigation' },
    { id: 'skills', name: 'Skills', icon: <Code2 className="w-4 h-4" />, action: () => navigateTo('#skills'), section: 'Navigation' },
    { id: 'education', name: 'Education', icon: <GraduationCap className="w-4 h-4" />, action: () => navigateTo('#education'), section: 'Navigation' },
    { id: 'contact', name: 'Contact', icon: <Mail className="w-4 h-4" />, action: () => navigateTo('#contact'), section: 'Navigation' },
    
    // Actions
    { id: 'resume', name: 'Download Resume', icon: <FileText className="w-4 h-4" />, action: () => {
      window.open('/Shaanif_Ahmed_Resume.docx', '_blank');
      closePalette();
    }, section: 'Actions' },
    { id: 'github', name: 'GitHub Profile', icon: <Code2 className="w-4 h-4" />, action: () => {
      window.open('https://github.com/shaanlabs', '_blank');
      closePalette();
    }, section: 'Actions' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg mx-4 glass rounded-2xl shadow-2xl overflow-hidden border border-glass-border"
          >
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-muted"
              />
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-hover border border-border text-xs text-text-muted font-mono">
                <span>esc</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-text-muted">
                  No results found for "{search}"
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-hover text-left transition-colors group"
                    >
                      <div className="text-text-muted group-hover:text-accent transition-colors">
                        {cmd.icon}
                      </div>
                      <span className="flex-1 text-text-primary text-sm font-medium">
                        {cmd.name}
                      </span>
                      <span className="text-xs text-text-muted">
                        {cmd.section}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-border bg-surface-hover/30 text-xs text-text-muted flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>Command Palette</span>
              </span>
              <span>Use arrows to navigate</span>
              <span>Enter to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
