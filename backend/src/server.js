const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "HospitalLocker AI backend is running",
  });
});

// ========================================
// LOCAL DEMO AI FALLBACK
// ========================================

function demoAI(message, patientContext) {
  const question = message.toLowerCase();

  const referral = patientContext?.referral;
  const consultation = patientContext?.consultation;
  const prescription = patientContext?.prescription;

  // Latest prescription
  if (
    question.includes("prescription") ||
    question.includes("medicine") ||
    question.includes("medication")
  ) {
    if (!prescription) {
      return "No prescription is currently available in your Health Locker.";
    }

    let answer = `Your latest prescription is from ${prescription.date || "the recent consultation"}.\n\n`;

    if (prescription.diagnosis) {
      answer += `Diagnosis/assessment: ${prescription.diagnosis}\n\n`;
    }

    if (prescription.medicines?.length) {
      answer += "Medicines:\n";

      prescription.medicines.forEach((medicine, index) => {
        answer += `${index + 1}. ${medicine.name || "Medicine"} — ${
          medicine.dosage || "Dosage not specified"
        }`;

        if (medicine.frequency) {
          answer += `, ${medicine.frequency}`;
        }

        if (medicine.duration) {
          answer += `, for ${medicine.duration}`;
        }

        answer += "\n";
      });
    }

    if (prescription.advice) {
      answer += `\nDoctor's advice: ${prescription.advice}`;
    }

    if (prescription.followUp) {
      answer += `\n\nFollow-up: ${prescription.followUp}`;
    }

    answer +=
      "\n\nPlease follow your doctor's instructions and do not change your medication without consulting a qualified healthcare professional.";

    return answer;
  }

  // Healthcare journey
  if (
    question.includes("journey") ||
    question.includes("history") ||
    question.includes("treatment") ||
    question.includes("summarize") ||
    question.includes("summary")
  ) {
    let answer = "Here is a summary of your healthcare journey:\n\n";

    if (referral) {
      answer += `1. PHC Visit\nYou were initially seen at ${referral.source || "the Primary Health Centre"}.\n\n`;

      answer += `2. Digital Referral\nA referral was created for ${
        referral.hospital || "the hospital"
      }.\n`;

      if (referral.department) {
        answer += `Department: ${referral.department}\n`;
      }

      if (referral.reason) {
        answer += `Reason: ${referral.reason}\n`;
      }

      answer += "\n";
    } else {
      answer += "1. Referral information is not currently available.\n\n";
    }

    if (consultation) {
      answer += "3. Doctor Consultation\n";
      if (consultation.diagnosis) {
        answer += `Assessment: ${consultation.diagnosis}\n`;
      }
      if (consultation.symptoms) {
        answer += `Symptoms recorded: ${consultation.symptoms}\n`;
      }
      answer += "\n";
    } else {
      answer += "3. Doctor consultation information is not currently available.\n\n";
    }

    if (prescription) {
      answer += "4. Prescription\nYour prescription has been added to your Health Locker.\n\n";
    } else {
      answer += "4. Prescription information is not currently available.\n\n";
    }

    answer +=
      "Your healthcare records are organized in one place so that your care journey can remain connected.";

    return answer;
  }

  // Referral
  if (
    question.includes("referral") ||
    question.includes("hospital") ||
    question.includes("phc")
  ) {
    if (!referral) {
      return "No referral information is currently available in your Health Locker.";
    }

    return `Your referral was created from ${
      referral.source || "the Primary Health Centre"
    } to ${referral.hospital || "the hospital"}.

Referral ID: ${referral.referralId || "Not available"}
Department: ${referral.department || "Not specified"}
Reason: ${referral.reason || "Not specified"}
Status: ${referral.status || "Not available"}

The QR code used in this prototype contains only the referral identifier, not your medical records.`;
  }

  // Help
  if (
    question.includes("help") ||
    question.includes("what can you do") ||
    question.includes("what do you do")
  ) {
    return `I can help you understand your HospitalLocker records.

You can ask me:
• "Summarize my healthcare journey"
• "What is my latest prescription?"
• "Explain my treatment"
• "Show me my referral information"

I can explain information from your available records, but I cannot diagnose conditions or change your medication.`;
  }

  // Default
  return `I can help explain your HospitalLocker healthcare records.

Try asking:
• "Summarize my healthcare journey"
• "What is my latest prescription?"
• "Explain my treatment"
• "What is my referral status?"

I provide information from available records and do not replace a qualified healthcare professional.`;
}

// ========================================
// AI HEALTH ASSISTANT
// ========================================

app.post("/api/ai/assistant", async (req, res) => {
  try {
    const { message, patientContext } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message.",
      });
    }

    const context = patientContext
      ? `Authorized patient information:
${JSON.stringify(patientContext, null, 2)}`
      : "No patient-specific information is available.";

    // Try real AI first
    try {
      const response = await openai.responses.create({
        model: "gpt-5-mini",

        instructions: `
You are the HospitalLocker AI Health Assistant.

Your purpose is to help patients understand their authorized healthcare
information in simple and clear language.

Rules:
- Do NOT diagnose diseases.
- Do NOT prescribe medicines.
- Do NOT recommend changing medicine dosage.
- Do NOT tell patients to stop or start medicines.
- Do NOT replace a qualified doctor.
- Explain information already present in the patient's records.
- Never invent patient information.
- If information is unavailable, clearly say so.
- For emergencies, advise the patient to seek appropriate medical care.
- Use simple language.
- Support English, Hindi and Marathi.
- Respond in the language used by the patient whenever possible.
`,

        input: `
${context}

Patient question:
${message}
`,
      });

      return res.json({
        success: true,
        reply: response.output_text,
        mode: "ai",
      });
    } catch (aiError) {
      console.log("Real AI unavailable. Using demo AI fallback.");
      console.log("Reason:", aiError.message);

      // Fallback for hackathon demo
      const fallbackReply = demoAI(message, patientContext);

      return res.json({
        success: true,
        reply: fallbackReply,
        mode: "demo",
      });
    }
  } catch (error) {
    console.error("Server Error:", error);

    res.status(500).json({
      success: false,
      message: "AI assistant is temporarily unavailable.",
    });
  }
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});