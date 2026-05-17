import { PROJECT_FILTERS, PROJECTS, type ProjectTag } from '../../data/projects';

type ProjectFilterProps = {
  filter: 'all' | ProjectTag;
  count: number;
  onChange: (filter: 'all' | ProjectTag) => void;
};

export default function ProjectFilter({ filter, count, onChange }: ProjectFilterProps) {
  return (
    <div className="proj-filter">
      <div className="proj-filter__inner">
        <span className="proj-filter__label">Filtern nach</span>
        <ul className="proj-filter__list">
          {PROJECT_FILTERS.map(({ key, label }) => (
            <li key={key}>
              <button
                type="button"
                className={`proj-filter__chip${filter === key ? ' is-active' : ''}`}
                onClick={() => onChange(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <span className="proj-filter__count">{count} / {PROJECTS.length}</span>
      </div>
    </div>
  );
}
