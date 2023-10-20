function Add() {
    const button = document.getElementsByClassName("input_button")[0];
    const input_text = document.getElementsByClassName("input_text")[0];
    const list = document.getElementsByClassName("body")[0];

    button.addEventListener("click", () => {
        const input_value = input_text.value.trim();

        if (input_value !== "") {
            const div = document.createElement("div");
            div.textContent = input_text.value;
            div.className = "textbox";
            list.appendChild(div);
            list.scrollTop = list.scrollHeight;
            reply(input_text.value);
            input_text.value = "";
        }
    });
}

const CHATGPT_API_KEY = 'API_KEY';
const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";

function reply(text) {
    async function getResponse() {
        try {
            const response = await axios.post(
                CHATGPT_API_URL,
                {
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        { "role": "user", "content": text }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${CHATGPT_API_KEY}`,
                    },
                }
            );
            const list = document.getElementsByClassName("body")[0];
            var chatgpt_response = response.data.choices[0].message.content;
            const div = document.createElement("div");
            div.textContent = chatgpt_response;
            div.className = "chatgpt_text";
            list.appendChild(div);
            list.scrollTop = list.scrollHeight;
        } catch (error) {
            console.log(error);
        }
    }

    getResponse();
}

