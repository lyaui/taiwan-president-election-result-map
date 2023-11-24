import Image from 'next/image';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { numberWithCommas, transCommaStringToNumber } from '@/utils/index';
import { type Candidate, type Statics } from '@/types/index';
import PercentageBar from '@/components/UI/PercentageBar';

interface CandidateInfoProps extends Candidate {
  vote_cnt: number;
  winner: boolean;
}

function CandidateInfo({
  cand_id,
  cand_name,
  cand_img,
  party_id,
  party_name,
  vote_cnt,
  winner,
}: CandidateInfoProps) {
  return (
    <div key={cand_id} className='flex gap-3'>
      <div
        className={`relative w-[48px] h-[48px] ${party_id} rounded-2xl overflow-hidden`}
      >
        <Image
          src={`/assets/images/candidate_${cand_img}.png`}
          alt={cand_name}
          fill
          style={{ objectFit: 'cover', transform: 'scale(1.2)', top: 8 }}
          draggable={false}
        />
      </div>
      <div className='flex flex-col gap-[2px]'>
        <p className='text-text-secondary caption'>{party_name}</p>
        <p className='flex gap-1'>
          {cand_name}
          {winner && <CheckCircleIcon className='w-[20px] text-primary' />}
        </p>
        <p>
          <span className='heading-6 mr-0.5'>{numberWithCommas(vote_cnt)}</span>
          票
        </p>
      </div>
    </div>
  );
}

function CandVoteShare({
  candidates = [],
  statistics,
}: {
  candidates: Candidate[];
  statistics: Statics;
}) {
  const orderedCandiData: (Candidate & { vote_cnt: number })[] = candidates
    .map((_cand) => {
      return {
        ..._cand,
        vote_cnt: transCommaStringToNumber(
          statistics?.candidates[_cand.cand_id],
        ),
      };
    })
    .sort((_a, _b) => _b.vote_cnt - _a.vote_cnt);

  const groups = orderedCandiData.map((_cand) => ({
    color: _cand.party_id,
    value: _cand.vote_cnt,
  }));

  return (
    <div className='flex flex-col gap-3 bg-white px-6 py-[30px] rounded-xl'>
      <div className='grid grid-cols-3 gap-10'>
        {orderedCandiData.map(
          (_cand: Candidate & { vote_cnt: number }, _index) => (
            <CandidateInfo
              key={_cand.cand_id}
              {..._cand}
              winner={_index === 0}
            />
          ),
        )}
      </div>
      <PercentageBar height={18} showValue={true} groups={groups} />
    </div>
  );
}

export default CandVoteShare;
