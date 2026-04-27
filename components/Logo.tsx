export function Logo({ className = "", size = 24 }: { className?: string, size?: number | string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 210 300" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
      className={className}
    >
        <g transform="matrix(1,0,0,1,-631.138,-850.162)">
            <g transform="matrix(-13.9384,0,0,13.9384,902.938,829.254)">
                <path d="M12,23C16.142,23 19.5,19.642 19.5,15.5C19.5,14.634 19.27,13.803 19,13.03C17.333,14.677 16.067,15.5 15.2,15.5C19.195,8.5 17,5.5 11,1.5C11.5,6.5 8.204,8.774 6.862,10.037C5.408,11.405 4.5,13.346 4.5,15.5C4.5,19.642 7.858,23 12,23ZM12.709,5.235C15.951,7.985 15.967,10.122 13.463,14.509C12.702,15.842 13.665,17.5 15.2,17.5C15.888,17.5 16.584,17.299 17.319,16.905C16.698,19.262 14.552,21 12,21C8.962,21 6.5,18.538 6.5,15.5C6.5,13.961 7.133,12.528 8.232,11.493C8.358,11.375 8.997,10.808 9.025,10.784C9.449,10.402 9.798,10.066 10.143,9.697C11.373,8.379 12.257,6.916 12.709,5.235Z" style={{ fill: 'currentColor', fillRule: 'nonzero' }}/>
            </g>
        </g>
    </svg>
  );
}
