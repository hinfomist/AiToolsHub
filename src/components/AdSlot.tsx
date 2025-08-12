interface AdSlotProps {
  position: 'sidebar' | 'banner';
  className?: string;
}

const AdSlot = ({ position, className = '' }: AdSlotProps) => {
  // Blogger.com style ad placement
  if (position === 'banner') {
    // Mobile banner ad (responsive)
    return (
      <div className={`lg:hidden w-full max-w-md mx-auto bg-gray-100 border border-gray-300 rounded-lg overflow-hidden ${className}`}>
        <div className="w-full h-[60px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">
              MOBILE BANNER AD
            </div>
            <div className="text-xs text-gray-400">
              468x60 - Paste your Adsterra banner code here
            </div>
          </div>
        </div>
        {/* Example Adsterra code placeholder */}
        {/*
        <script type="text/javascript">
          atOptions = {
            'key' : 'bc200603ac65f380f52b50bead1f39c0',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/bc200603ac65f380f52b50bead1f39c0/invoke.js"></script>
        */}
      </div>
    );
  }

  // Desktop sidebar ad (300x250 standard)
  return (
    <div className={`hidden lg:block w-[300px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <div className="w-full h-[250px] flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-sm font-medium text-gray-500 mb-2">
            SIDEBAR AD
          </div>
          <div className="text-xs text-gray-400 mb-1">
            300x250
          </div>
          <div className="text-xs text-gray-400">
            Paste your Adsterra code here
          </div>
        </div>
      </div>
      {/* Example Adsterra code placeholder */}
      {/*
      <script type="text/javascript">
        atOptions = {
          'key' : 'your-adsterra-key',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="//www.highperformanceformat.com/your-key/invoke.js"></script>
      */}
    </div>
  );
};

export default AdSlot;