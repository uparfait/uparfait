import ArrowIcon from "../../shared/icons/ArrowIcon";

export default function ProjectItem({ icon, tag, title, url, link, note, visit }) {
  return (
    <li className="card project-item">
      <span className="icon-circle icon-lg">{icon}</span>
      <div className="project-body">
        <div className="project-head">
          <h3 className="project-title">{title}</h3>
          <span className="tag">{tag}</span>
        </div>
        <p className="project-note">{note}</p>
        <span className="project-url">{link}</span>
      </div>
      <a className="btn btn-accent" href={url} target="_blank" rel="noreferrer" aria-label={`${visit} ${title}`}>
        {visit}
        <span className="btn-icon"><ArrowIcon /></span>
      </a>
    </li>
  );
}
