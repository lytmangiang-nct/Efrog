export type Level = 'Tập sự' | 'Thành thạo' | 'Tiến sĩ';

export interface Lesson {
  id: string;
  title: string;
  category: 'Grammar' | 'Vocabulary';
  content: string;
  details: string[]; // Detailed points
  examples: { en: string; vi: string }[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  level: Level;
}

export const lessons: Lesson[] = [
  // --- TẬP SỰ (Cơ bản) ---
  {
    id: 'gs-1',
    title: 'Thì Hiện tại đơn (Present Simple)',
    category: 'Grammar',
    content: 'Dùng để diễn tả thói quen, sự thật hiển nhiên hoặc lịch trình cố định.',
    details: [
      'Khẳng định: S + V(s/es). (I/You/We/They + V; He/She/It + V-s/es).',
      'Phủ định: S + do/does + not + V-inf. (I/You/We/They + do not; He/She/It + does not).',
      'Nghi vấn: Do/Does + S + V-inf?',
      'Cách thêm s/es: Thêm "es" sau các động từ tận cùng là o, s, x, ch, sh (ví dụ: go -> goes, watch -> watches).',
      'Dấu hiệu: always, usually, often, sometimes, every day/week/month.'
    ],
    examples: [
      { en: 'The sun rises in the East.', vi: 'Mặt trời mọc ở hướng Đông (Sự thật hiển nhiên).' },
      { en: 'I usually get up at 6 AM.', vi: 'Tôi thường thức dậy lúc 6 giờ sáng (Thói quen).' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'gs-pronouns',
    title: 'Đại từ nhân xưng & Tính từ sở hữu',
    category: 'Grammar',
    content: 'Nền tảng để xây dựng câu trong tiếng Anh.',
    details: [
      'Đại từ chủ ngữ: I, You, We, They, He, She, It.',
      'Đại từ tân ngữ: me, you, us, them, him, her, it.',
      'Tính từ sở hữu: my, your, our, their, his, her, its (đứng trước danh từ).',
      'Đại từ sở hữu: mine, yours, ours, theirs, his, hers, its (đứng một mình).'
    ],
    examples: [
      { en: 'This is my book.', vi: 'Đây là cuốn sách của tôi (Tính từ sở hữu).' },
      { en: 'This book is mine.', vi: 'Cuốn sách này là của tôi (Đại từ sở hữu).' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'vs-school',
    title: 'Từ vựng: Trường học (School)',
    category: 'Vocabulary',
    content: 'Các từ vựng phổ biến về dụng cụ học tập và môn học.',
    details: [
      'Schoolbag: Cặp sách',
      'Uniform: Đồng phục',
      'Textbook: Sách giáo khoa',
      'Calculator: Máy tính cầm tay',
      'Subject: Môn học (Math, English, History, Physics, Chemistry, Biology...)',
      'Principal: Hiệu trưởng',
      'Classmate: Bạn cùng lớp'
    ],
    examples: [
      { en: 'I have a new schoolbag.', vi: 'Tôi có một chiếc cặp sách mới.' },
      { en: 'Math is my favorite subject.', vi: 'Toán là môn học yêu thích của tôi.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'gs-pron',
    title: 'Phát âm & Trọng âm cơ bản',
    category: 'Grammar',
    content: 'Quy tắc phát âm đuôi -er và trọng âm từ 2 âm tiết.',
    details: [
      'Âm /h/: Thường đọc là /h/ (horse, house, host). Một số từ âm /h/ câm (hour, honest, honor).',
      'Đuôi -er/-or: Thường đọc là âm /ə/ nhẹ (river, writer, doctor, teacher).',
      'Trọng âm động từ 2 âm tiết: Thường nhấn âm 2 (rePEAT, deCIDE, aGREE).',
      'Trọng âm danh từ 2 âm tiết: Thường nhấn âm 1 (TAble, RIver, PENcil).',
      'Ngoại lệ: Listen (v) nhấn âm 1, Answer (v) nhấn âm 1.'
    ],
    examples: [
      { en: 'Decide (v) /dɪˈsaɪd/', vi: 'Quyết định (nhấn âm 2)' },
      { en: 'Hour (n) /ˈaʊə(r)/', vi: 'Giờ (âm h câm)' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'vs-family',
    title: 'Từ vựng: Gia đình (Family)',
    category: 'Vocabulary',
    content: 'Các từ vựng về các thành viên trong gia đình và mối quan hệ.',
    details: [
      'Parents: Bố mẹ',
      'Siblings: Anh chị em ruột',
      'Relative: Họ hàng',
      'Grandparents: Ông bà',
      'Cousin: Anh chị em họ',
      'Nephew/Niece: Cháu trai/Cháu gái (con của anh chị em)',
      'Spouse: Vợ hoặc chồng'
    ],
    examples: [
      { en: 'I have two siblings.', vi: 'Tôi có hai anh chị em ruột.' },
      { en: 'My parents are very supportive.', vi: 'Bố mẹ tôi rất hay ủng hộ tôi.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'vs-routine',
    title: 'Từ vựng: Thói quen hàng ngày (Daily Routine)',
    category: 'Vocabulary',
    content: 'Các cụm từ diễn tả các hoạt động thường nhật.',
    details: [
      'Wake up: Thức giấc',
      'Get up: Rời khỏi giường',
      'Brush teeth: Đánh răng',
      'Have breakfast: Ăn sáng',
      'Go to work/school: Đi làm/đi học',
      'Take a shower: Đi tắm',
      'Go to bed: Đi ngủ'
    ],
    examples: [
      { en: 'I wake up at 7 AM every day.', vi: 'Tôi thức dậy lúc 7 giờ sáng mỗi ngày.' },
      { en: 'Don\'t forget to brush your teeth.', vi: 'Đừng quên đánh răng nhé.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'vs-food',
    title: 'Từ vựng: Đồ ăn & Thức uống (Food & Drinks)',
    category: 'Vocabulary',
    content: 'Các từ vựng cơ bản về ẩm thực hàng ngày.',
    details: [
      'Bread: Bánh mì',
      'Rice: Cơm/Gạo',
      'Vegetables: Rau củ',
      'Fruit: Trái cây',
      'Meat: Thịt (Beef, Pork, Chicken)',
      'Seafood: Hải sản',
      'Beverage: Đồ uống (Water, Juice, Coffee, Tea)'
    ],
    examples: [
      { en: 'I like eating fresh vegetables.', vi: 'Tôi thích ăn rau củ tươi.' },
      { en: 'Would you like some coffee?', vi: 'Bạn có muốn uống chút cà phê không?' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'vs-hobbies',
    title: 'Từ vựng: Sở thích & Giải trí (Hobbies)',
    category: 'Vocabulary',
    content: 'Các từ vựng về hoạt động giải trí và sở thích cá nhân.',
    details: [
      'Listening to music: Nghe nhạc',
      'Reading books: Đọc sách',
      'Playing sports: Chơi thể thao',
      'Traveling: Đi du lịch',
      'Cooking: Nấu ăn',
      'Photography: Nhiếp ảnh',
      'Gardening: Làm vườn'
    ],
    examples: [
      { en: 'My hobby is listening to music.', vi: 'Sở thích của tôi là nghe nhạc.' },
      { en: 'He loves playing sports after school.', vi: 'Anh ấy thích chơi thể thao sau giờ học.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },
  {
    id: 'vs-jobs',
    title: 'Từ vựng: Nghề nghiệp (Jobs)',
    category: 'Vocabulary',
    content: 'Các từ vựng về các công việc phổ biến trong xã hội.',
    details: [
      'Teacher: Giáo viên',
      'Doctor: Bác sĩ',
      'Engineer: Kỹ sư',
      'Artist: Nghệ sĩ',
      'Chef: Đầu bếp',
      'Farmer: Nông dân',
      'Pilot: Phi công'
    ],
    examples: [
      { en: 'My father is an engineer.', vi: 'Bố tôi là một kỹ sư.' },
      { en: 'She wants to be a doctor in the future.', vi: 'Cô ấy muốn trở thành bác sĩ trong tương lai.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
  },

  // --- THÀNH THẠO (Vận dụng) ---
  {
    id: 'gm-reported',
    title: 'Câu tường thuật (Reported Speech)',
    category: 'Grammar',
    content: 'Kể lại lời nói của người khác một cách gián tiếp.',
    details: [
      'Lùi thì: Hiện tại đơn -> Quá khứ đơn; Hiện tại hoàn thành -> Quá khứ hoàn thành; Will -> Would.',
      'Đổi trạng từ thời gian: now -> then; tomorrow -> the next day; yesterday -> the day before.',
      'Đổi trạng từ nơi chốn: here -> there; this -> that; these -> those.',
      'Câu hỏi Yes/No: Dùng "if" hoặc "whether".',
      'Câu hỏi Wh-: Giữ nguyên từ để hỏi, đưa về dạng khẳng định (S + V).'
    ],
    examples: [
      { en: '"I am tired", he said.', vi: '-> He said he was tired.' },
      { en: '"Where do you live?", she asked.', vi: '-> She asked where I lived.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'gm-comparison',
    title: 'Cấu trúc so sánh (Comparisons)',
    category: 'Grammar',
    content: 'So sánh giữa hai hoặc nhiều đối tượng.',
    details: [
      'So sánh bằng: as + adj/adv + as.',
      'So sánh hơn (ngắn): adj-er + than (ví dụ: taller than).',
      'So sánh hơn (dài): more + adj + than (ví dụ: more beautiful than).',
      'So sánh nhất (ngắn): the + adj-est (ví dụ: the tallest).',
      'So sánh nhất (dài): the most + adj (ví dụ: the most beautiful).',
      'Bất quy tắc: good -> better -> best; bad -> worse -> worst; far -> farther/further.'
    ],
    examples: [
      { en: 'She is taller than me.', vi: 'Cô ấy cao hơn tôi.' },
      { en: 'This is the most expensive car.', vi: 'Đây là chiếc xe đắt nhất.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'vm-environment',
    title: 'Từ vựng: Môi trường (Environment)',
    category: 'Vocabulary',
    content: 'Các từ vựng về ô nhiễm và bảo vệ môi trường.',
    details: [
      'Pollution: Sự ô nhiễm (Air, Water, Noise, Soil...)',
      'Deforestation: Sự phá rừng (gây mất cân bằng sinh thái).',
      'Recycle: Tái chế (giấy, nhựa, thủy tinh).',
      'Global warming: Sự nóng lên toàn cầu (do hiệu ứng nhà kính).',
      'Environmentally friendly: Thân thiện với môi trường.',
      'Endangered species: Các loài có nguy cơ tuyệt chủng.',
      'Conservation: Sự bảo tồn.'
    ],
    examples: [
      { en: 'We should recycle plastic bottles.', vi: 'Chúng ta nên tái chế chai nhựa.' },
      { en: 'Global warming is a serious problem.', vi: 'Nóng lên toàn cầu là một vấn đề nghiêm trọng.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'gm-passive',
    title: 'Câu bị động (Passive Voice)',
    category: 'Grammar',
    content: 'Dùng khi muốn nhấn mạnh vào hành động hoặc đối tượng chịu tác động.',
    details: [
      'Cấu trúc chung: S + be + V3/ed (+ by O).',
      'Hiện tại đơn: am/is/are + V3/ed.',
      'Quá khứ đơn: was/were + V3/ed.',
      'Hiện tại hoàn thành: have/has + been + V3/ed.',
      'Tương lai đơn: will + be + V3/ed.',
      'Lưu ý: Nội động từ (ví dụ: sleep, go, arrive) không dùng ở thể bị động.'
    ],
    examples: [
      { en: 'The cake was eaten by the cat.', vi: 'Chiếc bánh đã bị con mèo ăn mất.' },
      { en: 'English is spoken all over the world.', vi: 'Tiếng Anh được nói trên toàn thế giới.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'vm-tech',
    title: 'Từ vựng: Công nghệ (Technology)',
    category: 'Vocabulary',
    content: 'Các thuật ngữ về thế giới kỹ thuật số và thiết bị hiện đại.',
    details: [
      'Artificial Intelligence (AI): Trí tuệ nhân tạo.',
      'Software/Hardware: Phần mềm/Phần cứng.',
      'Cybersecurity: An ninh mạng.',
      'Cloud computing: Điện toán đám mây.',
      'Social media: Mạng xã hội.',
      'Gadget: Thiết bị điện tử nhỏ.',
      'Wireless: Không dây.'
    ],
    examples: [
      { en: 'AI is changing the way we work.', vi: 'AI đang thay đổi cách chúng ta làm việc.' },
      { en: 'Always update your software for security.', vi: 'Luôn cập nhật phần mềm để đảm bảo an ninh.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'vm-health',
    title: 'Từ vựng: Sức khỏe (Health & Fitness)',
    category: 'Vocabulary',
    content: 'Các từ vựng về lối sống lành mạnh và y tế.',
    details: [
      'Balanced diet: Chế độ ăn uống cân bằng.',
      'Immune system: Hệ miễn dịch.',
      'Physical exercise: Tập thể dục thể chất.',
      'Mental health: Sức khỏe tâm thần.',
      'Nutrients: Chất dinh dưỡng.',
      'Infection: Sự lây nhiễm.',
      'Prescription: Đơn thuốc.'
    ],
    examples: [
      { en: 'A balanced diet is essential for health.', vi: 'Chế độ ăn cân bằng là thiết yếu cho sức khỏe.' },
      { en: 'Regular exercise boosts your immune system.', vi: 'Tập thể dục thường xuyên giúp tăng cường hệ miễn dịch.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'vm-travel',
    title: 'Từ vựng: Du lịch (Travel & Tourism)',
    category: 'Vocabulary',
    content: 'Các từ vựng về khám phá và trải nghiệm du lịch.',
    details: [
      'Destination: Điểm đến.',
      'Itinerary: Lịch trình chuyến đi.',
      'Sightseeing: Tham quan phong cảnh.',
      'Accommodation: Chỗ ở (Hotel, Hostel, Resort).',
      'Souvenir: Quà lưu niệm.',
      'Baggage allowance: Hạn mức hành lý.',
      'Travel insurance: Bảo hiểm du lịch.'
    ],
    examples: [
      { en: 'What is your next travel destination?', vi: 'Điểm đến du lịch tiếp theo của bạn là đâu?' },
      { en: 'We went sightseeing in Paris.', vi: 'Chúng tôi đã đi tham quan ở Paris.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'vm-work',
    title: 'Từ vựng: Công việc & Sự nghiệp (Career)',
    category: 'Vocabulary',
    content: 'Các từ vựng về môi trường làm việc và phát triển sự nghiệp.',
    details: [
      'Promotion: Sự thăng tiến',
      'Salary: Lương bổng',
      'Deadline: Hạn chót',
      'Colleague: Đồng nghiệp',
      'Interview: Phỏng vấn',
      'Resignation: Sự thôi việc',
      'Entrepreneur: Nhà khởi nghiệp'
    ],
    examples: [
      { en: 'He got a promotion after a year of hard work.', vi: 'Anh ấy đã được thăng chức sau một năm làm việc chăm chỉ.' },
      { en: 'Meeting deadlines is crucial in this job.', vi: 'Hoàn thành đúng hạn là điều tối quan trọng trong công việc này.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },
  {
    id: 'vm-media',
    title: 'Từ vựng: Truyền thông & Giải trí (Media)',
    category: 'Vocabulary',
    content: 'Các từ vựng về báo chí, truyền hình và mạng xã hội.',
    details: [
      'Broadcasting: Phát sóng',
      'Journalism: Báo chí',
      'Advertisement: Quảng cáo',
      'Viral: Lan truyền nhanh',
      'Subscriber: Người đăng ký',
      'Entertainment: Giải trí',
      'Documentary: Phim tài liệu'
    ],
    examples: [
      { en: 'The video went viral on social media.', vi: 'Video đó đã lan truyền nhanh chóng trên mạng xã hội.' },
      { en: 'I enjoy watching documentaries about nature.', vi: 'Tôi thích xem phim tài liệu về thiên nhiên.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
  },

  // --- TIẾN SĨ (Nâng cao) ---
  {
    id: 'gh-inversion',
    title: 'Đảo ngữ (Inversion)',
    category: 'Grammar',
    content: 'Đưa trợ động từ lên trước chủ ngữ để nhấn mạnh ý nghĩa của câu.',
    details: [
      'Với Never/Hardly/Seldom: Never + trợ động từ + S + V. (Ví dụ: Never have I seen...)',
      'Với Only when: Only when + clause, trợ động từ + S + V. (Ví dụ: Only when I saw him did I believe...)',
      'Với Not only... but also: Not only + trợ động từ + S + V, but S also...',
      'Với No sooner... than: No sooner + had + S + V3 + than + S + V2.',
      'Đảo ngữ câu điều kiện: Loại 1 (Should S + V), Loại 2 (Were S + to V), Loại 3 (Had S + V3).'
    ],
    examples: [
      { en: 'Never have I seen such a beautiful girl.', vi: 'Chưa bao giờ tôi thấy một cô gái đẹp như vậy.' },
      { en: 'Had I known the truth, I wouldn\'t have come.', vi: 'Nếu tôi biết sự thật, tôi đã không đến (Đảo ngữ loại 3).' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  },
  {
    id: 'gh-wish',
    title: 'Câu ước (Wish Clauses)',
    category: 'Grammar',
    content: 'Diễn tả mong muốn về một điều gì đó không có thật.',
    details: [
      'Ước ở tương lai: S + wish + S + would/could + V-inf.',
      'Ước ở hiện tại (loại 2): S + wish + S + V2/ed (be dùng "were" cho mọi ngôi).',
      'Ước ở quá khứ (loại 3): S + wish + S + had + V3/ed.',
      'Cấu trúc tương đương: If only (Giá mà).'
    ],
    examples: [
      { en: 'I wish I were a billionaire.', vi: 'Tôi ước mình là một tỷ phú (Hiện tại không phải).' },
      { en: 'I wish I had studied harder last year.', vi: 'Tôi ước năm ngoái mình đã học chăm hơn (Quá khứ không chăm).' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  },
  {
    id: 'vh-social',
    title: 'Từ vựng: Vấn đề xã hội (Social Issues)',
    category: 'Vocabulary',
    content: 'Các từ vựng về các vấn đề nóng trong xã hội hiện đại.',
    details: [
      'Cyberbullying: Bắt nạt qua mạng (thông qua mạng xã hội).',
      'Overpopulation: Bùng nổ dân số (gây áp lực lên tài nguyên).',
      'Poverty: Sự nghèo đói (thiếu thốn điều kiện sống cơ bản).',
      'Unemployment: Sự thất nghiệp (không có việc làm).',
      'Domestic violence: Bạo lực gia đình.',
      'Digital divide: Khoảng cách kỹ thuật số (giữa người có và không có công nghệ).',
      'Social inequality: Bất bình đẳng xã hội.'
    ],
    examples: [
      { en: 'Cyberbullying can cause serious mental health issues.', vi: 'Bắt nạt qua mạng có thể gây ra các vấn đề sức khỏe tâm thần nghiêm trọng.' },
      { en: 'The government is trying to reduce unemployment.', vi: 'Chính phủ đang cố gắng giảm tỉ lệ thất nghiệp.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  },
  {
    id: 'gh-unless',
    title: 'Câu điều kiện với Unless',
    category: 'Grammar',
    content: 'Unless có nghĩa là "If... not" (Trừ khi).',
    details: [
      'Unless + S + V (khẳng định), S + will/would + V.',
      'Cách chuyển: If S + don\'t/doesn\'t + V -> Unless S + V (chia động từ).',
      'Lưu ý: Không dùng "not" trong mệnh đề chứa Unless.',
      'Ví dụ: If it doesn\'t rain, we will go. -> Unless it rains, we will go.'
    ],
    examples: [
      { en: 'Unless it rains, we will go out.', vi: 'Nếu trời không mưa, chúng tôi sẽ đi chơi.' },
      { en: 'You will fail unless you study harder.', vi: 'Bạn sẽ trượt trừ khi bạn học chăm hơn.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  },
  {
    id: 'vh-psychology',
    title: 'Từ vựng: Tâm lý học (Psychology)',
    category: 'Vocabulary',
    content: 'Các thuật ngữ chuyên sâu về tâm trí và hành vi con người.',
    details: [
      'Cognitive dissonance: Sự mâu thuẫn nhận thức.',
      'Subconscious: Tiềm thức.',
      'Empathy vs. Sympathy: Thấu cảm vs. Đồng cảm.',
      'Behavioral patterns: Các kiểu mẫu hành vi.',
      'Intrinsic motivation: Động lực nội tại.',
      'Psychological trauma: Chấn thương tâm lý.',
      'Self-actualization: Hiện thực hóa bản thân.'
    ],
    examples: [
      { en: 'Intrinsic motivation leads to better results.', vi: 'Động lực nội tại dẫn đến kết quả tốt hơn.' },
      { en: 'He is studying behavioral patterns in children.', vi: 'Anh ấy đang nghiên cứu các kiểu mẫu hành vi ở trẻ em.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  },
  {
    id: 'vh-philosophy',
    title: 'Từ vựng: Triết học & Đạo đức (Philosophy)',
    category: 'Vocabulary',
    content: 'Các khái niệm trừu tượng về tư duy và đạo đức.',
    details: [
      'Existentialism: Thuyết hiện sinh.',
      'Utilitarianism: Thuyết vị lợi.',
      'Moral dilemma: Tiến thoái lưỡng nan về đạo đức.',
      'Epistemology: Nhận thức luận.',
      'Virtue ethics: Đạo đức học đức hạnh.',
      'Paradigm shift: Sự thay đổi hệ tư tưởng.',
      'Altruism: Lòng vị tha.'
    ],
    examples: [
      { en: 'The team faced a difficult moral dilemma.', vi: 'Nhóm đã đối mặt với một tình huống đạo đức khó khăn.' },
      { en: 'Altruism is a key component of social harmony.', vi: 'Lòng vị tha là thành phần then chốt của sự hòa hợp xã hội.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  },
  {
    id: 'vh-economy',
    title: 'Từ vựng: Kinh tế toàn cầu (Global Economy)',
    category: 'Vocabulary',
    content: 'Các thuật ngữ kinh tế vĩ mô và tài chính quốc tế.',
    details: [
      'Inflation/Deflation: Lạm phát/Giảm phát.',
      'Recession: Sự suy thoái kinh tế.',
      'Globalization: Sự toàn cầu hóa.',
      'Gross Domestic Product (GDP): Tổng sản phẩm quốc nội.',
      'Fiscal policy: Chính sách tài khóa.',
      'Supply chain disruption: Sự đứt gãy chuỗi cung ứng.',
      'Emerging markets: Các thị trường mới nổi.'
    ],
    examples: [
      { en: 'Globalization has connected world economies.', vi: 'Toàn cầu hóa đã kết nối các nền kinh tế thế giới.' },
      { en: 'The country is recovering from a deep recession.', vi: 'Đất nước đang phục hồi sau một cuộc suy thoái sâu.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  },
  {
    id: 'vh-space',
    title: 'Từ vựng: Khám phá vũ trụ (Space Exploration)',
    category: 'Vocabulary',
    content: 'Các thuật ngữ về thiên văn học và thám hiểm không gian.',
    details: [
      'Astronomy: Thiên văn học',
      'Galaxy: Thiên hà',
      'Black hole: Hố đen',
      'Astronaut: Phi hành gia',
      'Satellite: Vệ tinh',
      'Extraterrestrial: Ngoài trái đất',
      'Cosmos: Vũ trụ'
    ],
    examples: [
      { en: 'The Hubble Space Telescope has captured amazing images of the cosmos.', vi: 'Kính viễn vọng không gian Hubble đã chụp được những hình ảnh tuyệt vời về vũ trụ.' },
      { en: 'Scientists are searching for extraterrestrial life.', vi: 'Các nhà khoa học đang tìm kiếm sự sống ngoài trái đất.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
  }
];
