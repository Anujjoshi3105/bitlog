"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Share2, Check, LinkIcon } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaRedditAlien,
  FaEnvelope,
  FaPinterestP,
  FaTelegramPlane,
  FaTumblr,
  FaWeibo,
  FaLine,
  FaViber,
  FaGetPocket,
  FaSnapchatGhost,
  FaBloggerB,
  FaMix,
  FaFlipboard,
} from "react-icons/fa";

const SHARE_OPTIONS = [
  {
    name: "facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "twitter",
    icon: FaTwitter,
    url: "https://twitter.com/intent/tweet?url=",
  },
  {
    name: "linkedin",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
  {
    name: "whatsapp",
    icon: FaWhatsapp,
    url: "https://api.whatsapp.com/send?text=",
  },
  {
    name: "reddit",
    icon: FaRedditAlien,
    url: "https://reddit.com/submit?url=",
  },
  { name: "mail", icon: FaEnvelope, url: "mailto:?body=" },
  {
    name: "pinterest",
    icon: FaPinterestP,
    url: "https://pinterest.com/pin/create/button/?url=",
  },
  {
    name: "telegram",
    icon: FaTelegramPlane,
    url: "https://t.me/share/url?url=",
  },
  {
    name: "tumblr",
    icon: FaTumblr,
    url: "https://www.tumblr.com/share/link?url=",
  },
  {
    name: "weibo",
    icon: FaWeibo,
    url: "https://service.weibo.com/share/share.php?url=",
  },
  { name: "line", icon: FaLine, url: "https://line.me/R/msg/text/?" },
  { name: "viber", icon: FaViber, url: "viber://forward?text=" },
  { name: "pocket", icon: FaGetPocket, url: "https://getpocket.com/save?url=" },
  {
    name: "snapchat",
    icon: FaSnapchatGhost,
    url: "https://www.snapchat.com/scan?attachmentUrl=",
  },
  {
    name: "blogger",
    icon: FaBloggerB,
    url: "https://www.blogger.com/blog-this.g?u=",
  },
  {
    name: "mix",
    icon: FaMix,
    url: "https://mix.com/add?url=",
  },
  {
    name: "flipboard",
    icon: FaFlipboard,
    url: "https://share.flipboard.com/bookmarklet/popout?v=2&url=",
  },
];

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleShare = (url: string) => {
    window.open(
      url + encodeURIComponent(shareUrl),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share this page</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={shareUrl}
                aria-label="Page URL"
                className="flex-1"
              />
              <Button
                size="sm"
                className="px-3"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy link"}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex gap-3 py-2 overflow-x-auto">
              {SHARE_OPTIONS.map(({ name, icon: Icon, url }) => (
                <Button
                  key={name}
                  onClick={() => handleShare(url)}
                  size="sm"
                  variant="outline"
                  aria-label={`Share on ${name}`}>
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>
      <TooltipContent>
        <p>Share this post</p>
      </TooltipContent>
    </Tooltip>
  );
}
