import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function defaults(size: number, props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  };
}

/* ─── Login page ─── */

/** User — поле "Логин" */
export function UserIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/** Envelope — поле "Почта" */
export function MailIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

/** Lock — поле "Пароль" */
export function LockIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/** Eye open — показать пароль */
export function EyeIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Eye off — скрыть пароль */
export function EyeOffIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/** X / close — кнопка очистки поля */
export function CloseIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)} strokeWidth={2}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ─── Header (Products page) ─── */

/** Search / magnifying glass */
export function SearchIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)} strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/** Crosshair / target — иконка ⊕ в хедере */
export function CrosshairIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  );
}

/** User / avatar with notification badge — пользователь с синим бейджем */
export function UserBadgeIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* blue notification badge */}
      <circle cx="18" cy="5" r="4" fill="#3B3FE4" stroke="white" strokeWidth={1.5} />
    </svg>
  );
}

/** Envelope — иконка почты в хедере */
export function MailHeaderIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

/** Dashboard / grid — 4 квадрата {⊞} */
export function DashboardIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)} strokeWidth={1.5}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

/* ─── Toolbar ─── */

/** Refresh — обновить таблицу (из Figma) */
export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M15.9873 15.0162C16.1156 15.145 16.1876 15.3195 16.1876 15.5013C16.1876 15.6831 16.1156 15.8576 15.9873 15.9864C15.8936 16.0784 13.6798 18.25 10 18.25C6.78684 18.25 4.45453 16.325 3.125 14.8254V16.875C3.125 17.0573 3.05263 17.2322 2.92365 17.3611C2.79468 17.4901 2.61984 17.5625 2.4375 17.5625C2.25516 17.5625 2.08032 17.4901 1.95135 17.3611C1.82238 17.2322 1.75 17.0573 1.75 16.875V12.75C1.75 12.5677 1.82238 12.3928 1.95135 12.2639C2.08032 12.1349 2.25516 12.0625 2.4375 12.0625H6.5625C6.74484 12.0625 6.91968 12.1349 7.04865 12.2639C7.17762 12.3928 7.25 12.5677 7.25 12.75C7.25 12.9323 7.17762 13.1072 7.04865 13.2361C6.91968 13.3651 6.74484 13.4375 6.5625 13.4375H3.76441C4.82312 14.7566 6.99219 16.875 10 16.875C13.0938 16.875 14.9964 15.0308 15.0153 15.0119C15.1448 14.8836 15.3199 14.812 15.5022 14.8128C15.6844 14.8136 15.8589 14.8868 15.9873 15.0162ZM17.5625 2.4375C17.3802 2.4375 17.2053 2.50988 17.0764 2.63885C16.9474 2.76782 16.875 2.94266 16.875 3.125V5.17461C15.5455 3.675 13.2132 1.75 10 1.75C6.32016 1.75 4.10641 3.92156 4.01359 4.01359C3.88441 4.14238 3.81163 4.31721 3.81128 4.49963C3.81094 4.68206 3.88306 4.85717 4.01187 4.98637C4.14068 5.11557 4.3155 5.18836 4.49793 5.1887C4.68035 5.18905 4.85546 5.11694 4.98469 4.98813C5.00359 4.96922 6.90625 3.125 10 3.125C13.0078 3.125 15.1769 5.24344 16.2356 6.5625H13.4375C13.2552 6.5625 13.0803 6.63488 12.9514 6.76385C12.8224 6.89282 12.75 7.06766 12.75 7.25C12.75 7.43234 12.8224 7.60718 12.9514 7.73615C13.0803 7.86513 13.2552 7.9375 13.4375 7.9375H17.5625C17.7448 7.9375 17.9197 7.86513 18.0486 7.73615C18.1776 7.60718 18.25 7.43234 18.25 7.25V3.125C18.25 2.94266 18.1776 2.76782 18.0486 2.63885C17.9197 2.50988 17.7448 2.4375 17.5625 2.4375Z" fill="#515161" />
    </svg>
  );
}

/** Circle plus — иконка ⊕ в кнопке "Добавить" (из Figma) */
export function CirclePlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <circle cx="9" cy="9" r="8.25" stroke="white" strokeWidth="1.5" />
      <path d="M9 5.5V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.5 9H12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Table actions ─── */

