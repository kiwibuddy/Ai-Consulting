import { Link } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import { PageSEO } from "@/components/page-seo";
import { SectionLabel } from "@/components/public-cinematic/section-label";
import {
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
} from "@/lib/animations";

const aboutContent = [
  `I'm Nathaniel Baldock — a husband, father of three, and someone who's spent over 20 years in global missions trying to answer a persistent question: how do we help people live out what they believe in every area of life? That journey has taken me through 35+ countries with Youth With A Mission — directing training schools, leading teams in Papua New Guinea, developing a biblical worldview program for 400+ emerging leaders in Hawaii, and building Bible engagement tools like the SourceView Bible app and SourceView Together. I've always been an early adopter of new technology, eventually teaching myself to build apps and discovering that the intersection of faith and innovation is where I come most alive.`,
  `When it comes to AI, I'm not speaking from theory. I use these tools daily and have built real products with them — a full iOS and Android Bible app, a budgeting web application, a coaching portal, and e-commerce stores on Etsy. I work hands-on across image generation, voice and audio, coding, design, research, writing, and teaching resources. I've tested dozens of tools across these disciplines, so when I sit down with a church leader or school principal, I'm not guessing — I can show them what's possible and help them get there.`,
  `After 23 years in international missions and working with NGOs, I'm now building a consulting practice to help churches, schools, and mission-minded organisations navigate AI and the bigger questions it raises about identity, purpose, and discipleship in a changing world. Through consulting and teaching, I bring together biblical worldview, cross-cultural leadership, youth discipleship, and hands-on technology — to equip leaders, parents, and teams with practical tools and a deeper framework to use them well. Whether it's a keynote, a workshop, a course, or a strategy session, my goal is the same: help you lead with clarity so you can focus on the work you were called to do.`,
];

export default function AboutPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="About Nathaniel Baldock — AI Consultant for Faith-Based Organisations"
        description="23 years in global missions and NGO work with YWAM, now building an AI consulting practice for churches, schools, and nonprofits. Based in Tauranga, New Zealand."
        canonicalPath="/about"
      />

      <main className="pt-28 pb-20 nb-section scroll-mt-24">
        <div className="nb-container px-0 max-w-[1240px]">
          <SectionLabel num="01">About Me</SectionLabel>
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h1
              className="nb-display nb-display-lg font-normal m-0 mb-3"
              variants={staggerRevealItemVariants}
            >
              About Me
            </motion.h1>
            <motion.p className="nb-body-lg m-0 max-w-2xl" variants={staggerRevealItemVariants}>
              Building an AI consulting practice in Tauranga, New Zealand — strategy, training, and
              advisory for faith, education, and mission-driven organisations.
            </motion.p>
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
                className="w-full rounded-md border border-[var(--nb-rule)] object-cover aspect-[3/4]"
              />
            </motion.div>
            <motion.div className="md:col-span-3 space-y-6" variants={staggerRevealContainerVariants}>
              {aboutContent.map((paragraph, i) => (
                <motion.p key={i} className="nb-body text-[17px] m-0" variants={staggerRevealItemVariants}>
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          <p className="mt-12">
            <Link href="/" className="nb-btn-secondary">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
