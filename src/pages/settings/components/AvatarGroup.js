import React from 'react';


function Avatar({ name, src }) {
    return (
      <div className="relative inline-block">
        <img className="w-8 h-8 rounded-full border-2 border-white shadow-md" src={src} alt={name} />
      </div>
    );
  }
  
  export function AvatarGroup({ size, max, avatars }) {
    const visibleAvatars = avatars?.slice(0, max);
  
    return (
      <div className="flex items-center space-x-[-1rem]">
        {visibleAvatars?.map((avatar, index) => (
          <Avatar key={index} name={avatar.name} src={avatar.img} />
        ))}
        {avatars.length > max && (
          <div className={`relative inline-block ${size === 'sm' ? 'w-8 h-8' : 'w-16 h-16'} flex items-center justify-center bg-white text-black rounded-full shadow-md`}>
            <span className="text-xs">{`+${avatars.length - max}`}</span>
          </div>
        )}
      </div>
    );
  }