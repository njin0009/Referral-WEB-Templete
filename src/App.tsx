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
    navProfile: "个人资料",
    navBupa: "BUPA 职位",
    navMessage: "留言",
    langSwitch: "English",
    messageKicker: "留言",
    messageTitle: "给 Nora 留言",
    messageLead: "这个表单目前会提交到本地 Express 接口，后续可以接入数据库、Notion、Airtable 或邮件通知。",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    emailPlaceholder: "你的邮箱",
    messageLabel: "留言内容",
    namePlaceholder: "你的姓名",
    messagePlaceholder: "想聊什么？",
    sending: "发送中",
    send: "发送留言",
    saved: "已保存到本地接口。",
    error: "发送失败，请检查接口是否正在运行。",
  },
  en: {
    navProfile: "Profile",
    navBupa: "BUPA",
    navMessage: "Message",
    langSwitch: "中文",
    messageKicker: "Message",
    messageTitle: "Leave Nora a Message",
    messageLead: "This form currently posts to the local Express API. It can later connect to a database, Notion, Airtable, or email notifications.",
    nameLabel: "Name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    namePlaceholder: "Your name",
    messagePlaceholder: "What would you like to discuss?",
    sending: "Sending",
    send: "Send Message",
    saved: "Saved to the local API.",
    error: "Failed to send. Please check whether the API is running.",
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
        <strong>{profile.name}</strong>
        <div>
          <button onClick={() => scrollToId("profile")}>{t.navProfile}</button>
          <button onClick={() => scrollToId("jobs")}>{t.navBupa}</button>
          <button onClick={() => scrollToId("message")}>{t.navMessage}</button>
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
