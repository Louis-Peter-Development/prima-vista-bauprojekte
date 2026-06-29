import { useTranslation } from 'react-i18next';
import { PROJECT_FILTERS, PROJECTS, type ProjectTag } from '../../data/projects';

type ProjectFilterProps = {
  filter: 'all' | ProjectTag;
  count: number;
  onChange: (filter: 'all' | ProjectTag) => void;
};

export default function ProjectFilter({ filter, count, onChange }: ProjectFilterProps) {
  const { t } = useTranslation('projects');
  return (
    <div className="proj-filter">
      <div className="proj-filter__inner">
        <span className="proj-filter__label">{t('filter.label')}</span>
        <ul className="proj-filter__list">
          {PROJECT_FILTERS.map(({ key }) => (
            <li key={key}>
              <button
                type="button"
                className={`proj-filter__chip${filter === key ? ' is-active' : ''}`}
                onClick={() => onChange(key)}
              >
                {t(`filter.${key}`)}
              </button>
            </li>
          ))}
        </ul>
        <span className="proj-filter__count">{count} / {PROJECTS.length}</span>
      </div>
    </div>
  );
}
