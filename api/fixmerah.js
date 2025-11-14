import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, pass, subject, number } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: email, pass: pass }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "smb@support.whatsapp.com",
      subject: subject || "Question about WhatsApp Business for Android",
      text: `Halo Tim WhatsApp Support,\n\nSaya ingin melaporkan masalah dengan nomor ${number}.\nSetiap kali saya mencoba login muncul pesan “Login Tidak Tersedia Saat Ini”. Mohon bantuannya agar akun saya bisa dipulihkan.\n\nTerima kasih.`
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Email gagal dikirim", detail: err.message });
  }
}
