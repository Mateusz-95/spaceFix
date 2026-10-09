import React from 'react';
import StepHeader from './StepHeader';
import NotFoundCta from './NotFoundCta';
import { SeriesCard } from './cards';
import { getSelectableCategories, type RepairType } from './configurator-data';
import type { Brand, Category } from './types';

interface Props {
  brand: Brand;
  repair?: RepairType;
  title?: string;
  onSelect: (category: Category) => void;
  onBack: () => void;
}

const StepChooseSeries: React.FC<Props> = ({ brand, repair, title = 'Wybierz serię', onSelect, onBack }) => {
  const categories = getSelectableCategories(brand, repair);

  return (
    <div>
      <StepHeader title={title} onBack={onBack} />

      <div className="mx-auto grid w-full max-w-[1208px] grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6">
        {categories.map((category: any) => (
          <SeriesCard
            key={category.slug}
            name={category.name}
            brandName={brand.name}
            onClick={() => onSelect(category)}
          />
        ))}
      </div>

      <NotFoundCta question="Nieznalazłeś swojej serii?" />
    </div>
  );
};

export default StepChooseSeries;
