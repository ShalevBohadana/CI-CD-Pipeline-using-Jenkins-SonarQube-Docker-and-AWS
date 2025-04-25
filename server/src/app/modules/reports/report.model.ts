import mongoose, { model, Schema } from 'mongoose';

import { IReport, REPORT_TYPE } from './report.validation';

interface Fine {
  amount?: number;
  reason: string;
}

const fineSchema = new Schema<Fine>({
  amount: { type: Number, optional: true },
  reason: { type: String, required: true },
});

const ReportSchema = new Schema<IReport>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    reportType: {
      type: String,
      enum: Object.values(REPORT_TYPE),
      required: true,
    },
    reason: { type: String, optional: true },
    fine: { type: fineSchema, optional: true },
  },
  {
    timestamps: true,
  },
);

const ReportModel = model<IReport>('Report', ReportSchema);

export { ReportModel };
