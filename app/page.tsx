// npm install react-icons  (already installed)
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiNestjs,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiLinux,
} from "react-icons/si";
import { FaAws, FaNetworkWired, FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { MouseSpotlight } from "./components/MouseSpotlight";
import { GlowCard } from "./components/GlowCard";
import { TextDisperse } from "@/components/ui/text-disperse";
import { BorderRotate } from "@/components/ui/animated-gradient-border";

type SkillItem = {
  name: string;
  icon: IconType;
  color: string;
};

function SkillChip({ name, icon: Icon, color }: SkillItem) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 hover:border-slate-600/80 hover:bg-slate-900/80 transition-all duration-200 min-w-[4.5rem]">
      <Icon className="text-2xl shrink-0" style={{ color }} aria-hidden />
      <span className="text-[10px] sm:text-xs text-slate-400 text-center leading-tight font-medium">
        {name}
      </span>
    </div>
  );
}

function SkillCard({
  title,
  titleClassName,
  skills,
}: {
  title: string;
  titleClassName: string;
  skills: SkillItem[];
}) {
  return (
    <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
      <h3
        className={`${titleClassName} font-bold mb-4 text-xs tracking-wide uppercase text-center`}
      >
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-2.5">
        {skills.map((skill) => (
          <SkillChip key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
}

const frontendSkills: SkillItem[] = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
];

const backendSkills: SkillItem[] = [
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { name: "Prisma", icon: SiPrisma, color: "#A8B2D1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

const devopsSkills: SkillItem[] = [
  { name: "EC2", icon: FaAws, color: "#FF9900" },
  { name: "S3", icon: FaAws, color: "#FF9900" },
  { name: "RDS", icon: FaAws, color: "#FF9900" },
  { name: "Lambda", icon: FaAws, color: "#FF9900" },
  { name: "CloudWatch", icon: FaAws, color: "#FF9900" },
  { name: "Linux CLI", icon: SiLinux, color: "#FCC624" },
  { name: "Networking", icon: FaNetworkWired, color: "#94A3B8" },
];

export default function Home() {
  return (
    <MouseSpotlight>
    <main
      className="min-h-screen text-slate-100 font-sans"
      dir="rtl"
    >
      {/* 1. אזור עליון (Hero Section) */}
      <section className="pt-8 pb-16 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-black tracking-tight text-amber-50 md:text-6xl">
          היי, אני גאורגי
        </h1>

        <div className="profilefoto">
          <img className="myfoto" src="/George.png" alt="profileimg" />
        </div>

        <p className="mt-6 text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto">
          מפתח Full-Stack. אני מתמחה בבניית מערכות אינטרנט מתקדמות, אוטומציות
          ופתרונות תוכנה חכמים שיוצרים אימפקט.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#contact"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
          >
            צרו קשר
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-slate-700 border border-slate-200 px-6 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition"
          >
            הורדת קורות חיים
          </a>
        </div>
      </section>

      {/* קו מפריד עדין */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-slate-800" />
      </div>

      {/* עטיפה ראשית לכל ה-About כדי שייראה כיחידה אחת */}
      <div className="max-w-4xl mx-auto mt-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
        <p className="text-xl text-amber-100 leading-relaxed font-medium text-center">
          אני איש IT ומומחה תשתיות ורסטילי, המבצע מעבר לעולמות ה-Full Stack Web
          Development.
        </p>

        <p className="mt-6 text-slate-300 text-base leading-relaxed text-center max-w-2xl mx-auto">
          עם שנים של ניסיון מעשי (Hands-on) בסביבות ענן (AWS), לינוקס וניהול
          מערכות, אני מביא איתי יתרון ייחודי לצוותי פיתוח:{" "}
          <span className="text-amber-400 font-semibold">
            אני לא רק כותב קוד; אני מבין לעומק כיצד הוא נפרס (Deploys), גדל
            (Scales) ורץ בצורה יעילה על שרתי פרודקשן.
          </span>
        </p>

        <p className="mt-4 text-slate-300 text-base leading-relaxed text-center max-w-2xl mx-auto">
          בתקופה האחרונה התרכזתי באינטנסיביות בפיתוח ווב מודרני, בניית פרויקטים
          מהעולם האמיתי ושליטה מלאה באקו-סיסטם של ה-Backend וה-Frontend.
        </p>

        {/* ארגז הכלים בתוך העטיפה */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkillCard
            title="Frontend"
            titleClassName="text-amber-400"
            skills={frontendSkills}
          />
          <SkillCard
            title="Backend & Databases"
            titleClassName="text-emerald-400"
            skills={backendSkills}
          />
          <SkillCard
            title="DevOps & Infrastructure"
            titleClassName="text-purple-400"
            skills={devopsSkills}
          />
        </div>
      </div>

      {/* 2. אזור הפרויקטים */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-200 mb-2">הפרויקטים שלי</h2>
        <p className="text-blue-100/70 mb-8">
          הנה חלק מהדברים שעבדתי עליהם לאחרונה:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* 1 כרטיס פרויקט - SocialCRM */}
          <BorderRotate
            animationMode="rotate-on-hover"
            animationSpeed={3.5}
            gradientColors={{
              primary: "#1e3a8a",
              secondary: "#3b82f6",
              accent: "#93c5fd",
            }}
            backgroundColor="#ffffff"
            borderWidth={2}
            borderRadius={16}
            className="h-full w-full min-w-0 transition duration-200 hover:scale-[1.02]"
          >
          <Link
            href="https://getsocialcrm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full min-w-0 h-full"
          >
            <div className="overflow-hidden h-full text-right">
              <img
                src="/socialcrm.png"
                alt="SocialCRM Screenshot"
                className="w-full h-36 object-cover object-top border-b border-slate-100"
              />
              <div className="p-4 md:p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Web App
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">
                  SocialCRM
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  מערכת חכמה לניהול לידים, אוטומציה עסקית וחיבור פלטפורמות
                  חברתיות בצורה חלקה.
                </p>
              </div>
            </div>
          </Link>
          </BorderRotate>

          <BorderRotate
            animationMode="rotate-on-hover"
            animationSpeed={3.5}
            gradientColors={{
              primary: "#065f46",
              secondary: "#10b981",
              accent: "#6ee7b7",
            }}
            backgroundColor="#ffffff"
            borderWidth={2}
            borderRadius={16}
            className="h-full w-full min-w-0 transition duration-200 hover:scale-[1.02]"
          >
          <Link
            href="https://cars-geo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full min-w-0 h-full"
          >
            <div className="overflow-hidden h-full text-right">
              <img
                src="/carspro.png"
                alt="Vehicle Inventory CRM"
                className="w-full h-36 object-cover object-top border-b border-slate-100"
              />
              <div className="p-4 md:p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  CARS APP
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">
                  פלטפורמה לחיפוש, לקניית מכוניות
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  המערכת כוללת מנגנון סינון וחיפוש חכם, ניהול מודעות דינמי וממשק
                  משתמש רספונסיבי ומותאם לנייד.
                </p>
              </div>
            </div>
          </Link>
          </BorderRotate>

          <BorderRotate
            animationMode="rotate-on-hover"
            animationSpeed={3.5}
            gradientColors={{
              primary: "#92400e",
              secondary: "#f59e0b",
              accent: "#fcd34d",
            }}
            backgroundColor="#ffffff"
            borderWidth={2}
            borderRadius={16}
            className="h-full w-full min-w-0 transition duration-200 hover:scale-[1.02]"
          >
          <Link
            href="https://shlomi-nagaria.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full min-w-0 h-full"
          >
            <div className="overflow-hidden h-full text-right">
              <img
                src="/wood.png"
                alt="Vehicle Inventory CRM"
                className="w-full h-36 object-cover object-top border-b border-slate-100"
              />
              <div className="p-4 md:p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Carpentry Shop
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">
                  חנות נגרייה
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  פלטפורמה דיגיטלית מודרנית להצגת פרויקטים ועיצובי עץ מותאמים
                  אישית
                </p>
              </div>
            </div>
          </Link>
          </BorderRotate>
        </div>
      </section>

      {/* 3. יצירת קשר */}
      <section
        id="contact"
        className="py-16 px-6 pb-24 max-w-3xl mx-auto text-center scroll-mt-8"
      >
        <div className="bg-slate-900/30 p-8 md:p-10 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-blue-200 mb-2">צרו קשר</h2>
          <p className="text-blue-100/70 mb-8">
            בואו נדבר — אשמח לשמוע מכם
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-4">
              <GlowCard className="min-w-[220px]" variant="dark">
              <a
                href="https://wa.me/972524186300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 min-w-[220px] cursor-pointer h-full"
              >
                <FaPhone className="text-xl text-blue-400 shrink-0" aria-hidden />
                <TextDisperse
                  compact
                  dir="ltr"
                  className="text-base font-medium text-slate-200"
                >
                  0524186300
                </TextDisperse>
              </a>
              </GlowCard>

              <GlowCard className="min-w-[220px]" variant="dark">
              <a
                href="mailto:giorgimachaidze51@gmail.com"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 min-w-[220px] cursor-pointer h-full"
              >
                <FaEnvelope className="text-xl text-blue-400 shrink-0" aria-hidden />
                <span className="text-slate-200 font-medium break-all">
                  giorgimachaidze51@gmail.com
                </span>
              </a>
              </GlowCard>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full max-w-lg mx-auto">
              <GlowCard className="flex-1 min-w-0" variant="dark">
              <a
                href="https://www.linkedin.com/in/george-machaidze-63b069146"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-[#0A66C2]/50 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer h-full w-full"
              >
                <FaLinkedin className="text-2xl text-[#0A66C2] shrink-0" aria-hidden />
                <span className="text-slate-200 font-medium">LinkedIn</span>
              </a>
              </GlowCard>

              <GlowCard className="flex-1 min-w-0" variant="dark">
              <a
                href="https://github.com/George1982-coder"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-500/50 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer h-full w-full"
              >
                <FaGithub className="text-2xl text-white shrink-0" aria-hidden />
                <span className="text-slate-200 font-medium">GitHub</span>
              </a>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>
    </main>
    </MouseSpotlight>
  );
}
