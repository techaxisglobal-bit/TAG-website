"use client";

export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#F5F5F7] -z-10 ${className}`} aria-hidden="true">
      {/* Fallback code-native gradient mesh moving slowly */}
      <div 
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #EAF2FF 0%, transparent 40%), radial-gradient(circle at 80% 20%, #FFFFFF 0%, transparent 50%), radial-gradient(circle at 20% 80%, #E8F0FE 0%, transparent 50%)',
          animation: 'spin 40s linear infinite',
        }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
