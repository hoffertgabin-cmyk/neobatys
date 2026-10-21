import {
  Bell,
  ChartColumn,
  Download,
  FileText,
  Handshake,
  Images,
  MapPin,
  MessageSquareText,
  Mic,
  PencilRuler,
  Phone,
  Receipt,
  Repeat,
  Rocket,
  ScanText,
  ShieldCheck,
  Smartphone,
  Star,
  Store,
  Zap,
  type LucideProps,
} from "lucide-react";

/** Correspondance nom → icône, pour garder les fichiers /content sans import. */
const icons = {
  bell: Bell,
  chart: ChartColumn,
  download: Download,
  fileText: FileText,
  handshake: Handshake,
  images: Images,
  mapPin: MapPin,
  message: MessageSquareText,
  mic: Mic,
  pencil: PencilRuler,
  phone: Phone,
  receipt: Receipt,
  repeat: Repeat,
  rocket: Rocket,
  scan: ScanText,
  shield: ShieldCheck,
  smartphone: Smartphone,
  star: Star,
  store: Store,
  zap: Zap,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as IconName] ?? Star;
  return <Component aria-hidden="true" {...props} />;
}
