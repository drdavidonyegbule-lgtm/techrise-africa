import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/2348129815038?text=Hi%20TechRise%20Africa%2C%20I'd%20like%20to%20speak%20with%20an%20academic%20advisor.";

export function WhatsAppFloat() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TechRise on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_30px_-4px_rgba(37,211,102,0.7)] transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}