export const branchOption = [
    {
        value: 'Computer Science & Engineering',
        label: 'Computer Science & Engineering'
    },
    {
        value: 'Electrical & Electronics Engineering',
        label: ' Electrical & Electronics Engineering'
    },
    {
        value: 'Mechanical Engineering',
        label: 'Mechanical Engineering'
    },
    {
        value: 'Civil Engineering',
        label: 'Civil Engineering'
    },
    {
        value: 'Artificial Intelligence',
        label: 'Artificial Intelligence'
    },
    {
        value: 'Civil with Computer Applications',
        label: 'Civil with Computer Applications'
    },
]

export function generateAccessCode() {
    // Define the character set for alphanumeric code
    const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Initialize an empty string to store the generated code
    let code = "";

    // Generate 8 random characters from the character set
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset.charAt(randomIndex);
    }

    return code;
}