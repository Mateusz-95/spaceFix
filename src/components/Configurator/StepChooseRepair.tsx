import React from 'react';
import StepHeader from './StepHeader';
import NotFoundCta from './NotFoundCta';
import ModelSearchBox from '../FindModel/ModelSearchBox';
import { RepairCard } from './cards';
import {
  modelSupportsRepair,
  priceListRepairTypes,
  type ModelHit,
  type RepairType,
} from './configurator-data';
import type { Phone } from './types';

interface Props {
  model?: Phone;
  onSelect: (repair: RepairType) => void;
  onPickModel?: (hit: ModelHit) => void;
  onBack?: () => void;
}

const StepChooseRepair: React.FC<Props> = ({ model, onSelect, onPickModel, onBack }) => {
  const repairs = model
    ? priceListRepairTypes.filter((repair) => modelSupportsRepair(model, repair))
    : priceListRepairTypes;

  return (
  <div>
    <StepHeader title="Wybierz naprawę" badge={model?.name} onBack={onBack} />

    {!model && onPickModel && (
      <div className="mx-auto mb-10 max-w-xl">
        <ModelSearchBox onSelect={onPickModel} />
        <p className="mb-2 mt-10 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#64748b]">
          albo wybierz naprawę
        </p>
      </div>
    )}

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {repairs.map((repair) => (
        <RepairCard key={repair.id} repair={repair} onClick={() => onSelect(repair)} />
      ))}
    </div>

    <NotFoundCta question="Nieznalazłeś swojego problemu?" />
  </div>
  );
};

export default StepChooseRepair;
