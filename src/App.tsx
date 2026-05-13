import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { getJobs, getProfile, submitMessage } from "@/api";
import type { Job, Profile } from "@/data/site-data";
import { Button } from "@/components/ui/button";
import {
  jobs as fallbackJobs,
  managementTimeline,
  profile as fallbackProfile,
  technicalTimeline,
} from "@/data/site-data";
import ReferralRoles from "@/components/ui/team";
import ProfileCapabilityGallery from "@/components/profile-capability-gallery";

export type Language = "zh" | "en";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const copy = {
  zh: {
    siteTitle: "Nora Jin｜Bupa 内推作品集",
    navProfile: "个人资料",
    navBupa: "Bupa 职位",
    navMessage: "留言",
    langSwitch: "English",
    messageKicker: "留言",
    messageTitle: "给 Nora 留言",
    messageLead: "如果你愿意为 Nora 提供内推、面试建议或职位线索，可以在这里留下联系方式和简短说明。Nora 会认真查看并尽快回复。",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    emailPlaceholder: "你的邮箱",
    messageLabel: "留言内容",
    namePlaceholder: "你的姓名",
    messagePlaceholder: "想聊什么？",
    sending: "发送中",
    send: "发送留言",
    saved: "谢谢，Nora 已收到你的留言。",
    error: "暂时没有发送成功，请稍后再试，或直接通过页面上的邮箱联系 Nora。",
  },
  en: {
    siteTitle: "Nora Jin · Bupa Referral Portfolio",
    navProfile: "Profile",
    navBupa: "Bupa Positions",
    navMessage: "Message",
    langSwitch: "中文",
    messageKicker: "Message",
    messageTitle: "Leave Nora a Message",
    messageLead: "If you can offer a referral, role lead, hiring advice, or a quick conversation, please leave a short note here. Nora will review it carefully and follow up.",
    nameLabel: "Name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    namePlaceholder: "Your name",
    messagePlaceholder: "What would you like to discuss?",
    sending: "Sending",
    send: "Send Message",
    saved: "Thank you. Nora has received your message.",
    error: "The message could not be sent right now. Please try again later or contact Nora directly by email.",
  },
} satisfies Record<Language, Record<string, string>>;

function MessageSection({ language }: { language: Language }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const t = copy[language];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    const form = new FormData(event.currentTarget);

    try {
      await submitMessage({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        message: String(form.get("message") ?? ""),
      });
      event.currentTarget.reset();
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section message-section" id="message">
      <div>
        <div className="section-kicker">{t.messageKicker}</div>
        <h2>{t.messageTitle}</h2>
        <p className="section-lead">{t.messageLead}</p>
      </div>
      <form className="message-form" onSubmit={onSubmit}>
        <label>
          {t.nameLabel}
          <input name="name" placeholder={t.namePlaceholder} required />
        </label>
        <label>
          {t.emailLabel}
          <input name="email" placeholder={t.emailPlaceholder} required type="email" />
        </label>
        <label>
          {t.messageLabel}
          <textarea name="message" placeholder={t.messagePlaceholder} required rows={5} />
        </label>
        <Button className="rounded-full bg-black text-white hover:bg-zinc-800" disabled={status === "saving"} type="submit">
          <Mail className="mr-2 h-4 w-4" />
          {status === "saving" ? t.sending : t.send}
        </Button>
        {status === "saved" && <p className="form-note">{t.saved}</p>}
        {status === "error" && <p className="form-note error">{t.error}</p>}
      </form>
    </section>
  );
}

export default function App() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [jobs, setJobs] = useState<Job[]>(fallbackJobs);
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => setProfile(fallbackProfile));
    void getJobs().then(setJobs).catch(() => setJobs(fallbackJobs));
  }, []);

  return (
    <main>
      <nav>
        <strong className="site-brand">{t.siteTitle}</strong>
        <div className="nav-links">
          <button onClick={() => scrollToId("profile")}>{t.navProfile}</button>
          <button onClick={() => scrollToId("jobs")}>{t.navBupa}</button>
          <button onClick={() => scrollToId("message")}>{t.navMessage}</button>
        </div>
        <div className="nav-actions">
          <button className="language-toggle" onClick={() => setLanguage((current) => (current === "en" ? "zh" : "en"))}>
            {t.langSwitch}
          </button>
        </div>
      </nav>
      <ReferralRoles jobs={jobs} language={language} profile={profile} />
      <ProfileCapabilityGallery
        language={language}
        management={managementTimeline}
        profile={profile}
        technical={technicalTimeline}
      />
      <MessageSection language={language} />
    </main>
  );
}