/** Plus pill — кнопка (+) 52x27, rx=13.5, fill #242EDB */
export function PlusPillIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="52" height="27" viewBox="0 0 52 27" fill="none" {...props}>
      <rect width="52" height="27" rx="13.5" fill="#242EDB" />
      <path d="M26 6.5V20.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 13.5H33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Dots circle — кнопка (...) 32x32, три точки, fill #B2B3B9 */
export function DotsCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9964 12.5533 27.6256 9.24882 25.1884 6.81163C22.7512 4.37445 19.4467 3.00364 16 3ZM16 27C13.8244 27 11.6977 26.3549 9.88873 25.1462C8.07979 23.9375 6.66989 22.2195 5.83733 20.2095C5.00477 18.1995 4.78693 15.9878 5.21137 13.854C5.63581 11.7202 6.68345 9.7602 8.22183 8.22183C9.76021 6.68345 11.7202 5.6358 13.854 5.21136C15.9878 4.78692 18.1995 5.00476 20.2095 5.83733C22.2195 6.66989 23.9375 8.07979 25.1462 9.88873C26.3549 11.6977 27 13.8244 27 16C26.9967 18.9164 25.8367 21.7123 23.7745 23.7745C21.7123 25.8367 18.9164 26.9967 16 27ZM17.5 16C17.5 16.2967 17.412 16.5867 17.2472 16.8334C17.0824 17.08 16.8481 17.2723 16.574 17.3858C16.2999 17.4993 15.9983 17.5291 15.7074 17.4712C15.4164 17.4133 15.1491 17.2704 14.9393 17.0607C14.7296 16.8509 14.5867 16.5836 14.5288 16.2926C14.471 16.0017 14.5007 15.7001 14.6142 15.426C14.7277 15.1519 14.92 14.9176 15.1667 14.7528C15.4133 14.588 15.7033 14.5 16 14.5C16.3978 14.5 16.7794 14.658 17.0607 14.9393C17.342 15.2206 17.5 15.6022 17.5 16ZM23 16C23 16.2967 22.912 16.5867 22.7472 16.8334C22.5824 17.08 22.3481 17.2723 22.074 17.3858C21.7999 17.4993 21.4983 17.5291 21.2074 17.4712C20.9164 17.4133 20.6491 17.2704 20.4393 17.0607C20.2296 16.8509 20.0867 16.5836 20.0288 16.2926C19.9709 16.0017 20.0007 15.7001 20.1142 15.426C20.2277 15.1519 20.42 14.9176 20.6667 14.7528C20.9133 14.588 21.2033 14.5 21.5 14.5C21.8978 14.5 22.2794 14.658 22.5607 14.9393C22.842 15.2206 23 15.6022 23 16ZM12 16C12 16.2967 11.912 16.5867 11.7472 16.8334C11.5824 17.08 11.3481 17.2723 11.074 17.3858C10.7999 17.4993 10.4983 17.5291 10.2074 17.4712C9.9164 17.4133 9.64912 17.2704 9.43935 17.0607C9.22957 16.8509 9.08671 16.5836 9.02883 16.2926C8.97095 16.0017 9.00065 15.7001 9.11419 15.426C9.22772 15.1519 9.41998 14.9176 9.66665 14.7528C9.91332 14.588 10.2033 14.5 10.5 14.5C10.8978 14.5 11.2794 14.658 11.5607 14.9393C11.842 15.2206 12 15.6022 12 16Z" fill="#B2B3B9" />
    </svg>
  );
}

/** Bar chart — иконка stock (вертикальные полоски) */
export function BarChartIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor" {...props}>
      <rect x="1" y="10" width="3" height="7" rx="0.5" opacity="0.3" />
      <rect x="5.5" y="6" width="3" height="11" rx="0.5" opacity="0.5" />
      <rect x="10" y="3" width="3" height="14" rx="0.5" opacity="0.7" />
      <rect x="14.5" y="1" width="3" height="16" rx="0.5" opacity="1" />
    </svg>
  );
}

/* ─── Pagination ─── */

/** Chevron left — предыдущая страница */
export function ChevronLeftIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)} strokeWidth={2}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

/** Chevron right — следующая страница */
export function ChevronRightIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)} strokeWidth={2}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/** Modal close (X) */
export function ModalCloseIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)} strokeWidth={2}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** Logout — стрелка из двери */
export function LogoutIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...defaults(size, props)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
