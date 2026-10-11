"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { mediaManifest } from "@/data/media";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilmModal({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const media = mediaManifest["home-film"];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (dialog) {
      dialog.close();
      document.body.style.overflow = '';
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!media || !media.mp4) return null;

  return (
    <dialog 
      ref={dialogRef}
      className="backdrop:bg-black/80 backdrop:backdrop-blur-md bg-transparent m-auto w-full max-w-5xl rounded-2xl p-0 shadow-2xl focus:outline-none"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        {isOpen && (
          <video 
            controls 
            autoPlay 
            className="w-full h-full"
            poster={media.poster}
          >
            <source src={media.mp4} type="video/mp4" />
            <track kind="captions" srcLang="en" label="English" src="/media/captions.vtt" default />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </dialog>
  );
}
