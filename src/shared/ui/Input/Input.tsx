import { forwardRef, type InputHTMLAttributes, type ReactNode, useState } from 'react';
import { EyeIcon, EyeOffIcon, CloseIcon } from '@/shared/ui/Icons/index.ts';
import { t } from '@/shared/lib/i18n/index.ts';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, iconLeft, iconRight, clearable, onClear, className, type, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const hasValue = typeof value === 'string' ? value.length > 0 : Boolean(value);

    return (
      <div className={`${styles.wrapper} ${className ?? ''}`}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={`${styles.inputContainer} ${error ? styles.hasError : ''}`}>
          {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
          <input
            ref={ref}
            type={inputType}
            className={styles.input}
            value={value}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className={styles.iconRight}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? t.common.hidePassword : t.common.showPassword}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
          {clearable && hasValue && !isPassword && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={onClear}
              tabIndex={-1}
              aria-label={t.common.clear}
            >
              <CloseIcon />
            </button>
          )}
          {iconRight && !isPassword && !clearable && (
            <span className={styles.iconRight}>{iconRight}</span>
          )}
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
