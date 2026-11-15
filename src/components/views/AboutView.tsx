import { PortfolioImage } from "../content/PortfolioImage";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useContent } from "../content/ContentContext";

export function AboutView() {
  const { profile: PROFILE } = useContent();
  return (
    <div className="page about-page">
      <header className="page-header">
        <h1>About &amp; Profile</h1>
      </header>
      <div className="profile-header">
        <PortfolioImage size={192} src={PROFILE.portraitUrl} alt={PROFILE.name} />
        <div>
          <h2>{PROFILE.name}</h2>
          <p className="accent">{PROFILE.headline}</p>
          <p className="secondary">{PROFILE.location}</p>
        </div>
      </div>
      <section>
        <h2>{PROFILE.bioHeadline}</h2>
        <p className="body-copy">{PROFILE.bio}</p>
      </section>
      {PROFILE.tags.length > 0 && (
        <p className="profile-tags secondary">{PROFILE.tags.join(" · ")}</p>
      )}
      <section>
        <h2>My Creative DNA (Five Disciplines)</h2>
        <div className="notes-grid">
          {PROFILE.disciplines.map((discipline, index) => (
            <div key={index} className="note">
              <h3>{discipline.title}</h3>
              <p className="body-copy">{discipline.description}</p>
            </div>
          ))}
        </div>
      </section>
      {PROFILE.awards.length > 0 && (
        <section>
          <h2>Awards &amp; Recognition</h2>
          <div className="recognition-list">
            {PROFILE.awards.map((award, index) => (
              <article key={index}>
                <h3>{award.title}</h3>
                <p className="secondary">{award.issuer}</p>
                <p className="body-copy">{award.desc}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section>
        <h2>Find Me</h2>
        <div className="contact-list">
          <a href={`mailto:${PROFILE.email}`}>
            <Mail size={20} />
            <span>{PROFILE.email}</span>
            <ArrowUpRight size={18} />
          </a>
          <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`}>
            <Phone size={20} />
            <span>{PROFILE.phone}</span>
            <ArrowUpRight size={18} />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>
            <ArrowUpRight size={18} />
          </a>
          {PROFILE.links?.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"><span>{link.label}</span><ArrowUpRight size={18} /></a>)}
        </div>
      </section>
    </div>
  );
}
