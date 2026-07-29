import { useState, useEffect } from 'react';

/**
 * UserAvatar Component
 * Displays user's profile image if available.
 * If empty, missing, or fails to load, displays a clean placeholder badge with the user's initial.
 */
export default function UserAvatar({ src, name, className = 'h-10 w-10', onClick }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const initial = (name || 'U').charAt(0).toUpperCase();

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'User Profile'}
        onError={() => setImgError(true)}
        onClick={onClick}
        className={`${className} rounded-full object-cover shrink-0`}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${className} rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold flex items-center justify-center shrink-0 shadow-inner select-none uppercase`}
    >
      <span className="text-[1.1em]">{initial}</span>
    </div>
  );
}
