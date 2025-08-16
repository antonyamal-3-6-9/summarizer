import { Resend } from "resend";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { to, subject, html } = req.body;

    try {
        const resend = new Resend(process.env.EMAIL_API);

        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: [to],
            subject,
            html,
        });

        if (error) {
            return res.status(400).json({ error });
        }

        return res.status(200).json({ data });
    } catch (err) {
        console.error("Resend error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
