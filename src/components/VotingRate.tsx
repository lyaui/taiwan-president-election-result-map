import { numberWithCommas } from '@/utils/index';
import DonutChart from '@/components/UI/DonutChart';

function VotingRate() {
  const figures = [
    { label: '投票數', value: numberWithCommas(2448302) },
    { label: '投票率', value: 0.6627 * 100 + '%' },
    { label: '有效票數', value: numberWithCommas(12284970) },
    { label: '無效票', value: numberWithCommas(163332) },
  ];
  return (
    <div className='flex gap-10 bg-white px-6 py-[30px] rounded-xl'>
      <DonutChart size={125} label='投票率' value={0.6627} />
      <div className='grid grid-cols-2 gap-x-12 gap-y-4'>
        {figures.map((_figure) => (
          <div
            key={_figure.label}
            className='min-w-[140px] flex flex-col gap-0.5'
          >
            <p className='body-small text-text-secondary'>{_figure.label}</p>
            <p className='heading-6'>{_figure.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotingRate;