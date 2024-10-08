export default function IconPath({ name }: { name: string }) {
  switch (name) {
    case "lineChart":
      return (
        <>
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </>
      );
    case "edit":
      return (
        <>
          <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
          <line x1="3" y1="22" x2="21" y2="22"></line>
        </>
      );
    case "home":
      return (
        <>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </>
      );
    case "checkCircle":
      return (
        <>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </>
      );
    case "info":
      return (
        <>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </>
      );
    case "logout":
      return (
        <>
          <path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" />
        </>
      );
    default:
      return <></>;
  }
}
