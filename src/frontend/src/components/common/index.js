/**
 * Índice de exportación de componentes comunes
 * Facilita la importación de componentes reutilizables
 */

// Layout & Navigation
export { default as Navbar } from './Navbar';
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Typography } from './Typography';

// Feedback Components
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as Toast, ToastContainer, useToast } from './Toast';
export { default as ConfirmDialog, useConfirmDialog } from './ConfirmDialog';

// Data Display
export { default as DataTable } from './DataTable';
export { default as Map } from './Map';
export { default as StatsCard, StatsGrid } from './StatsCard';

/**
 * Uso:
 * 
 * import { LoadingSpinner, Toast, DataTable } from '@/components/common';
 * 
 * O individualmente:
 * import LoadingSpinner from '@/components/common/LoadingSpinner';
 */
