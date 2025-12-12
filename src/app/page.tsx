'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Active section detection
  useEffect(() => {
    if (!isClient) return;

    const sections = ['about', 'education', 'projects', 'university-projects'];
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -20% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      // Create a map of all currently intersecting sections with their ratios
      const intersectingSections = new Map();
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.set(entry.target.id, entry.intersectionRatio);
        }
      });
      
      if (intersectingSections.size > 0) {
        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let activeId = '';
        
        for (const [id, ratio] of intersectingSections) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeId = id;
          }
        }
        
        if (activeId) {
          setActiveSection(activeId);
        }
      }
    }, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [isClient]);

  // Cursor glow effect
  React.useEffect(() => {
    if (!isClient) return;
    
    // Only enable cursor effect on devices with a mouse
    if (window.matchMedia('(pointer: coarse)').matches) {
      return; // Exit early for touch devices
    }

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      // Check if the element or its parent is clickable or scrollable
      const isClickable = element.closest('a, button, [role="button"], input, textarea, select') ||
                          element.tagName === 'A' || 
                          element.tagName === 'BUTTON' || 
                          element.classList.contains('hover-glow') ||
                          element.tagName === 'SVG' ||
                          element.closest('svg');
      
      // Check if we're over a scrollable area
      const isScrollable = element.closest('.modal-scrollbar') ||
                           element.classList.contains('modal-scrollbar') ||
                           getComputedStyle(element).overflowY === 'auto' ||
                           getComputedStyle(element).overflowY === 'scroll';
      
      if (isClickable || isScrollable) {
        cursor.classList.add('hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      
      // Don't remove hover if we're still within a scrollable area
      if (relatedTarget && relatedTarget.closest('.modal-scrollbar')) {
        return;
      }
      
      cursor.classList.remove('hover');
    };

    // Add mouse leave handler for the entire modal to ensure cursor resets
    const handleModalMouseLeave = () => {
      cursor.classList.remove('hover');
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    // Add event listener for modal container
    const modalElements = document.querySelectorAll('.modal-scrollbar');
    modalElements.forEach(modal => {
      modal.addEventListener('mouseleave', handleModalMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      modalElements.forEach(modal => {
        modal.removeEventListener('mouseleave', handleModalMouseLeave);
      });
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, [isClient]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black text-slate-300 font-mono">
      <div className="lg:flex lg:justify-between lg:gap-4 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-8 lg:py-0">
        
        {/* Left Side - Fixed Header */}
        <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 lg:pr-12 lg:relative">
          {/* Vertical Divider Line */}
          <div className="hidden lg:block lg:absolute lg:right-5 lg:top-0 lg:bottom-0 lg:w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent opacity-30"></div>
          
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              Freddy Morgan-Smith
            </h1>
            <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              Cyber Security Student
            </h2>
            <p className="mt-4 max-w-xs leading-normal">
              Learning to defend systems and investigate threats through cyber security and forensics
            </p>
            
            {/* Navigation */}
            <nav className="nav hidden lg:block" aria-label="In-page jump links">
              <ul className="mt-16 w-max">
                <li>
                  <a className={`group flex items-center py-3 ${activeSection === 'about' ? 'active' : ''}`} href="#about">
                    <span className={`nav-indicator mr-4 h-px bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'about' ? 'w-16 bg-slate-200' : 'w-8'}`}></span>
                    <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 transition-colors ${activeSection === 'about' ? 'text-slate-200' : 'text-slate-500'}`}>
                      About
                    </span>
                  </a>
                </li>
                <li>
                  <a className={`group flex items-center py-3 ${activeSection === 'education' ? 'active' : ''}`} href="#education">
                    <span className={`nav-indicator mr-4 h-px bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'education' ? 'w-16 bg-slate-200' : 'w-8'}`}></span>
                    <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 transition-colors ${activeSection === 'education' ? 'text-slate-200' : 'text-slate-500'}`}>
                      Education
                    </span>
                  </a>
                </li>
                <li>
                  <a className={`group flex items-center py-3 ${activeSection === 'projects' ? 'active' : ''}`} href="#projects">
                    <span className={`nav-indicator mr-4 h-px bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'projects' ? 'w-16 bg-slate-200' : 'w-8'}`}></span>
                    <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 transition-colors ${activeSection === 'projects' ? 'text-slate-200' : 'text-slate-500'}`}>
                      Personal Projects
                    </span>
                  </a>
                </li>
                <li>
                  <a className={`group flex items-center py-3 ${activeSection === 'university-projects' ? 'active' : ''}`} href="#university-projects">
                    <span className={`nav-indicator mr-4 h-px bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'university-projects' ? 'w-16 bg-slate-200' : 'w-8'}`}></span>
                    <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 transition-colors ${activeSection === 'university-projects' ? 'text-slate-200' : 'text-slate-500'}`}>
                      University Projects
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Social Links */}
          <ul className="mt-8 flex items-center" aria-label="Social media">
            <li className="mr-5 text-xs shrink-0">
              <a className="block hover:text-slate-200" href="https://github.com/FreddyMorganSmith" target="_blank" rel="noreferrer noopener" aria-label="GitHub (opens in a new tab)" title="GitHub">
                <span className="sr-only">GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </li>
            <li className="mr-5 text-xs shrink-0">
              <a className="block hover:text-slate-200" href="https://www.linkedin.com/in/freddy-morgan-smith-889438335" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </li>
            <li className="mr-5 text-xs shrink-0">
              <a className="block hover:text-slate-200" href="mailto:fred05.ks@gmail.com" aria-label="Email" title="Email">
                <span className="sr-only">Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Scrollable Content */}
        <main className="pt-24 lg:w-1/2 lg:py-24">
          
          {/* Section Divider */}
          <div className="mb-16 md:mb-24 lg:mb-36">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-slate-600 section-divider"></div>
              <h2 className="px-6 text-sm font-bold uppercase tracking-widest text-slate-400 divider-title">About</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-600 to-slate-600 section-divider"></div>
            </div>
          </div>

          {/* About Section */}
          <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-gradient-to-r from-slate-900/75 to-black/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
            </div>
            <div>
              <p className="mb-4">
                I&apos;m a 2nd year Cyber Security and Digital Forensics student at Bournemouth University with a keen interest in defensive security. I particularly enjoy incident response and malware analysis. Through my degree and personal projects, I&apos;ve tackled CTF challenges on TryHackMe and built an e-commerce automation system in Python. I maintain a home lab where I use Wireshark to inspect network traffic and develop my analytical skills.
              </p>
              <p className="mb-4">
                Beyond my studies, I&apos;ve gained practical experience in IT support working with Active Directory and helpdesk troubleshooting. As a Team Leader at JD Wetherspoons, I developed my leadership abilities by managing staff and coordinating shifts in a busy environment. These experiences have helped me build both technical expertise and the soft skills needed for a career in cyber security.
              </p>
              <p>
                Outside of technology, I&apos;m a long distance runner and gym regular. These activities have taught me discipline and resilience that carry over into my academic work.
              </p>
            </div>
          </section>

          {/* Section Divider */}
          <div className="mb-16 md:mb-24 lg:mb-36">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-slate-600 section-divider"></div>
              <h2 className="px-6 text-sm font-bold uppercase tracking-widest text-slate-400 divider-title">Education</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-600 to-slate-600 section-divider"></div>
            </div>
          </div>

          {/* Education Section */}
          <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Education">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-gradient-to-r from-slate-900/75 to-black/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Education</h2>
            </div>
            <div>
              <ol className="group/list">
                
                {/* Education Item 1 */}
                <li className="mb-12">
                  <div className="group relative">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="relative z-10 pb-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <header className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500" aria-label="2023 to Current">
                        2023 — Current
                      </header>
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="https://www.bournemouth.ac.uk/study/courses/bsc-hons-cyber-security-digital-forensics" target="_blank" rel="noreferrer noopener" aria-label="Cyber Security and Digital Forensics BSc at Bournemouth University (opens in a new tab)">
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>Cyber Security and Digital Forensics BSc · Bournemouth University</span>
                          </a>
                        </div>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">
                        Currently studying cyber security and digital forensics with a focus on defensive security and threat analysis. Gaining practical experience through labs and CTF challenges whilst working on collaborative security projects.
                      </p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Relevant coursework">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Cyber Security</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Digital Forensics</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Ethical Hacking</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* Education Item 2 */}
                <li className="mb-12">
                  <div className="group relative">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="relative z-10 pb-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <header className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500" aria-label="2021 to 2023">
                        2021 — 2023
                      </header>
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                            A-Levels · Coopers School
                          </span>
                        </div>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">
                        Completed A-Levels in Computer Science and Politics. Built a strong foundation in programming whilst developing analytical thinking skills.
                      </p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Key subjects">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Computer Science</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Politics</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Section Divider */}
          <div className="mb-16 md:mb-24 lg:mb-36">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-slate-600 section-divider"></div>
              <h2 className="px-6 text-sm font-bold uppercase tracking-widest text-slate-400 divider-title">Personal Projects</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-600 to-slate-600 section-divider"></div>
            </div>
          </div>

          {/* Personal Projects Section */}
          <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Selected personal projects">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-gradient-to-r from-slate-900/75 to-black/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Personal Projects</h2>
            </div>
            <div>
              <ul className="group/list">

                {/* Project 1 - TryHackMe Writeups */}
                <li className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 order-1 sm:order-2 sm:col-span-6">
                      <h3>
                        <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="https://github.com/FreddyMorganSmith/tryhackme-writeups" target="_blank" rel="noreferrer noopener" aria-label="TryHackMe Room Writeups (opens in a new tab)">
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>TryHackMe Room Writeups</span>
                          <span className="inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                            </svg>
                          </span>
                        </a>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Detailed writeups for various TryHackMe rooms documenting my cybersecurity learning journey. Each writeup explains the approach taken and the tools used to solve different penetration testing challenges.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Penetration Testing</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">CTF Challenges</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Security Tools</div>
                        </li>
                      </ul>
                    </div>
                    <div className="z-10 order-0 sm:order-1 sm:col-span-2 mb-4 sm:mb-0">
                      <div className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1">
                        <div className="h-16 w-full bg-[#1a1a1a] rounded flex items-center justify-center p-2">
                          <span className="text-xl font-bold">
                            <span className="text-white">Try</span>
                            <span className="text-[#c11c13]">Hack</span>
                            <span className="text-white">Me</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Project 2 - Home Lab Kali VM */}
                <li className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 order-1 sm:order-2 sm:col-span-6">
                      <h3>
                        <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="https://github.com/FreddyMorganSmith/linux-kali-lab" target="_blank" rel="noreferrer noopener" aria-label="Home Lab — Kali VM (VirtualBox) (opens in a new tab)">
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>Home Lab — Kali VM (VirtualBox)</span>
                          <span className="inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                            </svg>
                          </span>
                        </a>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Personal home lab running a Kali Linux VM for cyber security practice. Set up with dual network adapters to safely test penetration techniques and analyse network traffic.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">VirtualBox</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Kali Linux</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Network Security</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Home Lab</div>
                        </li>
                      </ul>
                    </div>
                    <div className="z-10 order-0 sm:order-1 sm:col-span-2 mb-4 sm:mb-0">
                      <div className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1">
                        <div className="h-16 w-full bg-white rounded flex items-center justify-center p-2">
                          <Image 
                            src="/kali-logo.png" 
                            alt="Kali Linux Logo" 
                            width={48} 
                            height={48} 
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Project 3 - Home Wi-Fi Security */}
                <li className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 order-1 sm:order-2 sm:col-span-6">
                      <h3>
                        <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="https://github.com/FreddyMorganSmith/home-network-security" target="_blank" rel="noreferrer noopener" aria-label="Home Wi-Fi Security Assessment (opens in a new tab)">
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>Home Wi-Fi Security Assessment</span>
                          <span className="inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                            </svg>
                          </span>
                        </a>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Security assessment and hardening of my home Wi-Fi network. Configured router security settings and used Wireshark to analyse network traffic patterns and DNS requests.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Wireshark</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Network Security</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Router Configuration</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Traffic Analysis</div>
                        </li>
                      </ul>
                    </div>
                    <div className="z-10 order-0 sm:order-1 sm:col-span-2 mb-4 sm:mb-0">
                      <div className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1">
                        <div className="h-16 w-full bg-white rounded flex items-center justify-center p-2">
                          <Image 
                            src="/wifi-logo.png" 
                            alt="Wi-Fi Logo" 
                            width={48} 
                            height={48} 
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Project 4 - Home Server with VPN */}
                <li className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 order-1 sm:order-2 sm:col-span-6">
                      <h3>
                        <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                          <span>Home Server with VPN & Nextcloud</span>
                        </span>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Built a self-hosted home server using Ubuntu Server and Docker to run Nextcloud for private file storage. Configured WireGuard VPN for secure remote access from anywhere. This project helped me develop practical Linux administration skills and understand containerisation better.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Ubuntu Server</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Docker</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Nextcloud</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">WireGuard VPN</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Self-Hosted</div>
                        </li>
                      </ul>
                    </div>
                    <div className="z-10 order-0 sm:order-1 sm:col-span-2 mb-4 sm:mb-0">
                      <div className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1">
                        <div className="h-16 w-full bg-[#2496ED] rounded flex items-center justify-center p-2">
                          <span className="text-2xl font-bold text-white">Docker</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Project 5 - Splunk SIEM Lab */}
                <li className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 order-1 sm:order-2 sm:col-span-6">
                      <h3>
                        <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                          <span>Splunk SIEM Practice Lab</span>
                        </span>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Set up Splunk on my home server to practise SIEM tools and log analysis. Created custom dashboards and wrote search queries to detect security events. This project has been valuable for developing skills needed in SOC analyst roles.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Splunk</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">SIEM</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Log Analysis</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Security Monitoring</div>
                        </li>
                      </ul>
                    </div>
                    <div className="z-10 order-0 sm:order-1 sm:col-span-2 mb-4 sm:mb-0">
                      <div className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1">
                        <div className="h-16 w-full bg-[#000000] rounded flex items-center justify-center p-2">
                          <span className="text-2xl font-bold text-[#ff6b00]">Splunk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Project 6 - CTF & OverTheWire */}
                <li className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 order-1 sm:order-2 sm:col-span-6">
                      <h3>
                        <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                          <span>CTF Challenges & OverTheWire Wargames</span>
                        </span>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Regular participation in CTF challenges and OverTheWire wargames to develop practical security skills. These challenges cover topics like web exploitation and privilege escalation. Consistent practice has really helped sharpen my problem-solving abilities.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">CTF</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">OverTheWire</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Problem Solving</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Linux</div>
                        </li>
                      </ul>
                    </div>
                    <div className="z-10 order-0 sm:order-1 sm:col-span-2 mb-4 sm:mb-0">
                      <div className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1">
                        <div className="h-16 w-full bg-gradient-to-br from-red-900 to-red-700 rounded flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-white">
                            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Project 7 - Reverse Engineering */}
                <li className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 order-1 sm:order-2 sm:col-span-6">
                      <h3>
                        <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                          <span>Reverse Engineering Practice — Crackme Challenges</span>
                        </span>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Completed a reverse engineering learning project analysing beginner crackme programs from crackmes.one. Used radare2 and Cutter to examine program structure whilst employing strace and ltrace to monitor system calls. This helped me understand how DFIR analysts approach unknown files and how to safely test binaries in a controlled environment.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Radare2</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Cutter</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Wireshark</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">strace/ltrace</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Binary Analysis</div>
                        </li>
                      </ul>
                    </div>
                    <div className="z-10 order-0 sm:order-1 sm:col-span-2 mb-4 sm:mb-0">
                      <div className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1">
                        <div className="h-16 w-full bg-[#1a1a1a] rounded flex items-center justify-center p-2">
                          <span className="text-2xl font-bold text-white">radare2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>


              </ul>
            </div>
          </section>

          {/* Section Divider */}
          <div className="mb-16 md:mb-24 lg:mb-36">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-slate-600 section-divider"></div>
              <h2 className="px-6 text-sm font-bold uppercase tracking-widest text-slate-400 divider-title">University Projects</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-600 to-slate-600 section-divider"></div>
            </div>
          </div>

          {/* University Projects Section */}
          <section id="university-projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="University projects">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-gradient-to-r from-slate-900/75 to-black/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">University Projects</h2>
            </div>
            <div>
              <ul className="group/list">
                
                {/* University Project 1 - Trikommerce */}
                <li className="mb-12">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 sm:col-span-8">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="https://github.com/FreddyMorganSmith/Task-B" target="_blank" rel="noreferrer noopener" aria-label="Trikommerce Project (opens in a new tab)">
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>Trikommerce Project</span>
                            <span className="inline-block">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                              </svg>
                            </span>
                          </a>
                        </div>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">A Python e-commerce application developed for university coursework. This project helped solidify my understanding of object-oriented programming and software engineering practices.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Python</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Object-Oriented Programming</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">University Project</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* University Project 2 - Steve Irwin AI Chatbot */}
                <li className="mb-12">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 sm:col-span-8">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                            <span>Steve Irwin AI Chatbot</span>
                          </span>
                        </div>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Team project where we built an interactive AI chatbot for zoo information displays. The chatbot delivers animal facts in Steve Irwin&apos;s style. I worked on both frontend and backend development whilst learning proper GitHub collaboration workflows.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Team Collaboration</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">GitHub</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Full Stack</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">AI Chatbot</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* University Project 3 - Structured Penetration Test */}
                <li className="mb-12">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 sm:col-span-8">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                            <span>Structured Penetration Test — PTES Methodology</span>
                          </span>
                        </div>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">Conducted a penetration test following PTES methodology on vulnerable VMs for my Ethical Hacking module. Successfully identified and exploited security weaknesses through reconnaissance and exploitation phases. Captured all flags and documented findings in a professional pentest report.</p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">PTES Methodology</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Penetration Testing</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Ethical Hacking</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Exploitation</div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Report Writing</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>


              </ul>
            </div>
          </section>

          {/* Footer */}
          <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
            <p>
              Built with <a href="https://nextjs.org/" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer noopener" aria-label="Next.js (opens in a new tab)">Next.js</a> and <a href="https://tailwindcss.com/" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer noopener" aria-label="Tailwind CSS (opens in a new tab)">Tailwind CSS</a>, deployed with <a href="https://vercel.com/" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer noopener" aria-label="Vercel (opens in a new tab)">Vercel</a>.
            </p>
          </footer>
        </main>
      </div>

    </div>
  );
}
