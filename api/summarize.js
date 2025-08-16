// api/summarize.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, transcript } = req.body;

        const payload = {
            system_instruction: {
                parts: [
                    {
                        text: "You are a helpful AI assistant that generates concise summaries of meeting transcripts based on user-provided prompts."
                    }
                ]
            },
            contents: [
                {
                    parts: [
                        { text: `${prompt}\n\n${transcript}` }
                    ]
                }
            ],
            generationConfig: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        };

        const response = await fetch(process.env.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.API_KEY  
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate summary" });
    }
}
