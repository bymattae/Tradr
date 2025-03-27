import Image from 'next/image';

interface ProfilePreviewProps {
  username?: string;
  avatarUrl?: string | null;
  bio?: string;
  isEditing?: boolean;
  onAvatarClick?: () => void;
  onBioChange?: (bio: string) => void;
  onUsernameChange?: (username: string) => void;
}

export default function ProfilePreview({ 
  username, 
  avatarUrl, 
  bio, 
  isEditing,
  onAvatarClick,
  onBioChange,
  onUsernameChange
}: ProfilePreviewProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 space-y-6 relative">
        {isEditing && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black rounded-full">
            <p className="text-[10px] text-white font-bold">PREVIEW MODE</p>
          </div>
        )}

        {/* Avatar & Username */}
        <div className="flex items-center gap-4">
          <div 
            className={`relative w-24 h-24 rounded-xl bg-gray-50 border-2 ${
              isEditing 
                ? 'border-dashed border-gray-200 hover:border-[--primary] cursor-pointer group' 
                : 'border-gray-100'
            } overflow-hidden flex items-center justify-center flex-shrink-0 transition-all`}
            onClick={isEditing ? onAvatarClick : undefined}
          >
            {avatarUrl ? (
              <>
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-[8px] text-white font-bold">CHANGE PHOTO</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full group-hover:scale-110 transition-transform">
                <span className="text-2xl mb-0.5">📸</span>
                {isEditing && (
                  <p className="text-[8px] text-gray-400 font-bold text-center leading-none">
                    CLICK TO<br />ADD PHOTO
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="relative mb-2">
                <input
                  type="text"
                  value={username || ''}
                  onChange={(e) => onUsernameChange?.(e.target.value.toLowerCase())}
                  className="w-full pl-6 pr-4 py-2 bg-gray-50 rounded-lg text-sm font-bold border-2 border-gray-100 focus:border-[--primary] focus:outline-none transition-all"
                  placeholder="username"
                  maxLength={15}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
              </div>
            ) : (
              <div className="mb-2">
                <p className="font-bold text-sm truncate">
                  {username || 'username'}
                </p>
              </div>
            )}
            <p className="text-[14px] text-gray-400 font-mono font-bold truncate hover:text-[--primary] transition-colors cursor-pointer">
              tradr.co/{username?.toLowerCase() || 'username'}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="relative">
          {isEditing && (
            <div className="absolute -top-2 left-4 px-2 bg-white">
              <p className="text-[10px] text-gray-400 font-bold">BIO</p>
            </div>
          )}
          <textarea
            value={bio || ''}
            onChange={(e) => onBioChange?.(e.target.value)}
            placeholder={isEditing ? "What's your trading style? 🎯" : "Bio will appear here..."}
            maxLength={150}
            disabled={!isEditing}
            className={`w-full h-24 p-4 rounded-xl text-[12px] transition-all ${
              isEditing
                ? 'bg-gray-50 border-2 border-gray-100 focus:border-[--primary] focus:outline-none resize-none'
                : 'bg-transparent border-none resize-none'
            }`}
          />
          {isEditing && (
            <p className="absolute -bottom-2 right-2 px-2 bg-white">
              <span className="text-[10px] text-gray-400 font-bold">{(bio?.length || 0)}/150</span>
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-gray-100">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold">YOUR XP</p>
            <p className="text-base font-bold">0</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold">HIGHEST STREAK</p>
            <p className="text-base font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
} 