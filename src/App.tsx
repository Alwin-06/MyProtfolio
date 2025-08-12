import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail, Github, Linkedin, ExternalLink, Download, Eye, Sun, Moon } from 'lucide-react';
import { motion } from "framer-motion";


const projects = [
  {
    title: " FastTrack - Delivery Management System",
    description: "A cross-platform delivery management system with real-time tracking, intelligent packet-agent matching, and optimized routing powered by a custom greedy algorithm.",
    github: "https://github.com/Alwin-06/Mini_Project-Fasttrack",
    tech: ["HTML","CSS","JavaScript", "Python(Flask)", "Firebase","Flutter"]
  },
  {
    title: "Yumzz",
    description: "A full-stack MERN platform connecting users and restaurant owners to plan and manage digital food service solutions, featuring a responsive React.js frontend, secure RESTful APIs with JWT authentication, and MongoDB-powered data management.",
    github: "https://github.com/Alwin-06/Food_Ordering_Website-Yumzz",
    tech: ["Node.js", "React", "MongoDB", "Stripe","Express.js"]
  },
  {
    title: " Lab Management System",
    description: "A role-based lab management platform for the CS department with attendance tracking, lab assignments, and secure DOB-based password resets, built to streamline student, staff, and course management.",
    github: "https://github.com/Alwin-06/LMS",
    tech: ["HTML","CSS","JavaScript", "Python(Flask)","MySQL"]
  },
  {
    title: "Notifier",
    description: "A full-stack MERN productivity platform with task management, special date reminders, and a personal diary, featuring JWT-secured RESTful APIs, Twilio-powered WhatsApp alerts, and a responsive Tailwind CSS interface backed by MongoDB storage.",
    github: "https://github.com/Alwin-06/Notifier",
    tech: ["Node.js", "React", "MongoDB", "Express.js"]
  },
  {
    title: "Tic Tac Toe Game",
    description: "A browser-based two-player Tic Tac Toe game built with HTML, CSS, and JavaScript, featuring real-time gameplay logic, responsive design, and a clean, interactive UI for a smooth cross-device experience.",
    github: "https://github.com/Alwin-06/Tic-Tac-Toe",
    tech: ["HTML","CSS","JavaScript"]
  },
  {
    title: " Rock Paper Scissors Game",
    description: "An interactive Rock Paper Scissors game with single-player mode against a computer opponent, featuring randomized AI choices, real-time results, intuitive visuals, and a fully responsive design for an engaging user experience.",
    github: "https://github.com/Alwin-06/Games",
    tech: ["HTML","CSS","JavaScript"]
  },
  {
    title: " Cat vs Dog Classifier",
    description: "A CNN-based image classifier that accurately distinguishes between cat and dog images, enhancing expertise in deep learning, image classification, and model evaluation techniques.",
    github: "https://github.com/Alwin-06/Image_Classification-ML",
    tech: ["Python"]
  },
  {
    title: "Blog",
    description: "A MERN-stack blog platform enabling users to create, view, and manage blogs with titles, descriptions, and authors, featuring RESTful APIs, MongoDB storage, and a responsive React-based UI for seamless backend-frontend integration.",
    github: "https://github.com/Alwin-06/BLOG",
    tech: ["Node.js", "React", "MongoDB", "Express.js"]
  }
];

const certificates = [
  { name: "NPTEL - Digital System Design", image: "/images/NPTEL.jpg" },
  { name: "IBM SkillsBuild", image: "/images/IBM.jpg" },
  { name: "FULL STACK WEB DEVELOPMENT", image: "/images/MERN.jpg" },
  { name: "Cyber Security", image: "/images/Cyber.jpg" },
  { name: "Machine Learning", image: "/images/ML.jpg" },
  { name: "IIT Certified", image: "/images/IIT.jpg" }
];

// Robot Mascot Component

