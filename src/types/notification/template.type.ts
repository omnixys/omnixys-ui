export interface NotificationTemplateType {
  id: string;
  type: string;
  name: string;
  subject: string;
  body: string;
  placeholders: string[];
  isHtml: boolean;
}
