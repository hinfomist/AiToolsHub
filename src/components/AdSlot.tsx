interface AdSlotProps {
  position: 'sidebar' | 'header' | 'footer' | 'inline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AdSlot = ({ position, size = 'medium', className = '' }: AdSlotProps) => {
  // Ad size configurations based on Google Ads/Adsterra recommendations
  const getAdSize = () => {
    switch (position) {
      case 'sidebar':
        switch (size) {
          case 'small':
            return 'w-[250px] h-[250px]'; // Square
          case 'medium':
            return 'w-[300px] h-[250px]'; // Medium Rectangle (most popular)
          case 'large':
            return 'w-[300px] h-[600px]'; // Half Page
          default:
            return 'w-[300px] h-[250px]';
        }
      case 'header':
        return 'w-[728px] h-[90px]'; // Leaderboard
      case 'footer':
        return 'w-[728px] h-[90px]'; // Leaderboard
      case 'inline':
        return 'w-[336px] h-[280px]'; // Large Rectangle
      default:
        return 'w-[300px] h-[250px]';
    }
  };

  return (
    <div className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${getAdSize()} ${className}`}>
      <div className="text-center p-4">
        <div className="text-sm font-medium text-gray-500 mb-2">
          AD SPACE - {position.toUpperCase()}
        </div>
        <div className="text-xs text-gray-400">
          {position === 'sidebar' && size === 'medium' && '300x250'}
          {position === 'sidebar' && size === 'large' && '300x600'}
          {position === 'sidebar' && size === 'small' && '250x250'}
          {position === 'header' && '728x90'}
          {position === 'footer' && '728x90'}
          {position === 'inline' && '336x280'}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Paste your ad code here
        </div>
      </div>
    </div>
  );
};

export default AdSlot;