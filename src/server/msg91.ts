import { env } from "@/env.js";
import { getServerSecret, hasConfiguredServerSecret } from "@/server/server-secrets";

type Msg91Recipient = {
  to: Array<{ name?: string; email: string }>;
  cc?: Array<{ name?: string; email: string }>;
  bcc?: Array<{ name?: string; email: string }>;
  variables?: Record<string, unknown>;
};

export type Msg91Attachment =
  | { filePath: string; fileName: string }
  | { file: string; fileName: string };

export type Msg91EmailRequest = {
  recipients: Msg91Recipient[];
  from?: { name?: string; email: string };
  domain?: string;
  reply_to?: Array<{ email: string }>;
  attachments?: Msg91Attachment[];
  template_id?: string;
};

export type Msg91EmailResponse = {
  data?: {
    thread_id?: number;
    unique_id?: string;
    message_id?: string;
  };
  errors?: Record<string, unknown>;
  status?: string;
  hasError?: boolean;
};

export class Msg91Service {
  private static endpoint = "https://control.msg91.com/api/v5/email/send";
  private static authKey(): Promise<string | undefined> {
    return getServerSecret("MSG91_AUTH_KEY");
  }

  private static fromDefaults() {
    const name = env.MSG91_EMAIL_FROM_NAME || process.env.MSG91_EMAIL_FROM_NAME;
    const email = env.MSG91_EMAIL_FROM_EMAIL || process.env.MSG91_EMAIL_FROM_EMAIL;
    return email ? { name: name || undefined, email } : undefined;
  }

  private static domainDefault(): string | undefined {
    return env.MSG91_EMAIL_DOMAIN || process.env.MSG91_EMAIL_DOMAIN;
  }

  static isConfigured(): boolean {
    return hasConfiguredServerSecret("MSG91_AUTH_KEY");
  }

  static async send(body: Msg91EmailRequest): Promise<Msg91EmailResponse> {
    const auth = await this.authKey();
    if (!auth) {
      throw new Error("MSG91 not configured: set MSG91_AUTH_KEY");
    }

    const payload: Msg91EmailRequest = {
      ...body,
      from: body.from ?? this.fromDefaults(),
      domain: body.domain ?? this.domainDefault(),
    };

    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authkey: auth,
        "content-type": "application/JSON",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 401) {
      // Empty body per docs on 401
      throw new Error("MSG91 unauthorized (401). Check MSG91_AUTH_KEY");
    }

    const json = (await res.json()) as Msg91EmailResponse;
    if (!res.ok) {
      const reason = json?.errors ? JSON.stringify(json.errors) : res.statusText;
      throw new Error(`MSG91 error: ${reason}`);
    }
    return json;
  }

  // Helper for a simple single-recipient send using template
  static async sendTemplateEmail(params: {
    toEmail: string;
    toName?: string;
    templateId: string;
    variables?: Record<string, unknown>;
    ccEmails?: Array<{ name?: string; email: string }>;
    bccEmails?: Array<{ name?: string; email: string }>;
    replyToEmails?: string[];
    attachments?: Msg91Attachment[];
  }): Promise<Msg91EmailResponse> {
    const recipients: Msg91Recipient[] = [
      {
        to: [{ name: params.toName, email: params.toEmail }],
        cc: params.ccEmails,
        bcc: params.bccEmails,
        variables: params.variables,
      },
    ];

    return this.send({
      recipients,
      reply_to: params.replyToEmails?.map((e) => ({ email: e })),
      attachments: params.attachments,
      template_id: params.templateId,
    });
  }

  // Helper to send a basic custom email without template (using HTML/text converted via template variables if needed)
  static async sendCustomEmail(params: {
    recipients: Msg91Recipient[];
    subjectVar?: string;
    htmlVar?: string;
    textVar?: string;
    attachments?: Msg91Attachment[];
  }): Promise<Msg91EmailResponse> {
    const payload: Msg91EmailRequest = {
      recipients: params.recipients,
      attachments: params.attachments,
    };
    // For non-template emails, MSG91 expects you to have a template which can render variables
    // If not using templates, keep this method for extensibility; most use-cases should use sendTemplateEmail
    return this.send(payload);
  }
}
