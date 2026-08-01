export interface EmailHistory {
  id: string;
  subject: string;
  sentAt: string;
  sent: number;
  failed: number;
  recipients: {
    name: string;
    email: string;
  }[];
}