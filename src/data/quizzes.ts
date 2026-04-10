import { Level } from './lessons';

export type QuestionType = 'multiple-choice' | 'reading' | 'cloze' | 'rewrite';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  section?: string; // Added section name
  passage?: string; // For reading/cloze
  options?: string[]; // For multiple-choice/reading/cloze
  correctAnswer: number | string; // Index for options, or string for rewrite
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  level: Level;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    id: 'q-full-mock-10',
    title: 'Đề thi thử vào 10 - Ma trận chuẩn (38 câu)',
    level: 'Thành thạo',
    questions: [
      // PHẦN 1: PHÁT ÂM (2 câu)
      {
        id: 'p1-1',
        type: 'multiple-choice',
        section: 'PHẦN 1: PHÁT ÂM',
        text: 'Choose the word whose underlined part is pronounced differently:',
        options: ['horse', 'health', 'hour', 'host'],
        correctAnswer: 2,
        explanation: 'Trong "hour", âm /h/ là âm câm, các từ còn lại phát âm là /h/.'
      },
      {
        id: 'p1-2',
        type: 'multiple-choice',
        section: 'PHẦN 1: PHÁT ÂM',
        text: 'Choose the word whose underlined part is pronounced differently:',
        options: ['river', 'writer', 'driver', 'climber'],
        correctAnswer: 3,
        explanation: 'Trong "climber", âm /b/ là âm câm, các từ còn lại phát âm âm /r/ cuối rõ.'
      },
      // PHẦN 2: TRỌNG ÂM (2 câu)
      {
        id: 'p2-1',
        type: 'multiple-choice',
        section: 'PHẦN 2: TRỌNG ÂM',
        text: 'Choose the word whose main stress is placed differently:',
        options: ['repeat', 'agree', 'decide', 'listen'],
        correctAnswer: 3,
        explanation: '"Listen" nhấn âm 1, các từ còn lại là động từ 2 âm tiết nhấn âm 2.'
      },
      {
        id: 'p2-2',
        type: 'multiple-choice',
        section: 'PHẦN 2: TRỌNG ÂM',
        text: 'Choose the word whose main stress is placed differently:',
        options: ['invention', 'tradition', 'attention', 'holiday'],
        correctAnswer: 3,
        explanation: '"Holiday" nhấn âm 1, các từ còn lại có đuôi -tion nhấn âm trước nó (âm 2).'
      },
      // PHẦN 3: NGỮ PHÁP & TỪ VỰNG (10 câu)
      {
        id: 'p3-1',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'She is the _______ student in my class.',
        options: ['tall', 'taller', 'tallest', 'more tall'],
        correctAnswer: 2,
        explanation: 'So sánh nhất với tính từ ngắn: the + adj-est.'
      },
      {
        id: 'p3-2',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'He is a _______ driver. He always drives carefully.',
        options: ['care', 'careful', 'carefully', 'careless'],
        correctAnswer: 1,
        explanation: 'Cần một tính từ đứng trước danh từ "driver". Dựa vào vế sau "carefully" nên chọn "careful".'
      },
      {
        id: 'p3-3',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'You like English, _______?',
        options: ['do you', 'don\'t you', 'are you', 'aren\'t you'],
        correctAnswer: 1,
        explanation: 'Câu hỏi đuôi: Vế trước khẳng định (like) dùng trợ động từ phủ định (don\'t).'
      },
      {
        id: 'p3-4',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'My father is _______ doctor.',
        options: ['a', 'an', 'the', 'x'],
        correctAnswer: 0,
        explanation: 'Dùng mạo từ "a" trước danh từ chỉ nghề nghiệp bắt đầu bằng phụ âm.'
      },
      {
        id: 'p3-5',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'I wish I _______ a bird.',
        options: ['am', 'was', 'were', 'be'],
        correctAnswer: 2,
        explanation: 'Câu ước loại 2 (trái thực tế hiện tại): dùng "were" cho tất cả các ngôi.'
      },
      {
        id: 'p3-6',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'We are going to have a party _______ Sunday.',
        options: ['in', 'on', 'at', 'to'],
        correctAnswer: 1,
        explanation: 'Dùng giới từ "on" trước các thứ trong tuần.'
      },
      {
        id: 'p3-7',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'I can\'t go out _______ it is raining heavily.',
        options: ['because', 'although', 'but', 'so'],
        correctAnswer: 0,
        explanation: 'Dùng "because" để chỉ nguyên nhân.'
      },
      {
        id: 'p3-8',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'I _______ this movie three times.',
        options: ['see', 'saw', 'have seen', 'am seeing'],
        correctAnswer: 2,
        explanation: 'Dùng thì Hiện tại hoàn thành để diễn tả trải nghiệm (three times).'
      },
      {
        id: 'p3-9',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'The house _______ in 1990.',
        options: ['built', 'was built', 'is built', 'has been built'],
        correctAnswer: 1,
        explanation: 'Câu bị động thì Quá khứ đơn (was/were + V3).'
      },
      {
        id: 'p3-10',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'He said that he _______ a student.',
        options: ['is', 'was', 'were', 'be'],
        correctAnswer: 1,
        explanation: 'Câu tường thuật: lùi thì từ "is" thành "was".'
      },
      // PHẦN 4: GIAO TIẾP (2 câu)
      {
        id: 'p4-1',
        type: 'multiple-choice',
        section: 'PHẦN 4: GIAO TIẾP',
        text: 'A: "How are you today?" - B: "_______"',
        options: ['I\'m 15', 'I\'m fine, thanks', 'I\'m a teacher', 'I\'m at home'],
        correctAnswer: 1,
        explanation: 'Câu trả lời cho câu hỏi thăm sức khỏe.'
      },
      {
        id: 'p4-2',
        type: 'multiple-choice',
        section: 'PHẦN 4: GIAO TIẾP',
        text: 'A: "Would you like some coffee?" - B: "_______"',
        options: ['Yes, please', 'No, I don\'t', 'Yes, I am', 'I like it'],
        correctAnswer: 0,
        explanation: 'Cách trả lời lịch sự cho lời mời.'
      },
      // PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ (4 câu)
      {
        id: 'p5-1',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'Environment is the (1)_______ around us. We should (2)_______ the environment by (3)_______ trees and (4)_______ waste.',
        text: 'Choose the word for (1):',
        options: ['world', 'space', 'place', 'nature'],
        correctAnswer: 0,
        explanation: 'Môi trường là thế giới xung quanh chúng ta.'
      },
      {
        id: 'p5-2',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'Environment is the (1)_______ around us. We should (2)_______ the environment by (3)_______ trees and (4)_______ waste.',
        text: 'Choose the word for (2):',
        options: ['protect', 'destroy', 'pollute', 'harm'],
        correctAnswer: 0,
        explanation: 'Chúng ta nên bảo vệ (protect) môi trường.'
      },
      {
        id: 'p5-3',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'Environment is the (1)_______ around us. We should (2)_______ the environment by (3)_______ trees and (4)_______ waste.',
        text: 'Choose the word for (3):',
        options: ['cutting', 'planting', 'burning', 'climbing'],
        correctAnswer: 1,
        explanation: 'Trồng cây (planting trees) giúp ích cho môi trường.'
      },
      {
        id: 'p5-4',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'Environment is the (1)_______ around us. We should (2)_______ the environment by (3)_______ trees and (4)_______ waste.',
        text: 'Choose the word for (4):',
        options: ['increasing', 'reducing', 'making', 'throwing'],
        correctAnswer: 1,
        explanation: 'Giảm thiểu (reducing) rác thải.'
      },
      // PHẦN 6: ĐỌC HIỂU - VĂN BẢN (4 câu)
      {
        id: 'p6-1',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'Cyberbullying is a growing problem among teenagers. It involves using digital devices to send or post harmful content about others. Unlike traditional bullying, it can happen anywhere and at any time. Victims of cyberbullying often feel isolated and depressed. It is important for parents and teachers to educate young people about the responsible use of technology.',
        text: 'What is cyberbullying?',
        options: ['Bullying in person', 'Bullying using digital devices', 'A type of school sport', 'A way to make friends'],
        correctAnswer: 1,
        explanation: 'Văn bản nêu rõ cyberbullying liên quan đến việc sử dụng thiết bị kỹ thuật số.'
      },
      {
        id: 'p6-2',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'Cyberbullying is a growing problem among teenagers. It involves using digital devices to send or post harmful content about others. Unlike traditional bullying, it can happen anywhere and at any time. Victims of cyberbullying often feel isolated and depressed. It is important for parents and teachers to educate young people about the responsible use of technology.',
        text: 'How is cyberbullying different from traditional bullying?',
        options: ['It is less serious', 'It only happens at school', 'It can happen anywhere and anytime', 'It is easier to stop'],
        correctAnswer: 2,
        explanation: 'Văn bản ghi "it can happen anywhere and at any time".'
      },
      {
        id: 'p6-3',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'Cyberbullying is a growing problem among teenagers. It involves using digital devices to send or post harmful content about others. Unlike traditional bullying, it can happen anywhere and at any time. Victims of cyberbullying often feel isolated and depressed. It is important for parents and teachers to educate young people about the responsible use of technology.',
        text: 'How do victims of cyberbullying often feel?',
        options: ['Happy and excited', 'Isolated and depressed', 'Strong and confident', 'Bored and tired'],
        correctAnswer: 1,
        explanation: 'Văn bản ghi "Victims... often feel isolated and depressed".'
      },
      {
        id: 'p6-4',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'Cyberbullying is a growing problem among teenagers. It involves using digital devices to send or post harmful content about others. Unlike traditional bullying, it can happen anywhere and at any time. Victims of cyberbullying often feel isolated and depressed. It is important for parents and teachers to educate young people about the responsible use of technology.',
        text: 'Who should educate young people about technology use?',
        options: ['Only students', 'Only parents', 'Parents and teachers', 'Nobody'],
        correctAnswer: 2,
        explanation: 'Văn bản ghi "important for parents and teachers to educate...".'
      },
      // PHẦN 7: TÌM LỖI SAI (2 câu)
      {
        id: 'p7-1',
        type: 'multiple-choice',
        section: 'PHẦN 7: TÌM LỖI SAI',
        text: 'Find the error: "He is enough tall to reach the shelf."',
        options: ['is', 'enough tall', 'to reach', 'the shelf'],
        correctAnswer: 1,
        explanation: 'Cấu trúc đúng: tall enough.'
      },
      {
        id: 'p7-2',
        type: 'multiple-choice',
        section: 'PHẦN 7: TÌM LỖI SAI',
        text: 'Find the error: "If I was you, I would study harder."',
        options: ['If', 'was', 'would', 'harder'],
        correctAnswer: 1,
        explanation: 'Trong câu điều kiện loại 2, dùng "were" cho tất cả các ngôi.'
      },
      // PHẦN 8: VIẾT LẠI CÂU (4 câu)
      {
        id: 'p8-1',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "They built this bridge in 2000." (Start with "This bridge")',
        correctAnswer: 'This bridge was built in 2000',
        explanation: 'Chuyển sang câu bị động.'
      },
      {
        id: 'p8-2',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "I don\'t have a car." (Start with "I wish")',
        correctAnswer: 'I wish I had a car',
        explanation: 'Câu ước loại 2.'
      },
      {
        id: 'p8-3',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "It is easy to learn English." (Start with "Learning English")',
        correctAnswer: 'Learning English is easy',
        explanation: 'Chuyển đổi giữa cấu trúc giả định và danh động từ.'
      },
      {
        id: 'p8-4',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "She said: \'I am a student\'." (Start with "She said")',
        correctAnswer: 'She said she was a student',
        explanation: 'Câu tường thuật.'
      },
      // PHẦN 9: GHÉP CÂU (4 câu)
      {
        id: 'p9-1',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "If he doesn\'t study, he will fail." (Use "Unless")',
        correctAnswer: 'Unless he studies, he will fail',
        explanation: 'Unless = If not.'
      },
      {
        id: 'p9-2',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "The man is my uncle. He is wearing a red hat." (Use "Who")',
        correctAnswer: 'The man who is wearing a red hat is my uncle',
        explanation: 'Mệnh đề quan hệ với "Who".'
      },
      {
        id: 'p9-3',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "The weather was very bad. We couldn\'t go out." (Use "So... that")',
        correctAnswer: 'The weather was so bad that we couldn\'t go out',
        explanation: 'Cấu trúc So... that.'
      },
      {
        id: 'p9-4',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "This is the house. I was born there." (Use "Where")',
        correctAnswer: 'This is the house where I was born',
        explanation: 'Mệnh đề quan hệ chỉ nơi chốn.'
      },
      // THÊM 4 CÂU ĐỂ ĐỦ 38 CÂU (NHƯ YÊU CẦU: 34 + 2 + 2)
      {
        id: 'p10-1',
        type: 'multiple-choice',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'She suggested _______ to the cinema.',
        options: ['go', 'to go', 'going', 'goes'],
        correctAnswer: 2,
        explanation: 'Suggest + V-ing.'
      },
      {
        id: 'p10-2',
        type: 'multiple-choice',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'The boy _______ is sitting next to me is very intelligent.',
        options: ['who', 'whom', 'which', 'whose'],
        correctAnswer: 0,
        explanation: 'Dùng "who" làm chủ ngữ thay thế cho người.'
      },
      {
        id: 'p10-3',
        type: 'rewrite',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'Rewrite: "He is too young to drive." (Use "enough")',
        correctAnswer: 'He is not old enough to drive',
        explanation: 'Chuyển đổi giữa too... to và enough.'
      },
      {
        id: 'p10-4',
        type: 'rewrite',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'Combine: "She is very tired. She can\'t finish the work." (Use "Too... to")',
        correctAnswer: 'She is too tired to finish the work',
        explanation: 'Cấu trúc Too... to.'
      }
    ]
  },
  {
    id: 'q-tap-su-full',
    title: 'Đề thi thử (Tập sự) - Ma trận 38 câu cơ bản (A1/A2)',
    level: 'Tập sự',
    questions: [
      // PHẦN 1: PHÁT ÂM (2 câu)
      {
        id: 'ts-p1-1',
        type: 'multiple-choice',
        section: 'PHẦN 1: PHÁT ÂM',
        text: 'Choose the word whose underlined part is pronounced differently:',
        options: ['cat', 'bag', 'cake', 'hat'],
        correctAnswer: 2,
        explanation: 'Trong "cake", âm "a" phát âm là /eɪ/, các từ còn lại phát âm là /æ/.'
      },
      {
        id: 'ts-p1-2',
        type: 'multiple-choice',
        section: 'PHẦN 1: PHÁT ÂM',
        text: 'Choose the word whose underlined part is pronounced differently:',
        options: ['books', 'pens', 'cats', 'hats'],
        correctAnswer: 1,
        explanation: 'Trong "pens", đuôi "s" phát âm là /z/, các từ còn lại phát âm là /s/.'
      },
      // PHẦN 2: TRỌNG ÂM (2 câu)
      {
        id: 'ts-p2-1',
        type: 'multiple-choice',
        section: 'PHẦN 2: TRỌNG ÂM',
        text: 'Choose the word whose main stress is placed differently:',
        options: ['teacher', 'doctor', 'student', 'advice'],
        correctAnswer: 3,
        explanation: '"Advice" nhấn âm 2, các từ còn lại nhấn âm 1.'
      },
      {
        id: 'ts-p2-2',
        type: 'multiple-choice',
        section: 'PHẦN 2: TRỌNG ÂM',
        text: 'Choose the word whose main stress is placed differently:',
        options: ['happy', 'lucky', 'alone', 'pretty'],
        correctAnswer: 2,
        explanation: '"Alone" nhấn âm 2, các từ còn lại nhấn âm 1.'
      },
      // PHẦN 3: NGỮ PHÁP & TỪ VỰNG (10 câu)
      {
        id: 'ts-p3-1',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'I _______ to school every day.',
        options: ['go', 'goes', 'going', 'is go'],
        correctAnswer: 0,
        explanation: 'Thì Hiện tại đơn với chủ ngữ "I".'
      },
      {
        id: 'ts-p3-2',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'She _______ a beautiful girl.',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 0,
        explanation: 'Động từ to-be đi với "She".'
      },
      {
        id: 'ts-p3-3',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'There _______ many books on the table.',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 1,
        explanation: 'Dùng "are" với danh từ số nhiều "many books".'
      },
      {
        id: 'ts-p3-4',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'This is _______ apple.',
        options: ['a', 'an', 'the', 'x'],
        correctAnswer: 1,
        explanation: 'Dùng "an" trước danh từ bắt đầu bằng nguyên âm.'
      },
      {
        id: 'ts-p3-5',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'He _______ like apples.',
        options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'],
        correctAnswer: 1,
        explanation: 'Phủ định thì Hiện tại đơn với chủ ngữ "He".'
      },
      {
        id: 'ts-p3-6',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'What is _______ name?',
        options: ['you', 'your', 'yours', 'you\'re'],
        correctAnswer: 1,
        explanation: 'Tính từ sở hữu "your".'
      },
      {
        id: 'ts-p3-7',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'I have _______ orange.',
        options: ['a', 'an', 'the', 'x'],
        correctAnswer: 1,
        explanation: 'Dùng "an" trước nguyên âm.'
      },
      {
        id: 'ts-p3-8',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'How _______ are you?',
        options: ['old', 'tall', 'big', 'long'],
        correctAnswer: 0,
        explanation: 'Hỏi tuổi: How old are you?'
      },
      {
        id: 'ts-p3-9',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'My brother _______ football now.',
        options: ['play', 'plays', 'is playing', 'are playing'],
        correctAnswer: 2,
        explanation: 'Thì Hiện tại tiếp diễn (now).'
      },
      {
        id: 'ts-p3-10',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'We _______ students.',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 1,
        explanation: 'Động từ to-be đi với "We".'
      },
      // PHẦN 4: GIAO TIẾP (2 câu)
      {
        id: 'ts-p4-1',
        type: 'multiple-choice',
        section: 'PHẦN 4: GIAO TIẾP',
        text: 'A: "Hello!" - B: "_______"',
        options: ['Goodbye', 'Hi', 'Thank you', 'Sorry'],
        correctAnswer: 1,
        explanation: 'Chào hỏi cơ bản.'
      },
      {
        id: 'ts-p4-2',
        type: 'multiple-choice',
        section: 'PHẦN 4: GIAO TIẾP',
        text: 'A: "Thank you!" - B: "_______"',
        options: ['You\'re welcome', 'No', 'Yes', 'I\'m fine'],
        correctAnswer: 0,
        explanation: 'Đáp lại lời cảm ơn.'
      },
      // PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ (4 câu)
      {
        id: 'ts-p5-1',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'My name (1)_______ Nam. I am (2)_______ student. I live (3)_______ Hanoi. I like (4)_______ English.',
        text: 'Choose the word for (1):',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 0,
        explanation: 'Động từ to-be cho chủ ngữ số ít.'
      },
      {
        id: 'ts-p5-2',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'My name (1)_______ Nam. I am (2)_______ student. I live (3)_______ Hanoi. I like (4)_______ English.',
        text: 'Choose the word for (2):',
        options: ['a', 'an', 'the', 'x'],
        correctAnswer: 0,
        explanation: 'Mạo từ "a" trước danh từ số ít.'
      },
      {
        id: 'ts-p5-3',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'My name (1)_______ Nam. I am (2)_______ student. I live (3)_______ Hanoi. I like (4)_______ English.',
        text: 'Choose the word for (3):',
        options: ['in', 'on', 'at', 'to'],
        correctAnswer: 0,
        explanation: 'Giới từ "in" trước tên thành phố.'
      },
      {
        id: 'ts-p5-4',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'My name (1)_______ Nam. I am (2)_______ student. I live (3)_______ Hanoi. I like (4)_______ English.',
        text: 'Choose the word for (4):',
        options: ['learn', 'learning', 'to learn', 'both B and C'],
        correctAnswer: 3,
        explanation: 'Like + V-ing hoặc Like + to-V.'
      },
      // PHẦN 6: ĐỌC HIỂU - VĂN BẢN (4 câu)
      {
        id: 'ts-p6-1',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'This is my family. There are four people in my family: my father, my mother, my sister, and me. My father is a doctor. My mother is a teacher. We live in a small house.',
        text: 'How many people are there in the family?',
        options: ['Three', 'Four', 'Five', 'Six'],
        correctAnswer: 1,
        explanation: 'Văn bản ghi "There are four people".'
      },
      {
        id: 'ts-p6-2',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'This is my family. There are four people in my family: my father, my mother, my sister, and me. My father is a doctor. My mother is a teacher. We live in a small house.',
        text: 'What is the father\'s job?',
        options: ['Teacher', 'Doctor', 'Nurse', 'Student'],
        correctAnswer: 1,
        explanation: 'Văn bản ghi "My father is a doctor".'
      },
      {
        id: 'ts-p6-3',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'This is my family. There are four people in my family: my father, my mother, my sister, and me. My father is a doctor. My mother is a teacher. We live in a small house.',
        text: 'What is the mother\'s job?',
        options: ['Teacher', 'Doctor', 'Nurse', 'Student'],
        correctAnswer: 0,
        explanation: 'Văn bản ghi "My mother is a teacher".'
      },
      {
        id: 'ts-p6-4',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'This is my family. There are four people in my family: my father, my mother, my sister, and me. My father is a doctor. My mother is a teacher. We live in a small house.',
        text: 'Where do they live?',
        options: ['In a big house', 'In a small house', 'In a flat', 'In a city'],
        correctAnswer: 1,
        explanation: 'Văn bản ghi "We live in a small house".'
      },
      // PHẦN 7: TÌM LỖI SAI (2 câu)
      {
        id: 'ts-p7-1',
        type: 'multiple-choice',
        section: 'PHẦN 7: TÌM LỖI SAI',
        text: 'Find the error: "He go to school by bus."',
        options: ['He', 'go', 'to school', 'by bus'],
        correctAnswer: 1,
        explanation: 'Chủ ngữ "He" động từ phải chia là "goes".'
      },
      {
        id: 'ts-p7-2',
        type: 'multiple-choice',
        section: 'PHẦN 7: TÌM LỖI SAI',
        text: 'Find the error: "There is two cats on the bed."',
        options: ['There', 'is', 'two cats', 'on the bed'],
        correctAnswer: 1,
        explanation: 'Danh từ số nhiều "two cats" dùng "are".'
      },
      // PHẦN 8: VIẾT LẠI CÂU (4 câu)
      {
        id: 'ts-p8-1',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "My name is Lan." (Start with "I am")',
        correctAnswer: 'I am Lan',
        explanation: 'Cách giới thiệu tên tương đương.'
      },
      {
        id: 'ts-p8-2',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "The book is on the table." (Start with "There is")',
        correctAnswer: 'There is a book on the table',
        explanation: 'Sử dụng cấu trúc There is/are.'
      },
      {
        id: 'ts-p8-3',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "I like English." (Start with "English is")',
        correctAnswer: 'English is my favorite subject',
        explanation: 'Cách diễn đạt sở thích tương đương.'
      },
      {
        id: 'ts-p8-4',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "He is a good student." (Start with "He studies")',
        correctAnswer: 'He studies well',
        explanation: 'Chuyển đổi giữa tính từ và trạng từ.'
      },
      // PHẦN 9: GHÉP CÂU (4 câu)
      {
        id: 'ts-p9-1',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "I am tall. My brother is short." (Use "but")',
        correctAnswer: 'I am tall but my brother is short',
        explanation: 'Dùng "but" để nối hai vế đối lập.'
      },
      {
        id: 'ts-p9-2',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "He is hungry. He wants to eat." (Use "so")',
        correctAnswer: 'He is hungry so he wants to eat',
        explanation: 'Dùng "so" để chỉ kết quả.'
      },
      {
        id: 'ts-p9-3',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "I like cats. I like dogs." (Use "and")',
        correctAnswer: 'I like cats and dogs',
        explanation: 'Dùng "and" để nối hai đối tượng.'
      },
      {
        id: 'ts-p9-4',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "She is tired. She goes to bed." (Use "because")',
        correctAnswer: 'She goes to bed because she is tired',
        explanation: 'Dùng "because" chỉ nguyên nhân.'
      },
      // PHẦN 10: VẬN DỤNG THÊM (4 câu)
      {
        id: 'ts-p10-1',
        type: 'multiple-choice',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'How _______ is this pen?',
        options: ['much', 'many', 'old', 'long'],
        correctAnswer: 0,
        explanation: 'Hỏi giá tiền: How much...?'
      },
      {
        id: 'ts-p10-2',
        type: 'multiple-choice',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'I _______ a new bike.',
        options: ['have', 'has', 'is', 'am'],
        correctAnswer: 0,
        explanation: 'Chủ ngữ "I" dùng "have".'
      },
      {
        id: 'ts-p10-3',
        type: 'rewrite',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'Rewrite: "She is 10 years old." (Start with "Her age")',
        correctAnswer: 'Her age is 10',
        explanation: 'Cách diễn đạt tuổi khác.'
      },
      {
        id: 'ts-p10-4',
        type: 'rewrite',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'Combine: "It is cold. I wear a coat." (Use "so")',
        correctAnswer: 'It is cold so I wear a coat',
        explanation: 'Dùng "so" chỉ kết quả.'
      }
    ]
  },
  {
    id: 'q-tien-si-full',
    title: 'Đề thi thử (Tiến sĩ) - Ma trận 38 câu nâng cao (C1/C2)',
    level: 'Tiến sĩ',
    questions: [
      // PHẦN 1: PHÁT ÂM (2 câu)
      {
        id: 'ti-p1-1',
        type: 'multiple-choice',
        section: 'PHẦN 1: PHÁT ÂM',
        text: 'Choose the word whose underlined part is pronounced differently:',
        options: ['choreography', 'christianity', 'archipelago', 'cherish'],
        correctAnswer: 3,
        explanation: 'Trong "cherish", âm "ch" phát âm là /tʃ/, các từ còn lại phát âm là /k/.'
      },
      {
        id: 'ti-p1-2',
        type: 'multiple-choice',
        section: 'PHẦN 1: PHÁT ÂM',
        text: 'Choose the word whose underlined part is pronounced differently:',
        options: ['exhibit', 'exhaust', 'exhale', 'exhilarate'],
        correctAnswer: 2,
        explanation: 'Trong "exhale", âm /h/ được phát âm rõ, các từ còn lại âm /h/ là âm câm.'
      },
      // PHẦN 2: TRỌNG ÂM (2 câu)
      {
        id: 'ti-p2-1',
        type: 'multiple-choice',
        section: 'PHẦN 2: TRỌNG ÂM',
        text: 'Choose the word whose main stress is placed differently:',
        options: ['scientific', 'economic', 'academic', 'responsibility'],
        correctAnswer: 3,
        explanation: '"Responsibility" nhấn âm 4, các từ còn lại nhấn âm 3.'
      },
      {
        id: 'ti-p2-2',
        type: 'multiple-choice',
        section: 'PHẦN 2: TRỌNG ÂM',
        text: 'Choose the word whose main stress is placed differently:',
        options: ['mischievous', 'inventory', 'comparable', 'anecdotal'],
        correctAnswer: 3,
        explanation: '"Anecdotal" nhấn âm 3, các từ còn lại nhấn âm 1.'
      },
      // PHẦN 3: NGỮ PHÁP & TỪ VỰNG (10 câu)
      {
        id: 'ti-p3-1',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'The committee suggested that the proposal _______ further before a final decision is made.',
        options: ['is examined', 'be examined', 'must be examined', 'examines'],
        correctAnswer: 1,
        explanation: 'Cấu trúc giả định (Subjunctive) sau động từ "suggest".'
      },
      {
        id: 'ti-p3-2',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'Not only _______ the exam with flying colors, but he also won a full scholarship.',
        options: ['did he pass', 'he passed', 'has he passed', 'he had passed'],
        correctAnswer: 0,
        explanation: 'Đảo ngữ với "Not only" đứng đầu câu.'
      },
      {
        id: 'ti-p3-3',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'The company is on the _______ of bankruptcy due to the economic downturn.',
        options: ['edge', 'verge', 'rim', 'border'],
        correctAnswer: 1,
        explanation: 'Cụm từ "on the verge of" (trên bờ vực).'
      },
      {
        id: 'ti-p3-4',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'Had I known about the traffic jam, I _______ a different route.',
        options: ['would take', 'will take', 'would have taken', 'took'],
        correctAnswer: 2,
        explanation: 'Đảo ngữ câu điều kiện loại 3.'
      },
      {
        id: 'ti-p3-5',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'The new policy has met with _______ opposition from the local community.',
        options: ['fierce', 'heavy', 'strong', 'deep'],
        correctAnswer: 0,
        explanation: 'Collocation: "fierce opposition" (sự phản đối quyết liệt).'
      },
      {
        id: 'ti-p3-6',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'It is _______ recommended that you back up your data regularly.',
        options: ['highly', 'deeply', 'strongly', 'widely'],
        correctAnswer: 0,
        explanation: 'Collocation: "highly recommended".'
      },
      {
        id: 'ti-p3-7',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'The government is trying to _______ the gap between the rich and the poor.',
        options: ['bridge', 'close', 'narrow', 'fill'],
        correctAnswer: 0,
        explanation: 'Collocation: "bridge the gap" (thu hẹp khoảng cách).'
      },
      {
        id: 'ti-p3-8',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'He was _______ with envy when he saw his friend\'s new car.',
        options: ['green', 'red', 'yellow', 'blue'],
        correctAnswer: 0,
        explanation: 'Idiom: "green with envy" (ghen tị phát điên).'
      },
      {
        id: 'ti-p3-9',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'The project was abandoned _______ lack of funding.',
        options: ['due to', 'owing to', 'because of', 'for'],
        correctAnswer: 3,
        explanation: 'Trong ngữ cảnh trang trọng, "for lack of" là cụm từ phổ biến.'
      },
      {
        id: 'ti-p3-10',
        type: 'multiple-choice',
        section: 'PHẦN 3: NGỮ PHÁP & TỪ VỰNG',
        text: 'No sooner _______ home than the phone rang.',
        options: ['had I arrived', 'I had arrived', 'did I arrive', 'I arrived'],
        correctAnswer: 0,
        explanation: 'Đảo ngữ với "No sooner... than".'
      },
      // PHẦN 4: GIAO TIẾP (2 câu)
      {
        id: 'ti-p4-1',
        type: 'multiple-choice',
        section: 'PHẦN 4: GIAO TIẾP',
        text: 'A: "I\'m afraid I can\'t make it to your party." - B: "_______"',
        options: ['What a pity!', 'Don\'t mention it.', 'Never mind.', 'That\'s a good idea.'],
        correctAnswer: 0,
        explanation: 'Cách bày tỏ sự tiếc nuối khi ai đó không thể tham dự.'
      },
      {
        id: 'ti-p4-2',
        type: 'multiple-choice',
        section: 'PHẦN 4: GIAO TIẾP',
        text: 'A: "Could you lend me a hand with this?" - B: "_______"',
        options: ['No problem.', 'I\'m sorry, I can\'t.', 'With pleasure.', 'All of the above.'],
        correctAnswer: 3,
        explanation: 'Tất cả các đáp án đều là cách phản hồi phù hợp tùy vào khả năng giúp đỡ.'
      },
      // PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ (4 câu)
      {
        id: 'ti-p5-1',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'The (1)_______ of artificial intelligence has revolutionized many industries. (2)_______ its benefits, there are concerns about its ethical implications. (3)_______, the potential for job displacement is a major worry. (4)_______, AI continues to evolve at an unprecedented pace.',
        text: 'Choose the word for (1):',
        options: ['advent', 'arrival', 'beginning', 'start'],
        correctAnswer: 0,
        explanation: '"Advent" thường dùng cho sự ra đời của một công nghệ quan trọng.'
      },
      {
        id: 'ti-p5-2',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'The (1)_______ of artificial intelligence has revolutionized many industries. (2)_______ its benefits, there are concerns about its ethical implications. (3)_______, the potential for job displacement is a major worry. (4)_______, AI continues to evolve at an unprecedented pace.',
        text: 'Choose the word for (2):',
        options: ['Despite', 'Although', 'Even though', 'In spite'],
        correctAnswer: 0,
        explanation: '"Despite" đi với cụm danh từ.'
      },
      {
        id: 'ti-p5-3',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'The (1)_______ of artificial intelligence has revolutionized many industries. (2)_______ its benefits, there are concerns about its ethical implications. (3)_______, the potential for job displacement is a major worry. (4)_______, AI continues to evolve at an unprecedented pace.',
        text: 'Choose the word for (3):',
        options: ['Specifically', 'However', 'Moreover', 'Therefore'],
        correctAnswer: 0,
        explanation: '"Specifically" dùng để đưa ra ví dụ cụ thể cho lo ngại đạo đức.'
      },
      {
        id: 'ti-p5-4',
        type: 'cloze',
        section: 'PHẦN 5: ĐỌC HIỂU - ĐIỀN TỪ',
        passage: 'The (1)_______ of artificial intelligence has revolutionized many industries. (2)_______ its benefits, there are concerns about its ethical implications. (3)_______, the potential for job displacement is a major worry. (4)_______, AI continues to evolve at an unprecedented pace.',
        text: 'Choose the word for (4):',
        options: ['Nevertheless', 'Consequently', 'Furthermore', 'Thus'],
        correctAnswer: 0,
        explanation: '"Nevertheless" (Tuy nhiên) dùng để chuyển ý sang sự phát triển không ngừng.'
      },
      // PHẦN 6: ĐỌC HIỂU - VĂN BẢN (4 câu)
      {
        id: 'ti-p6-1',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'The concept of sustainable development has gained significant traction in recent years. It emphasizes the need to meet current needs without compromising the ability of future generations to meet theirs. This requires a balanced approach that integrates economic growth, social inclusion, and environmental protection. However, achieving this balance is fraught with challenges, including political resistance and economic disparities.',
        text: 'What is the core principle of sustainable development?',
        options: ['Economic growth at all costs', 'Meeting current needs only', 'Balancing present and future needs', 'Environmental protection above all'],
        correctAnswer: 2,
        explanation: 'Văn bản nêu rõ sự cân bằng giữa nhu cầu hiện tại và tương lai.'
      },
      {
        id: 'ti-p6-2',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'The concept of sustainable development has gained significant traction in recent years. It emphasizes the need to meet current needs without compromising the ability of future generations to meet theirs. This requires a balanced approach that integrates economic growth, social inclusion, and environmental protection. However, achieving this balance is fraught with challenges, including political resistance and economic disparities.',
        text: 'Which three pillars are integrated in sustainable development?',
        options: ['Politics, economy, society', 'Economy, society, environment', 'Growth, inclusion, protection', 'Resistance, disparity, balance'],
        correctAnswer: 1,
        explanation: 'Văn bản liệt kê: economic growth, social inclusion, and environmental protection.'
      },
      {
        id: 'ti-p6-3',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'The concept of sustainable development has gained significant traction in recent years. It emphasizes the need to meet current needs without compromising the ability of future generations to meet theirs. This requires a balanced approach that integrates economic growth, social inclusion, and environmental protection. However, achieving this balance is fraught with challenges, including political resistance and economic disparities.',
        text: 'What does "fraught with" mean in this context?',
        options: ['Full of', 'Empty of', 'Free from', 'Lacking in'],
        correctAnswer: 0,
        explanation: '"Fraught with" nghĩa là đầy rẫy (thường là điều tiêu cực).'
      },
      {
        id: 'ti-p6-4',
        type: 'reading',
        section: 'PHẦN 6: ĐỌC HIỂU - VĂN BẢN',
        passage: 'The concept of sustainable development has gained significant traction in recent years. It emphasizes the need to meet current needs without compromising the ability of future generations to meet theirs. This requires a balanced approach that integrates economic growth, social inclusion, and environmental protection. However, achieving this balance is fraught with challenges, including political resistance and economic disparities.',
        text: 'What are some challenges to sustainable development?',
        options: ['Technological advancements', 'Political resistance and economic disparities', 'Social inclusion', 'Environmental protection'],
        correctAnswer: 1,
        explanation: 'Văn bản liệt kê các thách thức ở câu cuối.'
      },
      // PHẦN 7: TÌM LỖI SAI (2 câu)
      {
        id: 'ti-p7-1',
        type: 'multiple-choice',
        section: 'PHẦN 7: TÌM LỖI SAI',
        text: 'Find the error: "Despite of the heavy rain, they decided to go for a hike."',
        options: ['Despite of', 'heavy rain', 'decided', 'to go'],
        correctAnswer: 0,
        explanation: 'Dùng "Despite" hoặc "In spite of", không dùng "Despite of".'
      },
      {
        id: 'ti-p7-2',
        type: 'multiple-choice',
        section: 'PHẦN 7: TÌM LỖI SAI',
        text: 'Find the error: "The reason why he failed was because he didn\'t study hard enough."',
        options: ['The reason why', 'failed', 'was because', 'hard enough'],
        correctAnswer: 2,
        explanation: 'Cấu trúc "The reason... was that" chuẩn hơn "was because".'
      },
      // PHẦN 8: VIẾT LẠI CÂU (4 câu)
      {
        id: 'ti-p8-1',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "I only realized my mistake when I got home." (Start with "Not until")',
        correctAnswer: 'Not until I got home did I realize my mistake',
        explanation: 'Đảo ngữ với Not until.'
      },
      {
        id: 'ti-p8-2',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "It is said that he is a genius." (Start with "He is said")',
        correctAnswer: 'He is said to be a genius',
        explanation: 'Cấu trúc bị động với động từ chỉ ý kiến.'
      },
      {
        id: 'ti-p8-3',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "If you don\'t tell me the truth, I won\'t help you." (Start with "Unless")',
        correctAnswer: 'Unless you tell me the truth, I won\'t help you',
        explanation: 'Unless = If not.'
      },
      {
        id: 'ti-p8-4',
        type: 'rewrite',
        section: 'PHẦN 8: VIẾT LẠI CÂU',
        text: 'Rewrite: "The cake was so delicious that I ate three pieces." (Start with "Such")',
        correctAnswer: 'Such was the deliciousness of the cake that I ate three pieces',
        explanation: 'Đảo ngữ với Such... that.'
      },
      // PHẦN 9: GHÉP CÂU (4 câu)
      {
        id: 'ti-p9-1',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "He was very tired. He couldn\'t sleep." (Use "However")',
        correctAnswer: 'However tired he was, he couldn\'t sleep',
        explanation: 'Đảo ngữ với However + adj.'
      },
      {
        id: 'ti-p9-2',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "I didn\'t have enough money. I didn\'t buy the book." (Use "If")',
        correctAnswer: 'If I had had enough money, I would have bought the book',
        explanation: 'Câu điều kiện loại 3.'
      },
      {
        id: 'ti-p9-3',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "The man is a famous doctor. You met him yesterday." (Use "Whom")',
        correctAnswer: 'The man whom you met yesterday is a famous doctor',
        explanation: 'Mệnh đề quan hệ với "Whom".'
      },
      {
        id: 'ti-p9-4',
        type: 'rewrite',
        section: 'PHẦN 9: GHÉP CÂU',
        text: 'Combine: "She was very busy. She still helped me." (Use "Despite")',
        correctAnswer: 'Despite being very busy, she still helped me',
        explanation: 'Cấu trúc Despite + V-ing.'
      },
      // PHẦN 10: VẬN DỤNG THÊM (4 câu)
      {
        id: 'ti-p10-1',
        type: 'multiple-choice',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'I\'d rather you _______ me the truth.',
        options: ['tell', 'told', 'to tell', 'telling'],
        correctAnswer: 1,
        explanation: 'Cấu trúc "would rather someone did something" (giả định hiện tại).'
      },
      {
        id: 'ti-p10-2',
        type: 'multiple-choice',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'It\'s high time we _______ something about this problem.',
        options: ['do', 'did', 'to do', 'doing'],
        correctAnswer: 1,
        explanation: 'Cấu trúc "It\'s high time + S + V2".'
      },
      {
        id: 'ti-p10-3',
        type: 'rewrite',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'Rewrite: "I regret not studying harder." (Start with "I wish")',
        correctAnswer: 'I wish I had studied harder',
        explanation: 'Câu ước loại 3 (hối tiếc quá khứ).'
      },
      {
        id: 'ti-p10-4',
        type: 'rewrite',
        section: 'PHẦN 10: VẬN DỤNG THÊM',
        text: 'Combine: "He is a very good student. He is also a talented musician." (Use "Not only")',
        correctAnswer: 'Not only is he a very good student, but he is also a talented musician',
        explanation: 'Đảo ngữ với Not only.'
      }
    ]
  }
];
