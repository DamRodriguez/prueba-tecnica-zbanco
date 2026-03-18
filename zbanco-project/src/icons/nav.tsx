const iconSize = 25;

export const HomeIcon = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={iconSize} height={iconSize} viewBox="0 0 42 42">
      <path fill="" d="M2.68 15.726c-.1.039-.16.09-.18.149l.18-.149zm-.18.149v20.627c0 2.509.49 2.998 3 2.998h7c2.51 0 3-.461 3-3v-8h9v8.031c0 2.51.51 2.979 3 2.969c.04.031 7 0 7 0c2.529 0 3-.526 3-2.997V16.495c0-.08-.09-.15-.27-.23L20 1.5L2.68 15.726l-.18.149z" />
    </svg>
  )
};

export const DashboardIcon = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={iconSize} height={iconSize} viewBox="0 0 24 24">
      <path d="M15.21 2H8.75A6.76 6.76 0 0 0 2 8.75v6.5A6.76 6.76 0 0 0 8.75 22h6.5A6.76 6.76 0 0 0 22 15.25v-6.5A6.76 6.76 0 0 0 15.21 2m2.37 7.42l-2.45 3.71a1.77 1.77 0 0 1-2.4.51l-2.39-1.51a.2.2 0 0 0-.17 0a.24.24 0 0 0-.16.09l-2.45 3.24a.75.75 0 0 1-1 .15a.75.75 0 0 1-.15-1l2.45-3.26a1.75 1.75 0 0 1 2.33-.43l2.39 1.51a.21.21 0 0 0 .19 0a.23.23 0 0 0 .15-.1l2.46-3.71a.75.75 0 0 1 1.25.83z" />
    </svg>
  )
};