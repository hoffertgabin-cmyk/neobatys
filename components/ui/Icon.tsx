import {
  Bell,
  ChartColumn,
  Download,
  FileText,
  FolderOpen,
  Handshake,
  Images,
  MapPin,
  Moon,
  PencilRuler,
  Phone,
  Receipt,
  Repeat,
  Rocket,
  Search,
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
  folder: FolderOpen,
  handshake: Handshake,
  images: Images,
  mapPin: MapPin,
  moon: Moon,
  pencil: PencilRuler,
  phone: Phone,
  receipt: Receipt,
  repeat: Repeat,
  rocket: Rocket,
  search: Search,
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
