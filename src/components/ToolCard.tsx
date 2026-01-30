import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;
