/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Video, ExternalLink, ShieldCheck, Film } from 'lucide-react';
import { ReviewVideo, SiteConfig, getEmbedVideoUrl } from '../config';

interface ReviewVideosProps {
  config: SiteConfig;
  onOpenOwnerConfig: () => void;
}

export const ReviewVideos: React.FC<ReviewVideosProps> = ({ config, onOpenOwnerConfig }) => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Filter approved videos only
  const approvedVideos = (config.reviewVideos || []).filter((v) => v.approved === true);

  if (approvedVideos.length === 0) {
    return (
      <section className="py-12 bg-white border-t border-[#EAE3D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center p-8 rounded-3xl bg-[#FAF8F5] border border-[#E9E2D4]">
            <Film className="w-8 h-8 text-[#235E37] mx-auto mb-2 opacity-80" />
            <h3 className="text-base font-bold text-[#14291B] font-serif-title">
              Authentic Customer Video Reviews
            </h3>
            <p className="text-xs text-[#526558] mt-1.5 leading-relaxed">
              We feature genuine video experiences only when submitted by verified customers and approved by {config.brandName}. No fake or hired promotional actors.
            </p>
            <div className="mt-3">
              <button
                onClick={onOpenOwnerConfig}
                className="text-[11px] text-[#235E37] hover:underline font-medium"
              >
                Owner: Add verified customer YouTube or MP4 video links in Settings &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white border-t border-[#EAE3D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#112418] mt-1 font-serif-title">
            Customer Video Reviews
          </h2>
          <p className="text-xs sm:text-sm text-[#4E6255] mt-1">
            Watch verified customers share their genuine routine and impressions with DAAD FREE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedVideos.map((video) => {
            const embed = getEmbedVideoUrl(video.videoUrl);
            const isPlaying = playingVideoId === video.id;

            return (
              <div
                key={video.id}
                className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E8E1D3] shadow-xs flex flex-col justify-between"
              >
                {/* Video Container (No autoplay with sound!) */}
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                  {isPlaying ? (
                    embed.type === 'youtube' ? (
                      <iframe
                        src={`${embed.src}&autoplay=1`}
                        title={video.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={embed.src}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    )
                  ) : (
                    <div
                      onClick={() => setPlayingVideoId(video.id)}
                      className="relative w-full h-full cursor-pointer group"
                    >
                      {video.thumbnailUrl ? (
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#183424] flex items-center justify-center">
                          <Video className="w-12 h-12 text-[#467356]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-white text-[#183424] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption / Title */}
                <div className="p-4">
                  <h4 className="text-sm font-bold text-[#14291B] line-clamp-1">
                    {video.title}
                  </h4>
                  {video.customerName && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-[#526658]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#235E37]" />
                      <span>{video.customerName}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
