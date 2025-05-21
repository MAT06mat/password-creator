function testEmojisTime(text: string) {
    const emojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
    const date = new Date();
    const minutes = date.getMinutes();
    const m1 = Math.floor(minutes / 10);
    const m2 = minutes % 10;
    const minEmoji = emojis[m1] + emojis[m2];
    return text.includes(minEmoji);
}

export default testEmojisTime;
