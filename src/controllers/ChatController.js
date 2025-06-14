import { GoogleGenerativeAI } from "@google/generative-ai";
import getKey from "../services/key.js";

const IAController = {
    gemini: async (req, res) => {
        try {
            const apiKey = getKey();
            const genAI = new GoogleGenerativeAI(apiKey);

            const { prompt } = req.body;
            if (!prompt || prompt.trim() === "") {
                return res.status(400).json({ error: "Prompt é obrigatório" });
            }

            // define o contexto do seu site/vinhos
            const contexto = `
Você é um assistente especialista em vinhos para o site Vino, que é um marketplace de vinhos.
Você ajuda o usuário a escolher vinhos, responder dúvidas sobre produtos, avaliações e harmonizações, se informe a cerca de vinhos em sites se possivel, também tente falar as coisas de forma mais breves sem muito texto.
`;

            // junta o contexto + pergunta do usuário
            const promptCompleto = `${contexto}\nUsuário pergunta: ${prompt}\nResposta:`;

            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

            const result = await model.generateContent([promptCompleto]);
            const response = await result.response;
            const text = response.text();

            res.json({ reply: text });
        } catch (error) {
            console.error("Erro no Gemini:", error);
            res.status(500).json({ error: "Erro ao processar a mensagem" });
        }
    },
};

export default IAController;
