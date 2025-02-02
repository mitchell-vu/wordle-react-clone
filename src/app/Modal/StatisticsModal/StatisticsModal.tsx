import { Button, Modal } from '@/components';
import { useApp } from '@/hooks';
import { cn } from '@/utils/classnames';
import { ShareNetwork } from '@phosphor-icons/react';
import * as React from 'react';

const StatisticsModal: React.FC = () => {
  const { statisticsModalOpen, toggleStatisticsModal, statistic } = useApp();
  const { currentStreak, gamesPlayed, guesses, maxStreak, winPercentage } = statistic;

  const gameStats = React.useMemo(() => {
    const maxGuess = Math.max(...Object.values(guesses));
    return Object.entries(guesses)
      .filter(([key]) => key !== 'fail')
      .map(([guess, count]) => ({ guess, count, width: (count / maxGuess) * 100 }));
  }, [guesses]);

  const handleShareClick = React.useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
  }, []);

  return (
    <Modal
      isOpen={statisticsModalOpen}
      onClose={toggleStatisticsModal}
      title="Statistics"
      className="flex h-4/6 flex-col items-center sm:h-auto"
    >
      <div className="w-[320px] self-center">
        <section className="grid grid-cols-4 text-center">
          <div className="flex flex-col">
            <div className="text-4xl font-medium">{gamesPlayed}</div>
            <div className="text-xs">Played</div>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-medium">{winPercentage}</div>
            <div className="text-xs">Win %</div>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-medium">{currentStreak}</div>
            <div className="text-xs">Current Streak</div>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-medium">{maxStreak}</div>
            <div className="text-xs">Max Streak</div>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-karnak-condensed mb-3 text-center text-2xl">Guess Distribution</h3>
          <div className="mx-auto flex flex-col gap-1 text-xs font-bold">
            {gameStats.map(({ guess, count, width }) => (
              <div key={guess} className="flex h-5 w-full flex-row items-center gap-1">
                <div className="w-2 shrink-0 text-right">{guess}</div>
                <div
                  className={cn('flex h-full items-center bg-neutral-500 text-white dark:bg-neutral-700', {
                    'justify-end pr-2': width > 0,
                    'justify-center': width <= 0,
                  })}
                  style={{ width: `${width > 0 ? width : 7}%` }}
                >
                  <span>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Button className="mt-6" onClick={handleShareClick} endIcon={<ShareNetwork size="1.25rem" />}>
        Share
      </Button>
    </Modal>
  );
};

export default StatisticsModal;
