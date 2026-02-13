import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import {
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
} from "@/lib/animations";

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";

const aboutContent = [
  `I'm Nathaniel Baldock — a husband, father of three, and someone who's spent over 20 years in global missions trying to answer a persistent question: how do we help people live out what they believe in every area of life? That journey has taken me through 35+ countries with Youth With A Mission — directing training schools, leading teams in Papua New Guinea, developing a biblical worldview program for 400+ emerging leaders in Hawaii, and building Bible engagement tools like the SourceView Bible app and SourceView Together. I've always been an early adopter of new technology, eventually teaching myself to build apps and discovering that the intersection of faith and innovation is where I come most alive.`,
  `When it comes to AI, I'm not speaking from theory. I use these tools daily and have built real products with them — a full iOS and Android Bible app, a budgeting web application, a coaching portal, and e-commerce stores on Etsy. I work hands-on across image generation, voice and audio, coding, design, research, writing, and teaching resources. I've tested dozens of tools across these disciplines, so when I sit down with a church leader or school principal, I'm not guessing — I can show them what's possible and help them get there.`,
  `Now I help churches, schools, and mission-minded organisations navigate AI and the bigger questions it raises about identity, purpose, and discipleship in a changing world. Through consulting and teaching, I bring together everything these past two decades have built — biblical worldview, cross-cultural leadership, youth discipleship, and hands-on technology — to equip leaders, parents, and teams with practical tools and the deeper framework to use them well. Whether it's a keynote, a workshop, a course, or a strategy session, my goal is the same: help you lead with clarity so you can focus on the work you were called to do.`,
];

export default function AboutPage() {
  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 overflow-x-hidden text-neutral-900 font-sans">
      <SiteHeader currentPage="about" />

      <main className={`pt-28 pb-20 ${sectionPadding}`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
              variants={staggerRevealItemVariants}
            >
              About Me
            </motion.h1>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-5 gap-10 md:gap-14"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.div className="md:col-span-2" variants={staggerRevealItemVariants}>
              <img
                src="/about-me.jpeg"
                alt="Nathaniel Baldock with family"
                className="w-full rounded-2xl shadow-lg object-cover aspect-[3/4]"
              />
            </motion.div>
            <motion.div className="md:col-span-3 space-y-6" variants={staggerRevealContainerVariants}>
              {aboutContent.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-neutral-700 leading-relaxed text-lg"
                  variants={staggerRevealItemVariants}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          <p className="mt-12">
            <Link href="/" className="text-[hsl(142,76%,42%)] hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
