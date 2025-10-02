import contactFormSchema from '../../schema/contact-form.schema';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;

    // Server-side validation with Zod (basic)
    const parsed = contactFormSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.format() });
    }

    // Here you can persist data, send emails, etc.
    return res.status(200).json({ success: true, data: parsed.data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
