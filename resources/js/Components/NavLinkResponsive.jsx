import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function NavLinkResponsive({
    active = false,
    url = "#",
    title,
    icon: Icon,
    ...props
}) {
    return (
        <Link
            {...props}
            href={url}
            className={cn(
                active
                    ? "bg-gradient-to-t from-orange-400 via-orange-500 to-orange-500 font-serif text-white hover:text-white"
                    : "text-muted-foreground hover:text-white",
                "flex items-center gap-3 rounded-lg p-2 font-medium transition-all"
            )}
        >
            <Icon className="w-4 h-4" />
            {title}
        </Link>
    );
}
