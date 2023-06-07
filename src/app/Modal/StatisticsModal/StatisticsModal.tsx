import * as React from 'react';
import { BaseModal } from '../../../components';
import { useApp } from '../../../provider/AppProvider';

const StatisticsModal: React.FC = () => {
  const { statisticsModalOpen, toggleStatisticsModal } = useApp();

  return (
    <BaseModal
      isOpen={statisticsModalOpen}
      onClose={toggleStatisticsModal}
      title="Statistics"
      className="flex flex-col"
    >
      <div className="w-[320px] self-center">
        <section className="mb-4 grid grid-cols-4 text-center">
          <div className="flex flex-col">
            <div className="text-4xl font-medium">2</div>
            <div className="text-xs">Played</div>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-medium">100</div>
            <div className="text-xs">Win %</div>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-medium">1</div>
            <div className="text-xs">Current Streak</div>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-medium">2</div>
            <div className="text-xs">Max Streak</div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-center font-karnak-condensed text-xl">Guess Distribution</h3>
          <div className="mx-auto flex flex-col gap-1 text-xs font-bold">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="flex w-full flex-row items-center gap-1">
                <div className="w-2 shrink-0 text-right">{num}</div>
                <div className="grow text-white">
                  <div className="bg-neutral-500 px-2 py-0.5">0</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </BaseModal>
  );
};

export default StatisticsModal;
