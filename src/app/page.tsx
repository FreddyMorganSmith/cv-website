'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <div className="lg:flex lg:justify-between lg:gap-4 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        
        {/* Left Side - Fixed Header */}
        <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
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
                  <a className="group flex items-center py-3 active" href="#about">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      About
                    </span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center py-3" href="#education">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      Education
                    </span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center py-3" href="#projects">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      Personal Projects
                    </span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center py-3" href="#university-projects">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      University Projects
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Social Links */}
          <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
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
          
          {/* About Section */}
          <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-gradient-to-r from-slate-900/75 to-black/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
            </div>
            <div>
              <p className="mb-4">
                I&apos;m a 2nd year Cyber Security and Digital Forensics student at Bournemouth University with a strong interest in defensive security, particularly incident response and malware analysis. Through my degree and personal exploration, I&apos;ve worked on projects ranging from CTF challenges and TryHackMe labs to configuring networks in Cisco Packet Tracer and building an e-commerce automation system in Python. I also maintain a home lab where I use tools like Wireshark to inspect network traffic and strengthen my analytical skills.
              </p>
              <p className="mb-4">
                Along with my studies, I have gained hands-on experience in IT support, which includes Active Directory and helpdesk troubleshooting. I have also developed leadership and teamwork skills as a Team Leader at JD Wetherspoons, where I was tasked with the responsibility of managing staff members, coordinating shifts, and ensuring smooth day-to-day operations in a high-stress environment. But these experiences have not only technically empowered me but also professionally prepared me to handle challenges in the domain of cyber security.
              </p>
              <p>
                Aside from cyber security, I am also a long-distance runner and gym enthusiast, activities that render me disciplined, resilient, and motivated; qualities that I also extend to my academic and professional life.
              </p>
            </div>
          </section>

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
                        Currently pursuing a comprehensive degree in cyber security and digital forensics with a focus on defensive security, ethical hacking, and threat analysis. Gaining hands-on experience through practical labs, CTF challenges, and collaborative security projects.
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
                        Completed A-Level studies with a focus on Computer Science and Politics. Developed strong analytical and critical thinking skills while building a foundation in programming and understanding complex political systems.
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
                      <p className="mt-2 text-sm leading-normal">A collection of detailed writeups for various TryHackMe rooms, documenting my journey through different cybersecurity challenges. Each writeup includes step-by-step solutions, tools used, and lessons learned about penetration testing and security concepts.</p>
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


              </ul>
            </div>
          </section>

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
                      <p className="mt-2 text-sm leading-normal">A Python-based e-commerce application developed as part of university coursework. This project demonstrates understanding of object-oriented programming principles, data structures, and software engineering practices.</p>
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
