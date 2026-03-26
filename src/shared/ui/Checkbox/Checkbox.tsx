import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={`${styles.wrapper} ${className ?? ''}`}>
        <input ref={ref} type="checkbox" className={styles.input} {...props} />
        <span className={styles.checkmark} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
