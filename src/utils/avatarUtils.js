export function getInitials(name) {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}

export function getUserAvatar() {
    let sender =  "User" 
    const colors = ['#007AFF', '#FF2D55', '#5856D6', '#FF9500', '#4CD964'];
    const charIndex = sender.charCodeAt(0) - 65;
    const colorIndex = charIndex % colors.length;
    const bgColor = colors[colorIndex];
    const initials = sender.match(/\b\w/g) || [];
    const avatarText = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return `data:image/svg+xml;charset=UTF-8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100" fill="${bgColor}" />
    <text x="50" y="50" font-size="40" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial">${avatarText}</text>
  </svg>`;
}

export function getBotAvatar(sender) {
    sender = sender ? sender : "Bot" 
    const colors = ['#007AFF', '#FF2D55', '#5856D6', '#FF9500', '#4CD964'];
    const charIndex = sender.charCodeAt(0) - 65;
    const colorIndex = charIndex % colors.length;
    const bgColor = colors[colorIndex];
    const initials = sender.match(/\b\w/g) || [];
    const avatarText = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return `data:image/svg+xml;charset=UTF-8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100" fill="${bgColor}" />
    <text x="50" y="50" font-size="40" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial">${avatarText}</text>
  </svg>`;
}
