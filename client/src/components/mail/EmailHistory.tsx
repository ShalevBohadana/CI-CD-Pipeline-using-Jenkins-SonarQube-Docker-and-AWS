import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { EmailHistoryEntry } from './interfaces/types';
import { Badge } from '../ui/Badge';

interface EmailHistoryProps {
  entries: EmailHistoryEntry[];
  isLoading?: boolean;
}

export const EmailHistory: React.FC<EmailHistoryProps> = ({ entries, isLoading = false }) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Email History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center'>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center'>
                    No email history found
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant='secondary'>{entry.type}</Badge>
                    </TableCell>
                    <TableCell>{entry.recipient}</TableCell>
                    <TableCell>{entry.subject}</TableCell>
                    <TableCell>
                      <Badge variant={entry.status === 'sent' ? 'success' : 'destructive'}>
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailHistory;
