import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';

// }
export type ReportFilters = Pretty<
  CommonFilters & {
    userId?: string;
    reportType?: string;
    reason?: string;
  }
>;
