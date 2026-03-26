import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

export function ProgressBar({ value, max = 100, className }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`${styles.track} ${className ?? ''}`}>
      <div
        className={styles.fill}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