const RobotMascot = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 }); // Kept for potential image movement
  const [isBlinking, setIsBlinking] = useState(false);
  const [position, setPosition] = useState({ x: 32, y: 32 });
  const [isDragging, setIsDragging] = useState(false);
  const [showDragHint, setShowDragHint] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Mouse tracking and dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Blinking (applies to image opacity for a subtle effect)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    setShowDragHint(false);
  };

  return (
    <>
      <div
        id="robot-mascot"
        className="fixed z-50 cursor-pointer select-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isDragging ? "scale(1.08)" : "scale(1)",
          transition: isDragging ? "none" : "transform 0.2s ease"
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setShowDragHint(true)}
        onMouseLeave={() => !isDragging && setShowDragHint(false)}
      >
        <div className={!isDragging ? "animate-float" : ""}>
          <img
            src="images/robot-helper.png" // Place your file in public folder
            alt="Robot Helper"
            width={120}
            height={120}
            style={{
              filter: isDarkMode ? "brightness(1)" : "brightness(0.8)",
              opacity: isBlinking ? 0.9 : 1,
              transition: "opacity 0.15s ease"
            }}
          />
        </div>

        {/* Drag hint */}
        {showDragHint && !isDragging && (
          <div
            className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap border animate-bounce ${
              isDarkMode
                ? "bg-gray-800 text-cyan-400 border-cyan-400/30"
                : "bg-white text-purple-600 border-purple-400/30 shadow-lg"
            }`}
          >
            Drag me! 🤖
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};



// Theme Toggle Component
const ThemeToggle = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean; toggleTheme: () => void }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
        isDarkMode 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// Navbar Component
const Navbar = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean; toggleTheme: () => void }) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'certificates', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/80 border-gray-700/50' 
        : 'bg-white/80 border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <div className={`w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300`}>
              <span className="text-gray-900 font-black text-lg">A</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors duration-300 hover:text-cyan-400 ${
                  activeSection === item.toLowerCase() 
                    ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' 
                    : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};

// Hero Component with Typewriter Effect
const roles = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Machine Learning Explorer",
  "Creative Problem Solver"
];

const Hero = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // timing config (tweak to taste)
  const TYPING_SPEED = 100;   // ms per char when typing
  const DELETING_SPEED = 50;  // ms per char when deleting
  const PAUSE_AFTER_FULL = 1500; // pause after full word typed

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // TYPING
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, TYPING_SPEED);
      } else {
        // full word typed -> pause then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_FULL);
      }
    } else {
      // DELETING
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        }, DELETING_SPEED);
      } else {
        // finished deleting -> move to next role and start typing
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center pt-20 transition-colors duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Text Content */}
        <div className="space-y-6 order-2 lg:order-1">
          <h2 className="text-lg font-medium opacity-80">
            Hi, I am <span className="font-semibold">Alwin Philip</span>
          </h2>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            I am{" "}
            <span className="text-cyan-400">{displayedText}</span>
            <span className="animate-pulse text-cyan-500">|</span>
          </h1>

          <p
            className={`max-w-xl text-base sm:text-lg leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Passionate about crafting user-friendly, innovative, and scalable
            digital products. Always exploring new technologies and creative
            solutions to bring ideas to life.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              View My Work
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Right Photo Section */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.img
            src="/images/profile.jpg" // Your single profile image (put in public/images)
            alt="Profile"
            className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
};


// About Component
const About = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const skillsData = [
    { title: "Languages", items: ["English", "Hindi", "Malayalam"] },
    { title: "Education", items: ["B.Tech in Computer Science and Engineering (2022 - 2026)"] },
    { title: "Soft Skill", items: ["Problem Solving", "Team Collaboration", "Adaptability","Critical Thinking","Technical Documentation","Empathy in Design"] },
    { title: "Experience", items: ["2 Years Full-Stack Development", "ISTE WEB Team Member"] },
  ];

  return (
    <section
      id="about"
      className={`py-16 sm:py-20 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Side - About Text */}
        <div className="text-center md:text-left">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About <span className="text-cyan-400">Me</span>
          </h2>

          <div
            className={`text-l sm:text-x leading-relaxed mb-12 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            I’m a passionate Full-Stack Developer, UI/UX enthusiast, and driven B.Tech Computer Science student with over 2 years of experience building scalable web applications and exploring the world of Machine Learning and AI. With a strong foundation in full-stack development, Python, and core CS concepts, I’ve built real-world applications using the MERN stack and geolocation logic.

            I focus on crafting intuitive, user-centered interfaces that merge creativity with technical precision, ensuring every project is both functional and visually engaging. My current interests lie in intelligent systems and software-hardware integration, and I’m passionate about clean code and continuous learning.
          </div>

          <div className="flex flex-wrap justify-center md:justify-center gap-4 sm:gap-6">
            <a
              href="images/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-900 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
            >
              <Eye size={20} />
              View Resume
            </a>
            <button className="flex items-center gap-2 border-2 border-cyan-400 text-cyan-400 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 text-sm sm:text-base">
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>

        {/* Right Side - Animated Vertical Motion */}
        <div className="relative overflow-hidden h-80 flex items-center justify-center">
          <motion.div
            className="flex flex-col gap-8"
            animate={{ y: ["0%", "-40%"] }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
            }}
          >
            {[...skillsData, ...skillsData].map((section, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg shadow-md w-64 ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                  {section.title}
                </h3>
                <ul className="list-disc list-inside text-sm">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};




/**
 * Skills component with 3 concentric rings that rotate.
 * - inner  = Programming Languages
 * - middle = Tools & Technologies
 * - outer  = Web Development
 *
 * Icons/logos are from your provided CDN links.
 */

const skillsData = {
  "Programming Languages": [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" }
  ],
  "Tools & Technologies": [
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
  ],
  "Web Development": [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" }
  ]
};

type OrbitDef = {
  key: string;
  items: { name: string; logo: string }[];
  radius: number;    // px - distance from center to items
  duration: number;  // seconds for full rotation
  clockwise?: boolean;
  ringStroke?: string; // optional ring color class
};

const Skills: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 640);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // tune these to change spacing and speeds
  const orbits: OrbitDef[] = [
    { key: "inner", items: skillsData["Programming Languages"], radius: 80, duration: 18, clockwise: true, ringStroke: "border-white/8" },
    { key: "middle", items: skillsData["Tools & Technologies"], radius: 140, duration: 30, clockwise: false, ringStroke: "border-white/6" },
    { key: "outer", items: skillsData["Web Development"], radius: 200, duration: 46, clockwise: true, ringStroke: "border-white/5" }
  ];

  const outerRadius = Math.max(...orbits.map(o => o.radius));
  const bubbleSize = isMobile ? 40 : 56; // px (w-14)
  // container size ensures space for orbit + bubble outside
  const containerSize = outerRadius * 2 + bubbleSize + 40; // extra padding

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-10 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          My <span className="text-cyan-400">Skills & Tools</span>
        </h2>

        <div
          className="mx-auto relative"
          style={{
            width: `${containerSize}px`,
            height: `${containerSize}px`,
            maxWidth: "95vw",
            maxHeight: "95vw"
          }}
        >
          {/* Draw rings + orbit items */}
          {orbits.map((orbit) => {
            const n = orbit.items.length;
            // center position style
            const orbitStyle: React.CSSProperties = {
              position: "absolute",
              top: "-5%",
              left: "0%",
              transform: "translate(-50%, -50%)",
              width: `${containerSize}px`,
              height: `${containerSize}px`,
              // animate the entire ring (rotate around center)
              animation: `spin ${orbit.duration}s linear infinite`,
              animationDirection: orbit.clockwise ? "normal" : "reverse",
              pointerEvents: "none" // let items handle pointer events
            };

            // ring visual (subtle)
            const ringDiameter = orbit.radius * 2 + bubbleSize * 0.5;
            const ringStyle: React.CSSProperties = {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${ringDiameter}px`,
              height: `${ringDiameter}px`,
              borderRadius: "50%",
              borderStyle: "solid",
              borderWidth: "1px",
              // slight faint border for each ring
              borderColor: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
              pointerEvents: "none",
              zIndex: 10
            };

            return (
              <div key={orbit.key} style={orbitStyle}>
                {/* Ring visual */}
                <div style={ringStyle} />

                {/* Items (each positioned by static transform relative to center) */}
                {orbit.items.map((skill, i) => {
                  const angle = (i / n) * 360; // degrees
                  const px = orbit.radius;

                  // parent item wrapper (keeps it centered)
                  const itemWrapStyle: React.CSSProperties = {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%)`,
                    pointerEvents: "auto",
                    zIndex: 20
                  };

                  // this child is rotated to place on circle at angle, and translated by radius px
                  const posStyle: React.CSSProperties = {
                    transform: `rotate(${angle}deg) translateX(${px}px)`,
                    transformOrigin: "center center"
                  };

                  // this counter-rotates to make icon upright initially (will be combined with icon animation)
                  const counterStyle: React.CSSProperties = {
                    transform: `rotate(${-angle}deg)`,
                    transformOrigin: "center center"
                  };

                  // icon animation must rotate opposite direction to the parent orbit so that icon stays upright.
                  // If orbit animationDirection = "normal" (clockwise), child anim direction should be "reverse" and vice-versa.
                  const iconAnimDirection = orbit.clockwise ? "reverse" : "normal";
                  const iconStyle: React.CSSProperties = {
                    width: `${bubbleSize}px`,
                    height: `${bubbleSize}px`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isDarkMode ? "0 8px 28px rgba(2,6,23,0.6)" : "0 8px 28px rgba(2,6,23,0.08)",
                    transition: "transform 220ms ease",
                    animation: `spin ${orbit.duration}s linear infinite`,
                    animationDirection: iconAnimDirection,
                    background: isDarkMode ? "rgba(127,127,127,0.3)" : "#ffffff",
                    border: isDarkMode ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.06)"
                  };

                  return (
                    <div key={skill.name} style={itemWrapStyle}>
                      <div style={posStyle}>
                        <div style={counterStyle}>
                          <div
                            onMouseEnter={() => setHovered(skill.name)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative"
                            style={{ width: `${bubbleSize}px`, height: `${bubbleSize}px`, display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <div
                              style={iconStyle}
                              className="hover:scale-110"
                              role="img"
                              aria-label={skill.name}
                            >
                              <img src={skill.logo} alt={skill.name} className="w-8 h-8" draggable={false} />
                            </div>

                            {/* Tooltip */}
                            {hovered === skill.name && (
                              <div
                                className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap z-40`}
                                style={{
                                  background: isDarkMode ? "rgba(17,24,39,0.9)" : "white",
                                  color: isDarkMode ? "#60f0ea" : "#4b278f",
                                  border: isDarkMode ? "1px solid rgba(96,240,234,0.08)" : "1px solid rgba(75,39,143,0.06)",
                                  boxShadow: isDarkMode ? "0 8px 24px rgba(2,6,23,0.6)" : "0 8px 24px rgba(2,6,23,0.06)"
                                }}
                              >
                                {skill.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Center hub */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            style={{ zIndex: 50 }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 0,
                height: 0,
                background: "linear-gradient(135deg,#06b6d4,#7c3aed)",
                boxShadow: "0 18px 60px rgba(124,58,237,0.18)",
                border: "4px solid rgba(255,255,255,0.06)"
              }}
            >
              <div className="flex flex-col items-center justify-center select-none">
                {/* <div className="text-3xl top-1/2">💻</div> */}
                {/* <div className="text-white font-bold text-sm mt-1">My Skills</div> */}
              </div>
            </div>

            {/* <div className="mt-4 text-sm text-center max-w-xs">
              <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                Languages, tools and frameworks I use — orbiting the core.
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        /* Parent orbit rotation keyframes */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* responsive tweaks */
        @media (max-width: 640px) {
          /* scale down the center container a bit on small screens */
          section#skills div[style] {
            width: 92vw !important;
            height: 92vw !important;
          }
        }
      `}</style>
    </section>
  );
};








// Skills Component with Professional Orbital Animation
// const Skills = ({ isDarkMode }: { isDarkMode: boolean }) => {
//   const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

//   return (
//     <section id="skills" className="py-16 sm:py-20">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
//         <h2
//           className={`text-3xl sm:text-4xl font-bold mb-16 ${
//             isDarkMode ? "text-white" : "text-gray-900"
//           }`}
//         >
//           My <span className="text-cyan-400">Skills</span>
//         </h2>

//         <div className="relative flex items-center justify-center">
//           {/* Orbit container */}
//           <div className="relative w-[400px] h-[400px] animate-spin-slow rounded-full border border-white/10">
//             {skills.map((skill, index) => {
//               const angle = (index / skills.length) * 2 * Math.PI;
//               const radius = 160; // distance from center
//               const x = radius * Math.cos(angle);
//               const y = radius * Math.sin(angle);

//               return (
//                 <div
//                   key={skill.name}
//                   className="absolute transition-transform duration-300 hover:scale-125 cursor-pointer"
//                   style={{
//                     transform: `translate(${200 + x}px, ${200 + y}px)`,
//                   }}
//                   onMouseEnter={() => setHoveredSkill(skill.name)}
//                   onMouseLeave={() => setHoveredSkill(null)}
//                 >
//                   <div
//                     className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}
//                   >
//                     <span className="text-white text-xl">{skill.icon}</span>
//                   </div>
//                   {hoveredSkill === skill.name && (
//                     <div
//                       className={`absolute top-14 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap border ${
//                         isDarkMode
//                           ? "bg-gray-800 text-cyan-400 border-cyan-400/30"
//                           : "bg-white text-purple-600 border-purple-400/30 shadow-lg"
//                       }`}
//                     >
//                       {skill.name}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Center Label */}
//           <div className="absolute w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white/20">
//             <div className="text-2xl">💻</div>
//             <div className="text-white font-bold text-xs">Skills</div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .animate-spin-slow {
//           animation: spin 30s linear infinite;
//         }
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </section>
//   );
// };


// const skillsData = {
//   'Programming Languages': [
//     { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'hover:bg-blue-50' },
//     { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 'hover:bg-yellow-50' },
//     { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: 'hover:bg-red-50' },
//     { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: 'hover:bg-blue-50' }
//   ],
//   'Web Development': [
//     { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'hover:bg-cyan-50' },
//     { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 'hover:bg-green-50' },
//     { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: 'hover:bg-gray-50' },
//     { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 'hover:bg-green-50' },
//     { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'hover:bg-blue-50' },
//     { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: 'hover:bg-orange-50' },
//     { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: 'hover:bg-blue-50' },
//     { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', color: 'hover:bg-gray-50' }
//   ],
//   'Tools & Technologies': [
//     { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 'hover:bg-orange-50' },
//     { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: 'hover:bg-gray-50' },
//     { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: 'hover:bg-blue-50' },
//     { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: 'hover:bg-purple-50' },
//     { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: 'hover:bg-yellow-50' }
//   ]
// };

// Professional Skills Component
// const Skills = ({ isDarkMode }: { isDarkMode: boolean }) => {
//   return (
//     <section id="skills" className="py-16 sm:py-20">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//           My <span className="text-cyan-400">Skills</span>
//         </h2>
        
//         <div className="space-y-12">
//           {Object.entries(skillsData).map(([category, skills]) => (
//             <div key={category} className="space-y-6">
//               <h3 className={`text-xl sm:text-2xl font-semibold text-center ${
//                 isDarkMode ? 'text-gray-200' : 'text-gray-800'
//               }`}>
//                 {category}
//               </h3>
              
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
//                 {skills.map((skill) => (
//                   <div
//                     key={skill.name}
//                     className={`group relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
//                       isDarkMode 
//                         ? 'bg-gray-800 border-gray-700 hover:border-cyan-400 hover:bg-gray-700' 
//                         : `bg-white border-gray-200 hover:border-cyan-400 ${skill.color} shadow-sm`
//                     }`}
//                   >
//                     <div className="flex flex-col items-center space-y-3">
//                       <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
//                         <img 
//                           src={skill.logo} 
//                           alt={skill.name}
//                           className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                           onError={(e) => {
//                             // Fallback to text if image fails to load
//                             const target = e.target as HTMLImageElement;
//                             target.style.display = 'none';
//                             const parent = target.parentElement;
//                             if (parent) {
//                               parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">${skill.name.substring(0, 2)}</div>`;
//                             }
//                           }}
//                         />
//                       </div>
                      
//                       <span className={`text-sm sm:text-base font-medium text-center transition-colors duration-300 ${
//                         isDarkMode 
//                           ? 'text-gray-300 group-hover:text-cyan-400' 
//                           : 'text-gray-700 group-hover:text-cyan-600'
//                       }`}>
//                         {skill.name}
//                       </span>
//                     </div>
                    
//                     {/* Hover effect overlay */}
//                     <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Skills Summary */}
//         <div className={`mt-16 text-center p-6 sm:p-8 rounded-xl border ${
//           isDarkMode 
//             ? 'bg-gray-800/50 border-gray-700' 
//             : 'bg-gray-50 border-gray-200'
//         }`}>
//           <p className={`text-lg sm:text-xl font-medium mb-4 ${
//             isDarkMode ? 'text-gray-200' : 'text-gray-800'
//           }`}>
//             Passionate about creating scalable solutions
//           </p>
//           <p className={`text-base ${
//             isDarkMode ? 'text-gray-400' : 'text-gray-600'
//           }`}>
//             With expertise across the full stack, I build robust applications from concept to deployment, 
//             focusing on clean code, user experience, and modern development practices.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };


// Projects Component with Fixed Carousel
const Projects = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className={`py-16 sm:py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured <span className="text-cyan-400">Projects</span>
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4 sm:px-8">
                  <div className={`rounded-xl p-6 sm:p-8 border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-cyan-400' 
                      : 'bg-white border-gray-200 hover:border-cyan-400 shadow-lg'
                  }`}>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors duration-300 font-semibold"
                    >
                      <Github size={20} />
                      View on GitHub
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevProject}
            className="absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-gray-900 p-2 sm:p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg z-10 hover:bg-cyan-300"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextProject}
            className="absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-gray-900 p-2 sm:p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg z-10 hover:bg-cyan-300"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentProject ? 'bg-cyan-400' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Certificates Component
const Certificates = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="certificates" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Certifications & <span className="text-cyan-400">Achievements</span>
        </h2>
        
        <div 
          className={`relative overflow-hidden rounded-xl p-4 sm:p-6 border ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-gray-700/50' 
              : 'bg-gradient-to-r from-gray-50/30 to-gray-100/30 border-gray-200/50'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-4 sm:gap-6 ${isPaused ? '' : 'animate-marquee'}`}>
            {[...certificates, ...certificates].map((cert, index) => (
              <div key={index} className={`flex-shrink-0 w-72 sm:w-80 rounded-xl p-4 sm:p-6 border transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 hover:border-cyan-400' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-cyan-400'
              }`}>
                <div className={`w-full h-40 sm:h-48 rounded-lg mb-4 flex items-center justify-center overflow-hidden border-2 border-dashed transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border-cyan-400/30 hover:border-cyan-400/60' 
                    : 'bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border-cyan-400/40 hover:border-cyan-400/70'
                }`}>
                  <img 
                    src={cert.image} 
                    alt={cert.name} 
                    className="w-full h-full "
                  />
                </div>
                <h3 className={`text-base sm:text-lg font-semibold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {cert.name}
                </h3>
                <div className="flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          
          {isPaused && (
            <div className="absolute top-4 right-4 bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-400/30">
              Paused
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Hover over the certificates to pause the animation
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

// Contact Component
const Contact = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <section id="contact" className={`py-16 sm:py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Let's <span className="text-cyan-400">Connect</span>
        </h2>
        
        <p className={`text-lg sm:text-xl mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. 
          Feel free to reach out!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a 
            href="mailto:alwinphilip98@gmail.com"
            className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg text-sm sm:text-base"
          >
            <Mail size={20} className="sm:w-6 sm:h-6" />
            Email Me
          </a>
          
          <a 
            href="https://www.linkedin.com/in/alwin-philip-4a618b258/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 border-2 border-cyan-400 text-cyan-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 text-sm sm:text-base"
          >
            <Linkedin size={20} className="sm:w-6 sm:h-6" />
            LinkedIn
          </a>
          
          <a 
            href="https://github.com/Alwin-06"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 border-2 border-purple-500 text-purple-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 text-sm sm:text-base"
          >
            <Github size={20} className="sm:w-6 sm:h-6" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <footer className={`border-t ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center transform rotate-12">
                <span className="text-gray-900 font-black">A</span>
              </div>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Alwin</span>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Crafting digital experiences with passion and precision.
            </p>
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <button 
                  key={link}
                  onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className={`block transition-colors duration-300 hover:text-cyan-400 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/Alwin-06" className={`transition-colors duration-300 hover:text-cyan-400 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/alwin-philip-4a618b258/" className={`transition-colors duration-300 hover:text-cyan-400 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:alwinphilip98@gmail.com" className={`transition-colors duration-300 hover:text-cyan-400 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={`border-t mt-8 pt-8 text-center ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Designed & Built by Alwin © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Skills isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode} />
      <Certificates isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      <RobotMascot isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;