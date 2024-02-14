import inquirer, { Answers, QuestionCollection } from 'inquirer';

const questions: QuestionCollection = [
    {
        name: "currency",
        type: "list",
        message: "Select your currency",
        choices: ["USD", "BHD", "SAR"]
    },
    {
        name: "amount",
        type: "number",
        message: "Enter your amount: ",
    }
];

const currencyRates: { [key: string]: number } = {
    "USD": 280,
    "BHD": 742,
    "SAR": 75
};

const getUserInput = async () => {
    try {
        const answers: Answers = await inquirer.prompt(questions);
        return answers;
    } catch (error) {
        console.error("Error occurred:", error);
        return null;
    }
};

getUserInput().then((answers: Answers | null) => {
    if (answers) {
        const { currency, amount } = answers;
        if (amount > 0) {
            const conversionRate = currencyRates[currency];
            if (conversionRate) {
                console.log(`Converted amount: ${amount * conversionRate}`);
            } else {
                console.log("Invalid currency selected");
            }
        } else {
            console.log("Please enter a positive amount");
        }
    } else {
        console.log("Failed to get user input");
    }
});
