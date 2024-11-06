import { cn } from '@/lib/utils';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={cn('text-sm font-medium text-red-600', className)}>
            {message}
        </p>
    ) : null;
}
