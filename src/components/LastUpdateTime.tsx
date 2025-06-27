// components/LastUpdateTime.tsx
import { useGlobalStore } from '@/stores/useGlobalStore';

export default function LastUpdateTime() {
  const lastUpdate = useGlobalStore((state) => state.lastUpdateTime);

  return (
    <div className="md:text-right text-sm text-muted-foreground">
      <div>Last Update Time</div>
      <div>
        {lastUpdate
          ? lastUpdate.toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          : '-'}
      </div>
    </div>
  );
}