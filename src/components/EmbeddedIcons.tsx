import { IconBaseProps } from 'react-icons';

export const HourglassStripes: React.FC<IconBaseProps> = ({ size = '24', color = 'currentColor' }) => (
  <svg
    className="icon icon-tabler icon-tabler-hourglass"
    fill="none"
    height={size}
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <path d="M6.5 7h11" />
    <path d="M6.5 17h11" />
    <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
    <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
  </svg>
);

export const EditPenCil: React.FC<IconBaseProps> = ({ size = '24' }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height={size}>
    <path
      d="M16.057 2.177a1.75 1.75 0 0 1 2.35-.114l.125.114 3.291 3.291a1.75 1.75 0 0 1 .114 2.35l-.114.125-13.999 14a.75.75 0 0 1-.347.196l-.1.018-5.294.588a.75.75 0 0 1-.833-.727l.005-.1.588-5.295a.75.75 0 0 1 .148-.37l.067-.077 13.999-14Zm-2.411 4.53L3.304 17.05l-.456 4.101 4.101-.456 10.343-10.343-3.646-3.645Zm3.825-3.47a.25.25 0 0 0-.3-.04l-.054.04-2.41 2.41 3.645 3.644 2.41-2.408a.25.25 0 0 0 .066-.24l-.025-.06-.04-.054-3.292-3.292Z"
      fill="#765cb2"
      fill-rule="nonzero"
      className="fill-000000"
      //stroke="#765cb2"
      strokeWidth="2"
    ></path>
  </svg>
);

export const UserCheck: React.FC<IconBaseProps> = ({ width = '17', size = '20', color = 'currentColor' }) => (
  <svg
    className="feather feather-user-check"
    fill="none"
    height={`${size}px`}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={`${width}px`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

export const WarningCircle: React.FC<IconBaseProps> = ({ width = '17', size = '20', color = '#990000' }) => (
  <svg data-name="Layer 2" viewBox="0 0 38 38" width={width} height={size} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 37.44A18.44 18.44 0 1 1 37.44 19 18.461 18.461 0 0 1 19 37.44Zm0-34.38A15.94 15.94 0 1 0 34.94 19 15.958 15.958 0 0 0 19 3.06Z"
      fill={color}
      className="fill-000000"
    ></path>
    <circle cx="19" cy="26.242" r="1.878" fill="#990000" className="fill-000000"></circle>
    <path
      d="M18.969 21.569a1.2 1.2 0 0 1-1.2-1.145l-.425-8.883A1.652 1.652 0 0 1 19 9.82a1.652 1.652 0 0 1 1.65 1.731l-.487 8.881a1.2 1.2 0 0 1-1.194 1.137Z"
      fill={color}
      className="fill-000000"
    ></path>
  </svg>
);

//white background, black check
export const CheckCircle: React.FC<IconBaseProps> = ({ width = '17', size = '20', color = 'black' }) => (
  <svg
    enable-background="new 0 0 30 30"
    height={size}
    width={width}
    id="Layer_1"
    version="1.1"
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      fill-rule="evenodd"
      fill={color}
      d="M15,30C6.716,30,0,23.284,0,14.999C0,6.715,6.716,0,15,0s15,6.715,15,14.999  C30,23.284,23.284,30,15,30z M15,2C7.82,2,2,7.82,2,14.999C2,22.179,7.82,28,15,28s13-5.821,13-13.001C28,7.82,22.18,2,15,2z   M7.992,16.298l1.401-1.427l3.209,3.281l8.005-8.137l1.4,1.428l-9.41,9.565L7.992,16.298z"
    />
  </svg>
);

export const EyeWhiteBackground: React.FC<IconBaseProps> = ({ width = '17', size = '20', color = '#031017' }) => (
  <svg viewBox="0 0 50 50" height={size} width={width} xmlns="http://www.w3.org/2000/svg">
    <g fill={color} className="fill-002a41">
      <path d="M26.998 20.004c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 8c-1.102 0-2-.898-2-2s.898-2 2-2 2 .898 2 2-.898 2-2 2z"></path>
      <path d="M44.357 23.832C44.1 23.43 37.889 14 27.006 14c-10.891 0-17.367 9.828-17.367 9.828-.43.66-.641 1.41-.641 2.16 0 .762.211 1.523.641 2.184 0 0 6.477 9.828 17.367 9.828 10.883 0 17.094-9.43 17.352-9.832a3.974 3.974 0 0 0 .641-2.148 4.028 4.028 0 0 0-.642-2.188zM27.006 34c-8.836 0-14.008-8-14.008-8s5.172-8 14.008-8c8.828 0 13.992 8 13.992 8s-5.164 8-13.992 8z"></path>
    </g>
  </svg>
);

export const TimeSheetIcon: React.FC<IconBaseProps> = ({ width = '20', size = '21', color = 'none' }) => (
  <svg height={size} width={width} viewBox="0 0 20 21" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H8.697M5 3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H9C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3M5 3C5 3.53043 5.21071 4.03914 5.58579 4.41421C5.96086 4.78929 6.46957 5 7 5H9C9.53043 5 10.0391 4.78929 10.4142 4.41421C10.7893 4.03914 11 3.53043 11 3M15 12V16H19M15 12C16.0609 12 17.0783 12.4214 17.8284 13.1716C18.5786 13.9217 19 14.9391 19 16M15 12C13.9391 12 12.9217 12.4214 12.1716 13.1716C11.4214 13.9217 11 14.9391 11 16C11 17.0609 11.4214 18.0783 12.1716 18.8284C12.9217 19.5786 13.9391 20 15 20C16.0609 20 17.0783 19.5786 17.8284 18.8284C18.5786 18.0783 19 17.0609 19 16M15 9V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H11M5 9H9M5 13H8"
      stroke="#1F2225"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const DownloadIcon: React.FC<IconBaseProps> = ({ width = '18', size = '19', color = 'none' }) => (
  <svg height={size} width={width} viewBox="0 0 18 19" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 14V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V14M4 8L9 13M9 13L14 8M9 13V1"
      stroke="#1F2225"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
