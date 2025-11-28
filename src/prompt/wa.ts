export const waTemplate = (data: any) => {
  return `Hi ${data.fullName} ✨  

Your personalized horoscope report—crafted exclusively from your birth details—is now ready.

Inside your full PDF report, you’ll find an in-depth analysis of your zodiac sign **${data.zodiacSign}**, along with detailed insights into your personality, relationships, career path, opportunities, challenges, lucky elements, and your upcoming astrological outlook. 🔮  

You can download your complete horoscope report here:  
${data.link}

Wishing you clarity, growth, and positive cosmic energy on your journey ahead. 🌟  
If you have any questions or would like deeper guidance, feel free to reach out anytime.
`;
};