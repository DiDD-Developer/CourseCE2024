/**
 *
 */
export const DeleteIcon = ({ iconColor = "" } = {}) => {
  return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 4.125H14.0625V3.1875C14.0625 2.60734 13.832 2.05094 13.4218 1.6407C13.0116 1.23047 12.4552 1 11.875 1H8.125C7.54484 1 6.98844 1.23047 6.5782 1.6407C6.16797 2.05094 5.9375 2.60734 5.9375 3.1875V4.125H3.125C2.87636 4.125 2.6379 4.22377 2.46209 4.39959C2.28627 4.5754 2.1875 4.81386 2.1875 5.0625C2.1875 5.31114 2.28627 5.5496 2.46209 5.72541C2.6379 5.90123 2.87636 6 3.125 6H3.4375V16.625C3.4375 17.0394 3.60212 17.4368 3.89515 17.7299C4.18817 18.0229 4.5856 18.1875 5 18.1875H15C15.4144 18.1875 15.8118 18.0229 16.1049 17.7299C16.3979 17.4368 16.5625 17.0394 16.5625 16.625V6H16.875C17.1236 6 17.3621 5.90123 17.5379 5.72541C17.7137 5.5496 17.8125 5.31114 17.8125 5.0625C17.8125 4.81386 17.7137 4.5754 17.5379 4.39959C17.3621 4.22377 17.1236 4.125 16.875 4.125ZM7.8125 3.1875C7.8125 3.10462 7.84542 3.02513 7.90403 2.96653C7.96263 2.90792 8.04212 2.875 8.125 2.875H11.875C11.9579 2.875 12.0374 2.90792 12.096 2.96653C12.1546 3.02513 12.1875 3.10462 12.1875 3.1875V4.125H7.8125V3.1875ZM14.6875 16.3125H5.3125V6H14.6875V16.3125ZM9.0625 8.5V13.5C9.0625 13.7486 8.96373 13.9871 8.78791 14.1629C8.6121 14.3387 8.37364 14.4375 8.125 14.4375C7.87636 14.4375 7.6379 14.3387 7.46209 14.1629C7.28627 13.9871 7.1875 13.7486 7.1875 13.5V8.5C7.1875 8.25136 7.28627 8.0129 7.46209 7.83709C7.6379 7.66127 7.87636 7.5625 8.125 7.5625C8.37364 7.5625 8.6121 7.66127 8.78791 7.83709C8.96373 8.0129 9.0625 8.25136 9.0625 8.5ZM12.8125 8.5V13.5C12.8125 13.7486 12.7137 13.9871 12.5379 14.1629C12.3621 14.3387 12.1236 14.4375 11.875 14.4375C11.6264 14.4375 11.3879 14.3387 11.2121 14.1629C11.0363 13.9871 10.9375 13.7486 10.9375 13.5V8.5C10.9375 8.25136 11.0363 8.0129 11.2121 7.83709C11.3879 7.66127 11.6264 7.5625 11.875 7.5625C12.1236 7.5625 12.3621 7.66127 12.5379 7.83709C12.7137 8.0129 12.8125 8.25136 12.8125 8.5Z" fill="${iconColor ? iconColor : "currentColor"}"/>
</svg>`;
};