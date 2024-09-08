import OpenAI from "openai";

const openai = new OpenAI({
    // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    apiKey: 'sk-None-om5DOrGXEa3ZrveflpnsT3BlbkFJTlt5xvPiX55aHPvxvDU8',
    dangerouslyAllowBrowser: true,
})


const getFinancialAdvice = async (totalBudget: number, totalIncome: number, totalSpent: number) => {
    try {
        const prompt = `Based on the following financial data below:
        - Total Budget: ${totalBudget}
        - Total Expenses: ${totalSpent}
        - Total Income: ${totalIncome}
        provide a financial advice in not more than 70 words to help the user manage thier finances effectively.`

        console.log(prompt)
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }]
        })

        const advice = response.choices[0].message.content
        return advice
    } catch (error) {
        return 'Sorry, I am not able to provide you an effective financial management advice right now, but, I will surely come back after a while.'
    }
}

export default getFinancialAdvice;