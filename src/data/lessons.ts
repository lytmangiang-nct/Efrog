export type Level = 'Tập sự' | 'Thành thạo' | 'Tiến sĩ';

export interface Lesson {
  id: string;
  title: string;
  category: 'Grammar' | 'Vocabulary' | 'Skills';
  content: string;
  details: string[]; // Detailed points
  examples: { en: string; vi: string }[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  level: Level;
  grade?: 10 | 11 | 12;
}

export const lessons: Lesson[] = [
  // --- CÁC THÌ CƠ BẢN (Basic Tenses) ---
  {
    id: 'tense-present-simple',
    title: 'Thì Hiện tại đơn (Present Simple)',
    category: 'Grammar',
    content: 'Diễn tả thói quen, sự thật hiển nhiên hoặc lịch trình cố định.',
    details: [
      '1. Khẳng định: S + V(s/es). (I play, He plays)',
      '2. Phủ định: S + do/does + not + V-inf. (I don\'t play, He doesn\'t play)',
      '3. Nghi vấn: Do/Does + S + V-inf? (Do you play?)',
      '4. Dấu hiệu: always, usually, often, sometimes, every day...',
      '5. Cách dùng: Thói quen, chân lý, lịch trình (tàu, xe, máy bay).'
    ],
    examples: [
      { en: 'The sun rises in the East.', vi: 'Mặt trời mọc ở hướng Đông.' },
      { en: 'I usually go to school by bus.', vi: 'Tôi thường đi học bằng xe buýt.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'tense-present-continuous',
    title: 'Thì Hiện tại tiếp diễn (Present Continuous)',
    category: 'Grammar',
    content: 'Diễn tả hành động đang xảy ra tại thời điểm nói hoặc kế hoạch tương lai.',
    details: [
      '1. Khẳng định: S + am/is/are + V-ing.',
      '2. Phủ định: S + am/is/are + not + V-ing.',
      '3. Nghi vấn: Am/Is/Are + S + V-ing?',
      '4. Dấu hiệu: now, at the moment, Look!, Listen!...',
      '5. Cách dùng: Đang xảy ra, hành động tạm thời, kế hoạch chắc chắn.'
    ],
    examples: [
      { en: 'She is watching TV right now.', vi: 'Cô ấy đang xem TV ngay lúc này.' },
      { en: 'We are meeting our friends tonight.', vi: 'Chúng tôi sẽ gặp bạn bè tối nay (kế hoạch).' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'tense-past-simple',
    title: 'Thì Quá khứ đơn (Past Simple)',
    category: 'Grammar',
    content: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ.',
    details: [
      '1. Khẳng định: S + V2/ed.',
      '2. Phủ định: S + did + not + V-inf.',
      '3. Nghi vấn: Did + S + V-inf?',
      '4. Dấu hiệu: yesterday, ago, last week, in 1990...',
      '5. Cách dùng: Hành động đã chấm dứt, chuỗi hành động trong quá khứ.'
    ],
    examples: [
      { en: 'I visited my grandparents yesterday.', vi: 'Tôi đã đi thăm ông bà ngày hôm qua.' },
      { en: 'They bought a new car two days ago.', vi: 'Họ đã mua một chiếc xe mới cách đây hai ngày.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'tense-future-simple',
    title: 'Thì Tương lai đơn (Future Simple)',
    category: 'Grammar',
    content: 'Diễn tả quyết định tức thì, dự đoán không căn cứ hoặc lời hứa.',
    details: [
      '1. Khẳng định: S + will + V-inf.',
      '2. Phủ định: S + will + not (won\'t) + V-inf.',
      '3. Nghi vấn: Will + S + V-inf?',
      '4. Dấu hiệu: tomorrow, next week, in the future, think, believe...',
      '5. Cách dùng: Quyết định lúc nói, dự đoán, lời hứa, lời mời.'
    ],
    examples: [
      { en: 'I will help you with your homework.', vi: 'Tôi sẽ giúp bạn làm bài tập về nhà.' },
      { en: 'It will rain tomorrow, I think.', vi: 'Tôi nghĩ ngày mai trời sẽ mưa.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'tense-present-perfect',
    title: 'Thì Hiện tại hoàn thành (Present Perfect)',
    category: 'Grammar',
    content: 'Diễn tả hành động xảy ra trong quá khứ nhưng còn liên quan đến hiện tại.',
    details: [
      '1. Khẳng định: S + have/has + V3/ed.',
      '2. Phủ định: S + have/has + not + V3/ed.',
      '3. Nghi vấn: Have/Has + S + V3/ed?',
      '4. Dấu hiệu: since, for, already, yet, ever, never, just...',
      '5. Cách dùng: Kinh nghiệm, hành động vừa mới xảy ra, kéo dài đến hiện tại.'
    ],
    examples: [
      { en: 'I have lived here for ten years.', vi: 'Tôi đã sống ở đây được mười năm rồi.' },
      { en: 'Have you ever been to Paris?', vi: 'Bạn đã bao giờ đến Paris chưa?' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 10,
  },
  {
    id: 'tense-past-continuous',
    title: 'Thì Quá khứ tiếp diễn (Past Continuous)',
    category: 'Grammar',
    content: 'Diễn tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ.',
    details: [
      '1. Khẳng định: S + was/were + V-ing.',
      '2. Phủ định: S + was/were + not + V-ing.',
      '3. Nghi vấn: Was/Were + S + V-ing?',
      '4. Dấu hiệu: at 7 PM yesterday, at this time last week, when/while...',
      '5. Cách dùng: Đang xảy ra tại thời điểm quá khứ, hành động bị cắt ngang.'
    ],
    examples: [
      { en: 'I was doing my homework at 8 PM last night.', vi: 'Tôi đang làm bài tập lúc 8 giờ tối qua.' },
      { en: 'While I was cooking, the phone rang.', vi: 'Trong khi tôi đang nấu ăn thì điện thoại reo.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 10,
  },
  {
    id: 'tense-past-perfect',
    title: 'Thì Quá khứ hoàn thành (Past Perfect)',
    category: 'Grammar',
    content: 'Diễn tả hành động xảy ra và kết thúc trước một hành động khác trong quá khứ.',
    details: [
      '1. Khẳng định: S + had + V3/ed.',
      '2. Phủ định: S + had + not + V3/ed.',
      '3. Nghi vấn: Had + S + V3/ed?',
      '4. Dấu hiệu: before, after, by the time, when...',
      '5. Cách dùng: Hành động xảy ra trước (Past Perfect), hành động sau (Past Simple).'
    ],
    examples: [
      { en: 'She had finished her work before she went out.', vi: 'Cô ấy đã hoàn thành công việc trước khi đi chơi.' },
      { en: 'By the time I arrived, the train had left.', vi: 'Vào lúc tôi đến nơi, đoàn tàu đã rời đi rồi.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 11,
  },
  {
    id: 'tense-be-going-to',
    title: 'Tương lai gần (Be going to)',
    category: 'Grammar',
    content: 'Diễn tả dự định có sẵn hoặc dự đoán dựa trên căn cứ hiện tại.',
    details: [
      '1. Khẳng định: S + am/is/are + going to + V-inf.',
      '2. Phủ định: S + am/is/are + not + going to + V-inf.',
      '3. Nghi vấn: Am/Is/Are + S + going to + V-inf?',
      '4. Dấu hiệu: tonight, next week, evidence (căn cứ hiện tại)...',
      '5. Cách dùng: Dự định đã lên kế hoạch, dự đoán có bằng chứng.'
    ],
    examples: [
      { en: 'I am going to visit my aunt this weekend.', vi: 'Tôi định đi thăm dì vào cuối tuần này.' },
      { en: 'Look at those black clouds! It is going to rain.', vi: 'Nhìn những đám mây đen kia kìa! Trời sắp mưa rồi.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },

  // --- LỚP 10 (Global Success) ---
  {
    id: 'g10-u1',
    title: 'Unit 1: Đời sống gia đình (Family Life)',
    category: 'Vocabulary',
    content: 'Từ vựng về cuộc sống gia đình, công việc nhà và trách nhiệm.',
    details: [
      '1. Household chores: Công việc nhà',
      '2. Homemaker: Người nội trợ',
      '3. Breadwinner: Trụ cột gia đình',
      '4. Heavy lifting: Việc nặng nhọc',
      '5. Laundry: Việc giặt giũ',
      '6. Groceries: Thực phẩm, tạp hóa',
      '7. Bonds: Sự gắn kết'
    ],
    examples: [
      { en: 'My father is the breadwinner of the family.', vi: 'Bố tôi là trụ cột của gia đình.' },
      { en: 'We share the household chores equally.', vi: 'Chúng tôi chia sẻ công việc nhà một cách công bằng.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u1-grammar',
    title: 'Thì Hiện tại đơn và Hiện tại tiếp diễn (Present Simple vs. Present Continuous)',
    category: 'Grammar',
    content: 'Phân biệt cách dùng giữa thói quen lặp lại và hành động đang diễn ra.',
    details: [
      '1. Hiện tại đơn: Thói quen, sự thật hiển nhiên (always, usually).',
      '2. Hiện tại tiếp diễn: Hành động đang xảy ra (now, at the moment).',
      '3. Động từ trạng thái: love, like, know... không dùng tiếp diễn.',
      '4. Công thức HTĐ: S + V(s/es).',
      '5. Công thức HTTD: S + am/is/are + V-ing.'
    ],
    examples: [
      { en: 'I usually do the laundry on Sundays.', vi: 'Tôi thường giặt đồ vào Chủ nhật.' },
      { en: 'I am doing the laundry now.', vi: 'Bây giờ tôi đang giặt đồ.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u2',
    title: 'Unit 2: Con người và môi trường (Humans and the Environment)',
    category: 'Vocabulary',
    content: 'Từ vựng về môi trường và lối sống xanh.',
    details: [
      '1. Carbon footprint: Dấu chân carbon',
      '2. Eco-friendly: Thân thiện với môi trường',
      '3. Sustainable: Bền vững',
      '4. Renewable energy: Năng lượng tái tạo',
      '5. Pollution: Sự ô nhiễm',
      '6. Protect: Bảo vệ'
    ],
    examples: [
      { en: 'We should use eco-friendly products.', vi: 'Chúng ta nên sử dụng các sản phẩm thân thiện với môi trường.' },
      { en: 'Planting trees helps reduce our carbon footprint.', vi: 'Trồng cây giúp giảm dấu chân carbon của chúng ta.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u2-grammar',
    title: 'Tương lai đơn và Tương lai gần (Will vs. Be going to)',
    category: 'Grammar',
    content: 'Cách dùng Will và Be going to để nói về dự định và dự đoán.',
    details: [
      '1. Will: Quyết định ngay lúc nói, dự đoán không căn cứ.',
      '2. Be going to: Dự định có sẵn, dự đoán có căn cứ hiện tại.',
      '3. Will: Dùng cho lời hứa, lời đề nghị.',
      '4. Be going to: Dùng cho kế hoạch đã lên lịch.',
      '5. Công thức: Will + V vs. Am/Is/Are + going to + V.'
    ],
    examples: [
      { en: 'I think it will rain later.', vi: 'Tôi nghĩ lát nữa trời sẽ mưa.' },
      { en: 'Look at those clouds! It is going to rain.', vi: 'Nhìn những đám mây kia kìa! Trời sắp mưa rồi.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u3',
    title: 'Unit 3: Âm nhạc (Music)',
    category: 'Vocabulary',
    content: 'Từ vựng về âm nhạc và các buổi biểu diễn.',
    details: [
      '1. Audience: Khán giả',
      '2. Performance: Buổi biểu diễn',
      '3. Talented: Tài năng',
      '4. Instrument: Nhạc cụ',
      '5. Composer: Nhà soạn nhạc',
      '6. Release: Phát hành'
    ],
    examples: [
      { en: 'The audience cheered loudly after the performance.', vi: 'Khán giả đã reo hò nồng nhiệt sau buổi biểu diễn.' },
      { en: 'She is a very talented pianist.', vi: 'Cô ấy là một nghệ sĩ piano rất tài năng.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u3-grammar',
    title: 'Câu ghép và Động từ nguyên mẫu có To (Compound Sentences & To-infinitives)',
    category: 'Grammar',
    content: 'Cách nối câu bằng liên từ và cách dùng động từ nguyên mẫu có "to".',
    details: [
      '1. Câu ghép: Dùng and, but, or, so để nối hai mệnh đề độc lập.',
      '2. To-infinitives: Dùng sau một số động từ (want, decide, hope, plan...).',
      '3. To-infinitives: Dùng để chỉ mục đích (I study hard to pass the exam).',
      '4. Cấu trúc câu ghép: S + V, and/but/or/so + S + V.',
      '5. Ví dụ To-inf: S + V + to + V (bare).'
    ],
    examples: [
      { en: 'I like pop music, but my sister likes rock.', vi: 'Tôi thích nhạc pop, nhưng em gái tôi thích nhạc rock.' },
      { en: 'She decided to become a famous singer.', vi: 'Cô ấy đã quyết định trở thành một ca sĩ nổi tiếng.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u4',
    title: 'Unit 4: Vì một cộng đồng tốt đẹp hơn (For a Better Community)',
    category: 'Vocabulary',
    content: 'Từ vựng về hoạt động tình nguyện và cộng đồng.',
    details: [
      '1. Volunteer: Tình nguyện viên',
      '2. Community: Cộng đồng',
      '3. Non-profit: Phi lợi nhuận',
      '4. Donation: Sự quyên góp',
      '5. Remote area: Vùng sâu vùng xa',
      '6. Helpful: Có ích'
    ],
    examples: [
      { en: 'They are looking for volunteers for the local charity.', vi: 'Họ đang tìm kiếm tình nguyện viên cho tổ chức từ thiện địa phương.' },
      { en: 'We donated some money to the non-profit organization.', vi: 'Chúng tôi đã quyên góp một ít tiền cho tổ chức phi lợi nhuận.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u4-grammar',
    title: 'Thì Quá khứ đơn và Quá khứ tiếp diễn (Past Simple vs. Past Continuous)',
    category: 'Grammar',
    content: 'Phân biệt giữa hành động đã kết thúc và hành động đang diễn ra trong quá khứ.',
    details: [
      '1. Quá khứ đơn: Hành động đã chấm dứt (yesterday, last week).',
      '2. Quá khứ tiếp diễn: Hành động đang xảy ra tại thời điểm cụ thể.',
      '3. Kết hợp: Hành động đang xảy ra (QKTD) thì hành động khác xen vào (QKĐ).',
      '4. Công thức QKĐ: S + V2/ed.',
      '5. Công thức QKTD: S + was/were + V-ing.'
    ],
    examples: [
      { en: 'I was watching TV when the phone rang.', vi: 'Tôi đang xem TV thì điện thoại reo.' },
      { en: 'They were playing football at 4 PM yesterday.', vi: 'Họ đang chơi bóng đá vào lúc 4 giờ chiều qua.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u5',
    title: 'Unit 5: Các phát minh (Inventions)',
    category: 'Vocabulary',
    content: 'Từ vựng về các phát minh và công nghệ.',
    details: [
      '1. Invention: Phát minh',
      '2. Portable: Có thể mang theo',
      '3. Versatile: Đa năng',
      '4. Innovative: Sáng tạo',
      '5. Device: Thiết bị',
      '6. Benefit: Lợi ích'
    ],
    examples: [
      { en: 'The smartphone is a versatile device.', vi: 'Điện thoại thông minh là một thiết bị đa năng.' },
      { en: 'This invention has changed our lives.', vi: 'Phát minh này đã thay đổi cuộc sống của chúng ta.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u5-grammar',
    title: 'Thì Hiện tại hoàn thành và Danh động từ (Present Perfect & Gerunds)',
    category: 'Grammar',
    content: 'Cách dùng thì Hiện tại hoàn thành và V-ing sau một số động từ.',
    details: [
      '1. Hiện tại hoàn thành: Hành động bắt đầu trong quá khứ và kéo dài đến hiện tại.',
      '2. Dấu hiệu: since + mốc thời gian, for + khoảng thời gian.',
      '3. Gerunds (V-ing): Dùng sau các động từ như enjoy, like, stop, finish...',
      '4. Công thức HTHT: S + have/has + V3/ed.',
      '5. Công thức Gerund: S + V + V-ing.'
    ],
    examples: [
      { en: 'I have lived here for ten years.', vi: 'Tôi đã sống ở đây được mười năm rồi.' },
      { en: 'They enjoy using modern devices.', vi: 'Họ thích sử dụng các thiết bị hiện đại.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u6',
    title: 'Unit 6: Bình đẳng giới (Gender Equality)',
    category: 'Vocabulary',
    content: 'Từ vựng về bình đẳng giới.',
    details: [
      '1. Discrimination: Sự phân biệt đối xử',
      '2. Eliminate: Loại bỏ',
      '3. Equal: Công bằng, bình đẳng',
      '4. Opportunity: Cơ hội',
      '5. Enrol: Đăng ký học',
      '6. Force: Bắt buộc'
    ],
    examples: [
      { en: 'We must eliminate gender discrimination.', vi: 'Chúng ta phải loại bỏ sự phân biệt đối xử về giới.' },
      { en: 'Men and women should have equal opportunities.', vi: 'Nam và nữ nên có những cơ hội bình đẳng.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u6-grammar',
    title: 'Câu bị động với động từ khuyết thiếu (Passive Voice with Modals)',
    category: 'Grammar',
    content: 'Cách chuyển câu chủ động sang bị động khi có động từ khuyết thiếu.',
    details: [
      '1. Cấu trúc: Modal + be + V3/ed.',
      '2. Ví dụ: can be done, must be finished, should be protected.',
      '3. Chủ ngữ: Tân ngữ của câu chủ động trở thành chủ ngữ câu bị động.',
      '4. By + O: Có thể bỏ qua nếu không quan trọng.',
      '5. Ý nghĩa: Nhấn mạnh vào hành động hoặc đối tượng chịu tác động.'
    ],
    examples: [
      { en: 'Gender discrimination must be eliminated.', vi: 'Sự phân biệt đối xử về giới phải được loại bỏ.' },
      { en: 'This task can be finished by tomorrow.', vi: 'Công việc này có thể được hoàn thành trước ngày mai.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u7',
    title: 'Unit 7: Việt Nam và các tổ chức quốc tế (Viet Nam and International Organisations)',
    category: 'Vocabulary',
    content: 'Từ vựng về Việt Nam và các tổ chức quốc tế.',
    details: [
      '1. Organization: Tổ chức',
      '2. Participate: Tham gia',
      '3. Promote: Thúc đẩy',
      '4. Economic: Thuộc về kinh tế',
      '5. Investment: Sự đầu tư',
      '6. Commitment: Sự cam kết'
    ],
    examples: [
      { en: 'Viet Nam participates in many international organizations.', vi: 'Việt Nam tham gia vào nhiều tổ chức quốc tế.' },
      { en: 'The organization aims to promote economic growth.', vi: 'Tổ chức này nhằm mục đích thúc đẩy tăng trưởng kinh tế.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-u7-grammar',
    title: 'So sánh hơn và so sánh nhất (Comparative and Superlative Adjectives)',
    category: 'Grammar',
    content: 'Cách dùng tính từ để so sánh giữa hai hoặc nhiều đối tượng.',
    details: [
      '1. So sánh hơn: adj-er + than (ngắn) / more + adj + than (dài).',
      '2. So sánh nhất: the + adj-est (ngắn) / the most + adj (dài).',
      '3. Đặc biệt: good -> better -> best, bad -> worse -> worst.',
      '4. Tính từ ngắn: 1 âm tiết hoặc 2 âm tiết kết thúc bằng -y, -er, -ow.',
      '5. Tính từ dài: 2 âm tiết trở lên (trừ các trường hợp đặc biệt).'
    ],
    examples: [
      { en: 'This project is more important than that one.', vi: 'Dự án này quan trọng hơn dự án kia.' },
      { en: 'Viet Nam is one of the fastest growing economies.', vi: 'Việt Nam là một trong những nền kinh tế tăng trưởng nhanh nhất.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  {
    id: 'g10-s1',
    title: 'Kỹ năng Đọc: Tìm thông tin chi tiết (Reading: Scanning for Details)',
    category: 'Skills',
    content: 'Cách đọc lướt để tìm các thông tin cụ thể như con số, tên riêng, ngày tháng.',
    details: [
      '1. Xác định từ khóa (keywords) trong câu hỏi.',
      '2. Di chuyển mắt nhanh qua các dòng văn bản.',
      '3. Dừng lại khi thấy từ khóa hoặc thông tin liên quan.',
      '4. Đọc kỹ câu chứa từ khóa để xác nhận câu trả lời.',
      '5. Không cần đọc hiểu toàn bộ văn bản.'
    ],
    examples: [
      { en: 'Scan the text for the year the organization was founded.', vi: 'Đọc lướt văn bản để tìm năm tổ chức được thành lập.' },
      { en: 'Look for specific names of household chores in the paragraph.', vi: 'Tìm tên cụ thể của các công việc nhà trong đoạn văn.' }
    ],
    difficulty: 'Easy',
    level: 'Tập sự',
    grade: 10,
  },
  // --- LỚP 11 (Global Success) ---
  {
    id: 'g11-u1',
    title: 'Unit 1: Cuộc sống dài và khỏe mạnh (A Long and Healthy Life)',
    category: 'Vocabulary',
    content: 'Từ vựng về sức khỏe, lối sống và tuổi thọ.',
    details: [
      '1. Life expectancy: Tuổi thọ trung bình',
      '2. Immune system: Hệ miễn dịch',
      '3. Nutrients: Chất dinh dưỡng',
      '4. Antibiotics: Thuốc kháng sinh',
      '5. Balanced diet: Chế độ ăn cân bằng',
      '6. Physical exercise: Tập thể dục thể chất'
    ],
    examples: [
      { en: 'A balanced diet can boost your immune system.', vi: 'Chế độ ăn cân bằng có thể tăng cường hệ miễn dịch của bạn.' },
      { en: 'Regular exercise increases life expectancy.', vi: 'Tập thể dục thường xuyên giúp tăng tuổi thọ.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u1-grammar',
    title: 'Thì Quá khứ đơn và Hiện tại hoàn thành (Past Simple vs. Present Perfect)',
    category: 'Grammar',
    content: 'Phân biệt cách dùng giữa hành động đã kết thúc và hành động còn liên quan đến hiện tại.',
    details: [
      '1. Quá khứ đơn: Diễn tả hành động đã chấm dứt hoàn toàn (yesterday, last year).',
      '2. Hiện tại hoàn thành: Diễn tả hành động vừa mới xảy ra hoặc còn tiếp diễn (since, for).',
      '3. Kết quả: Hiện tại hoàn thành nhấn mạnh kết quả hoặc trải nghiệm (already, yet).',
      '4. Thời gian: Quá khứ đơn có mốc thời gian cụ thể, Hiện tại hoàn thành thì không.',
      '5. Công thức: S + V2/ed (QKĐ) vs. S + have/has + V3/ed (HTHT).'
    ],
    examples: [
      { en: 'I saw that movie yesterday.', vi: 'Tôi đã xem bộ phim đó hôm qua.' },
      { en: 'I have seen that movie three times.', vi: 'Tôi đã xem bộ phim đó ba lần rồi.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u2',
    title: 'Unit 2: Khoảng cách thế hệ (The Generation Gap)',
    category: 'Vocabulary',
    content: 'Từ vựng về khoảng cách thế hệ và mâu thuẫn gia đình.',
    details: [
      '1. Conflict: Mâu thuẫn',
      '2. Tradition: Truyền thống',
      '3. Viewpoint: Quan điểm',
      '4. Curfew: Giờ giới nghiêm',
      '5. Conservative: Bảo thủ',
      '6. Open-minded: Cởi mở'
    ],
    examples: [
      { en: 'Generation gap often leads to conflicts between parents and children.', vi: 'Khoảng cách thế hệ thường dẫn đến mâu thuẫn giữa cha mẹ và con cái.' },
      { en: 'My parents are quite conservative about my clothes.', vi: 'Bố mẹ tôi khá bảo thủ về quần áo của tôi.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u2-grammar',
    title: 'Động từ khuyết thiếu (Modal Verbs: Must, Have to, Should)',
    category: 'Grammar',
    content: 'Cách dùng các động từ chỉ sự bắt buộc, lời khuyên và nghĩa vụ.',
    details: [
      '1. Must: Diễn tả sự bắt buộc chủ quan (từ phía người nói).',
      '2. Have to: Diễn tả sự bắt buộc khách quan (do luật lệ, quy định).',
      '3. Should: Dùng để đưa ra lời khuyên hoặc ý kiến.',
      '4. Phủ định: Mustn\'t (cấm đoán) khác với Don\'t have to (không cần thiết).',
      '5. Công thức: Modal Verb + V (nguyên thể).'
    ],
    examples: [
      { en: 'You must finish your homework now.', vi: 'Bạn phải làm xong bài tập ngay bây giờ.' },
      { en: 'I have to wear a uniform at school.', vi: 'Tôi phải mặc đồng phục ở trường.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u3',
    title: 'Unit 3: Thành phố của tương lai (Cities of the Future)',
    category: 'Vocabulary',
    content: 'Từ vựng về thành phố thông minh và bền vững.',
    details: [
      '1. Sustainable: Bền vững',
      '2. Infrastructure: Cơ sở hạ tầng',
      '3. Liveable: Đáng sống',
      '4. Smart city: Thành phố thông minh',
      '5. Sensor: Cảm biến',
      '6. Renewable: Có thể tái tạo'
    ],
    examples: [
      { en: 'The government is investing in smart city infrastructure.', vi: 'Chính phủ đang đầu tư vào cơ sở hạ tầng thành phố thông minh.' },
      { en: 'We need to find more sustainable ways to live.', vi: 'Chúng ta cần tìm ra những cách sống bền vững hơn.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u3-grammar',
    title: 'Động từ nối (Linking Verbs)',
    category: 'Grammar',
    content: 'Các động từ dùng để kết nối chủ ngữ với tính từ chỉ trạng thái.',
    details: [
      '1. Chức năng: Nối chủ ngữ với tính từ (không dùng trạng từ sau nó).',
      '2. Nhóm chỉ giác quan: look, sound, smell, taste, feel.',
      '3. Nhóm chỉ sự thay đổi: become, get, grow, turn.',
      '4. Nhóm chỉ sự giữ nguyên: stay, remain, keep.',
      '5. Nhóm chỉ vẻ ngoài: seem, appear.'
    ],
    examples: [
      { en: 'She looks happy today.', vi: 'Hôm nay cô ấy trông có vẻ hạnh phúc.' },
      { en: 'The soup tastes delicious.', vi: 'Món súp có vị rất ngon.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u4',
    title: 'Unit 4: ASEAN và Việt Nam (ASEAN and Viet Nam)',
    category: 'Vocabulary',
    content: 'Từ vựng về ASEAN và vai trò của Việt Nam.',
    details: [
      '1. Association: Hiệp hội',
      '2. Bloc: Khối (nước)',
      '3. Identity: Bản sắc',
      '4. Charter: Hiến chương',
      '5. Solidarity: Sự đoàn kết',
      '6. Cooperation: Sự hợp tác'
    ],
    examples: [
      { en: 'Viet Nam joined ASEAN in 1995.', vi: 'Việt Nam gia nhập ASEAN vào năm 1995.' },
      { en: 'The ASEAN Charter sets out the rules for the association.', vi: 'Hiến chương ASEAN đề ra các quy tắc cho hiệp hội.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u4-grammar',
    title: 'Gerunds (Danh động từ)',
    category: 'Grammar',
    content: 'Cách dùng V-ing đóng vai trò như một danh từ.',
    details: [
      'Làm chủ ngữ: Swimming is good for health.',
      'Sau giới từ: He is interested in playing chess.',
      'Sau một số động từ: enjoy, mind, suggest, avoid...',
      'Sau cụm từ: look forward to, be used to, can\'t help...'
    ],
    examples: [
      { en: 'I enjoy listening to music in my free time.', vi: 'Tôi thích nghe nhạc vào thời gian rảnh.' },
      { en: 'Walking is a great way to stay fit.', vi: 'Đi bộ là một cách tuyệt vời để giữ dáng.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u5',
    title: 'Unit 5: Sự nóng lên toàn cầu (Global Warming)',
    category: 'Vocabulary',
    content: 'Từ vựng về sự nóng lên toàn cầu.',
    details: [
      '1. Greenhouse effect: Hiệu ứng nhà kính',
      '2. Deforestation: Sự phá rừng',
      '3. Emission: Sự phát thải',
      '4. Absorb: Hấp thụ',
      '5. Catastrophic: Thảm khốc',
      '6. Fossil fuel: Nhiên liệu hóa thạch'
    ],
    examples: [
      { en: 'Global warming is caused by the greenhouse effect.', vi: 'Sự nóng lên toàn cầu được gây ra bởi hiệu ứng nhà kính.' },
      { en: 'We need to reduce carbon dioxide emissions.', vi: 'Chúng ta cần giảm lượng khí thải carbon dioxide.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u5-grammar',
    title: 'Thì Hiện tại hoàn thành và Hiện tại hoàn thành tiếp diễn (Present Perfect vs. Present Perfect Continuous)',
    category: 'Grammar',
    content: 'Phân biệt giữa kết quả của hành động và quá trình kéo dài của hành động.',
    details: [
      '1. HT hoàn thành: Nhấn mạnh kết quả hoặc số lượng (I have read 3 books).',
      '2. HT hoàn thành tiếp diễn: Nhấn mạnh sự liên tục, quá trình (I have been reading for 2 hours).',
      '3. Trạng thái: Động từ chỉ trạng thái (know, believe) không dùng HTHT tiếp diễn.',
      '4. Công thức HTHT: S + have/has + V3/ed.',
      '5. Công thức HTHTTD: S + have/has + been + V-ing.'
    ],
    examples: [
      { en: 'I have read this book.', vi: 'Tôi đã đọc xong cuốn sách này.' },
      { en: 'I have been reading this book for two hours.', vi: 'Tôi đã đang đọc cuốn sách này được hai tiếng rồi.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u6',
    title: 'Unit 6: Bảo tồn di sản (Preserving our Heritage)',
    category: 'Vocabulary',
    content: 'Từ vựng về bảo tồn di sản.',
    details: [
      '1. Heritage: Di sản',
      '2. Preserve: Bảo tồn',
      '3. Restore: Phục hồi',
      '4. Authentic: Đích thực, nguyên bản',
      '5. Landscape: Phong cảnh',
      '6. Monument: Đài tưởng niệm'
    ],
    examples: [
      { en: 'It is important to preserve our cultural heritage.', vi: 'Việc bảo tồn di sản văn hóa của chúng ta là rất quan trọng.' },
      { en: 'The ancient temple was carefully restored.', vi: 'Ngôi đền cổ đã được phục hồi một cách cẩn thận.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u6-grammar',
    title: 'Mệnh đề nguyên mẫu có To (To-infinitive Clauses)',
    category: 'Grammar',
    content: 'Cách dùng cụm động từ có "to" để bổ nghĩa cho danh từ hoặc chỉ mục đích.',
    details: [
      '1. Sau danh từ: Dùng sau the first, the second, the last, the only...',
      '2. Chỉ mục đích: Dùng để giải thích tại sao hành động xảy ra.',
      '3. Rút gọn: Dùng để rút gọn mệnh đề quan hệ mang nghĩa chủ động.',
      '4. Sau tính từ: Dùng sau một số tính từ (happy, easy, difficult...).',
      '5. Công thức: to + V (nguyên thể).'
    ],
    examples: [
      { en: 'He was the first person to arrive.', vi: 'Anh ấy là người đầu tiên đến.' },
      { en: 'I went to the library to study.', vi: 'Tôi đã đến thư viện để học.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u7',
    title: 'Unit 7: Cơ hội giáo dục cho mọi người (Education Opportunities for All)',
    category: 'Vocabulary',
    content: 'Từ vựng về cơ hội giáo dục và học tập suốt đời.',
    details: [
      '1. Higher education: Giáo dục đại học',
      '2. Vocational: Thuộc về nghề nghiệp',
      '3. Qualification: Bằng cấp, chứng chỉ',
      '4. Distance learning: Học từ xa',
      '5. Tuition fee: Học phí',
      '6. Enrolment: Sự đăng ký nhập học'
    ],
    examples: [
      { en: 'Many students apply for higher education after high school.', vi: 'Nhiều học sinh nộp đơn vào đại học sau khi tốt nghiệp cấp 3.' },
      { en: 'Distance learning is becoming more popular.', vi: 'Học từ xa đang ngày càng trở nên phổ biến.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u7-grammar',
    title: 'Danh động từ hoàn thành và Phân từ hoàn thành (Perfect Gerunds and Perfect Participle Clauses)',
    category: 'Grammar',
    content: 'Cách dùng cấu trúc hoàn thành để nhấn mạnh hành động xảy ra trước.',
    details: [
      '1. Perfect Gerund: Dùng làm tân ngữ sau một số động từ (deny, admit, regret...).',
      '2. Perfect Participle: Dùng để rút gọn mệnh đề khi hai hành động có cùng chủ ngữ.',
      '3. Chức năng: Nhấn mạnh một hành động đã hoàn tất trước một hành động khác.',
      '4. Công thức: having + V3/ed.',
      '5. Ví dụ rút gọn: Having finished dinner, she went out.'
    ],
    examples: [
      { en: 'He denied having stolen the money.', vi: 'Anh ta phủ nhận việc đã lấy trộm tiền.' },
      { en: 'Having finished the work, he went home.', vi: 'Sau khi làm xong việc, anh ấy đi về nhà.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u8',
    title: 'Unit 8: Trở nên tự lập (Becoming Independent)',
    category: 'Vocabulary',
    content: 'Từ vựng về sự tự lập và các kỹ năng sống.',
    details: [
      '1. Self-reliant: Tự lực, tự lập',
      '2. Decision-making: Việc đưa ra quyết định',
      '3. Interpersonal: Giữa cá nhân với nhau',
      '4. Time management: Quản lý thời gian',
      '5. Responsible: Có trách nhiệm',
      '6. Confidence: Sự tự tin'
    ],
    examples: [
      { en: 'Living away from home helps students become more self-reliant.', vi: 'Sống xa nhà giúp học sinh trở nên tự lập hơn.' },
      { en: 'Time management is a crucial skill for everyone.', vi: 'Quản lý thời gian là một kỹ năng quan trọng đối với mọi người.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u8-grammar',
    title: 'Cleft Sentences (Câu chẻ)',
    category: 'Grammar',
    content: 'Cấu trúc nhấn mạnh một thành phần trong câu.',
    details: [
      'Cấu trúc: It is/was + [Thành phần nhấn mạnh] + that/who + ...',
      'Nhấn mạnh chủ ngữ: It was my mom who bought this cake.',
      'Nhấn mạnh tân ngữ: It was this book that I read yesterday.',
      'Nhấn mạnh trạng ngữ: It was in this room that we met.'
    ],
    examples: [
      { en: 'It was Lan who won the first prize.', vi: 'Chính là Lan người đã giành giải nhất.' },
      { en: 'It is in the morning that I feel most energetic.', vi: 'Chính là vào buổi sáng lúc tôi cảm thấy tràn đầy năng lượng nhất.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u9',
    title: 'Unit 9: Các vấn đề xã hội (Social Issues)',
    category: 'Vocabulary',
    content: 'Từ vựng về các vấn đề xã hội hiện nay.',
    details: [
      '1. Poverty: Sự nghèo đói',
      '2. Bullying: Sự bắt nạt',
      '3. Peer pressure: Áp lực đồng lứa',
      '4. Campaign: Chiến dịch',
      '5. Awareness: Sự nhận thức',
      '6. Alcoholism: Chứng nghiện rượu'
    ],
    examples: [
      { en: 'The government is launching a campaign to raise awareness about bullying.', vi: 'Chính phủ đang phát động một chiến dịch nhằm nâng cao nhận thức về việc bắt nạt.' },
      { en: 'Many teenagers face peer pressure at school.', vi: 'Nhiều thanh thiếu niên đối mặt với áp lực đồng lứa ở trường.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u9-grammar',
    title: 'Reported Speech (Câu tường thuật)',
    category: 'Grammar',
    content: 'Cách thuật lại lời nói của người khác.',
    details: [
      'Lùi thì: Present Simple -> Past Simple, Will -> Would...',
      'Đổi đại từ: I -> he/she, we -> they...',
      'Đổi trạng từ: now -> then, today -> that day, here -> there.',
      'Câu hỏi: S + asked + (if/whether) + S + V (lùi thì).'
    ],
    examples: [
      { en: 'She said, "I am tired." -> She said she was tired.', vi: 'Cô ấy nói cô ấy mệt.' },
      { en: 'He asked me if I liked English.', vi: 'Anh ấy hỏi tôi liệu tôi có thích tiếng Anh không.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u10',
    title: 'Unit 10: Hệ sinh thái (The Ecosystem)',
    category: 'Vocabulary',
    content: 'Từ vựng về hệ sinh thái và bảo vệ thiên nhiên.',
    details: [
      '1. Biodiversity: Đa dạng sinh học',
      '2. Ecology: Sinh thái học',
      '3. Habitat: Môi trường sống',
      '4. Endangered: Có nguy cơ tuyệt chủng',
      '5. Sustainable: Bền vững',
      '6. Conservation: Sự bảo tồn'
    ],
    examples: [
      { en: 'We must protect the natural habitat of endangered species.', vi: 'Chúng ta phải bảo vệ môi trường sống tự nhiên của các loài có nguy cơ tuyệt chủng.' },
      { en: 'The balance of the ecosystem is very delicate.', vi: 'Sự cân bằng của hệ sinh thái rất mong manh.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-u10-grammar',
    title: 'Mệnh đề quan hệ với giới từ (Relative Clauses with Prepositions)',
    category: 'Grammar',
    content: 'Cách đặt giới từ trong mệnh đề quan hệ để câu văn trang trọng hơn.',
    details: [
      '1. Vị trí: Giới từ có thể đứng trước đại từ quan hệ whom hoặc which.',
      '2. Trang trọng: Preposition + whom/which (không dùng that sau giới từ).',
      '3. Ít trang trọng: Giới từ đứng ở cuối mệnh đề quan hệ.',
      '4. Whom: Dùng cho người sau giới từ.',
      '5. Which: Dùng cho vật sau giới từ.'
    ],
    examples: [
      { en: 'The person to whom you should speak is the manager.', vi: 'Người mà bạn nên nói chuyện cùng là quản lý.' },
      { en: 'This is the topic about which we are concerned.', vi: 'Đây là chủ đề mà chúng tôi đang quan tâm.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  {
    id: 'g11-s1',
    title: 'Kỹ năng Nói: Đưa ra ý kiến (Speaking: Giving Opinions)',
    category: 'Skills',
    content: 'Cách diễn đạt quan điểm cá nhân và đồng ý hoặc phản đối một ý kiến.',
    details: [
      '1. Đưa ra ý kiến: In my opinion, I think that, From my point of view...',
      '2. Đồng ý: I totally agree, That\'s a good point, You\'re right...',
      '3. Phản đối: I disagree, I see your point but, I\'m not sure about that...',
      '4. Giải thích lý do: Because, Since, The reason is...',
      '5. Sử dụng ngôn ngữ cơ thể và ngữ điệu để nhấn mạnh.'
    ],
    examples: [
      { en: 'In my opinion, the generation gap is inevitable.', vi: 'Theo quan điểm của tôi, khoảng cách thế hệ là không thể tránh khỏi.' },
      { en: 'I totally agree with you on this social issue.', vi: 'Tôi hoàn toàn đồng ý với bạn về vấn đề xã hội này.' }
    ],
    difficulty: 'Medium',
    level: 'Thành thạo',
    grade: 11,
  },
  // --- LỚP 12 (Global Success) ---
  {
    id: 'g12-u1',
    title: 'Unit 1: Những câu chuyện cuộc đời (Life Stories)',
    category: 'Vocabulary',
    content: 'Từ vựng về tiểu sử, cuộc đời và những thành tựu.',
    details: [
      '1. Biography: Tiểu sử',
      '2. Achievement: Thành tựu',
      '3. Perseverance: Sự kiên trì',
      '4. Distinguished: Lỗi lạc, xuất sắc',
      '5. Generosity: Sự hào phóng',
      '6. Inspirational: Truyền cảm hứng'
    ],
    examples: [
      { en: 'His life story is truly inspirational.', vi: 'Câu chuyện cuộc đời anh ấy thực sự truyền cảm hứng.' },
      { en: 'She is a distinguished scientist.', vi: 'Cô ấy là một nhà khoa học lỗi lạc.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u1-grammar',
    title: 'Câu ghép và câu phức (Compound Sentences & Complex Sentences)',
    category: 'Grammar',
    content: 'Cách kết hợp các mệnh đề để tạo thành câu văn phong phú.',
    details: [
      '1. Câu ghép: Dùng liên từ FANBOYS (for, and, nor, but, or, yet, so).',
      '2. Câu phức: Dùng liên từ phụ thuộc (because, although, when, if).',
      '3. Mệnh đề độc lập: Có thể đứng một mình như một câu đơn.',
      '4. Mệnh đề phụ thuộc: Phải đi kèm mệnh đề chính để rõ nghĩa.',
      '5. Dấu phẩy: Dùng trước liên từ trong câu ghép.'
    ],
    examples: [
      { en: 'I was tired, but I finished my homework.', vi: 'Tôi mệt, nhưng tôi đã làm xong bài tập.' },
      { en: 'Although I was tired, I finished my homework.', vi: 'Mặc dù tôi mệt, tôi đã làm xong bài tập.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u2',
    title: 'Unit 2: Đô thị hóa (Urbanisation)',
    category: 'Vocabulary',
    content: 'Từ vựng về đô thị hóa và các vấn đề liên quan.',
    details: [
      '1. Migrate: Di cư',
      '2. Industrialisation: Công nghiệp hóa',
      '3. Slum: Khu ổ chuột',
      '4. Overload: Quá tải',
      '5. Infrastructure: Cơ sở hạ tầng',
      '6. Prosperity: Sự thịnh vượng'
    ],
    examples: [
      { en: 'Many people migrate to big cities for better jobs.', vi: 'Nhiều người di cư đến các thành phố lớn để có công việc tốt hơn.' },
      { en: 'Urbanisation can lead to the growth of slums.', vi: 'Đô thị hóa có thể dẫn đến sự gia tăng của các khu ổ chuột.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u2-grammar',
    title: 'Tính từ ghép (Compound Adjectives)',
    category: 'Grammar',
    content: 'Cách hình thành tính từ từ nhiều từ kết hợp lại.',
    details: [
      '1. Noun + Present Participle: record-breaking, mouth-watering.',
      '2. Noun + Past Participle: hand-made, sun-dried.',
      '3. Number + Noun: a five-star hotel, a ten-minute break.',
      '4. Adjective + Noun-ed: old-fashioned, kind-hearted.',
      '5. Dấu gạch ngang: Dùng để nối các thành phần của tính từ ghép.'
    ],
    examples: [
      { en: 'It was a heart-warming story.', vi: 'Đó là một câu chuyện ấm lòng.' },
      { en: 'We stayed in a five-star hotel.', vi: 'Chúng tôi đã ở trong một khách sạn 5 sao.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u3',
    title: 'Unit 3: Phong trào xanh (The Green Movement)',
    category: 'Vocabulary',
    content: 'Từ vựng về phong trào xanh và bảo vệ môi trường.',
    details: [
      '1. Renewable: Có thể tái tạo',
      '2. Sustainability: Sự bền vững',
      '3. Disposal: Sự vứt bỏ, xử lý',
      '4. Hazardous: Nguy hiểm',
      '5. Eco-friendly: Thân thiện với môi trường',
      '6. Conservation: Sự bảo tồn'
    ],
    examples: [
      { en: 'The green movement encourages people to recycle more.', vi: 'Phong trào xanh khuyến khích mọi người tái chế nhiều hơn.' },
      { en: 'Proper disposal of hazardous waste is crucial.', vi: 'Xử lý chất thải nguy hại đúng cách là rất quan trọng.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u3-grammar',
    title: 'Danh động từ làm chủ ngữ và tân ngữ (Gerunds as Subjects and Objects)',
    category: 'Grammar',
    content: 'Cách dùng V-ing ở các vị trí khác nhau trong câu.',
    details: [
      '1. Làm chủ ngữ: Đứng đầu câu để chỉ một hoạt động (Reading is fun).',
      '2. Làm tân ngữ: Đứng sau một số động từ (enjoy, avoid, suggest...).',
      '3. Sau giới từ: Tất cả giới từ đều đi với V-ing.',
      '4. Sau tính từ: Một số cấu trúc (busy doing, worth doing).',
      '5. Phủ định: Thêm "not" trước Gerund (not knowing).'
    ],
    examples: [
      { en: 'Swimming is my favorite sport.', vi: 'Bơi lội là môn thể thao yêu thích của tôi.' },
      { en: 'I suggest going to the park.', vi: 'Tôi đề nghị đi đến công viên.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u4',
    title: 'Unit 4: Truyền thông đại chúng (The Mass Media)',
    category: 'Vocabulary',
    content: 'Từ vựng về truyền thông đại chúng.',
    details: [
      '1. Social media: Mạng xã hội',
      '2. Digital: Kỹ thuật số',
      '3. Broadcast: Phát sóng',
      '4. Access: Truy cập',
      '5. Interact: Tương tác',
      '6. Influence: Ảnh hưởng'
    ],
    examples: [
      { en: 'Social media has a huge influence on young people.', vi: 'Mạng xã hội có ảnh hưởng lớn đến giới trẻ.' },
      { en: 'We can access information easily through the Internet.', vi: 'Chúng ta có thể truy cập thông tin dễ dàng qua Internet.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u4-grammar',
    title: 'Động từ đi kèm giới từ (Verbs with Prepositions)',
    category: 'Grammar',
    content: 'Cách sử dụng các giới từ đi kèm sau động từ cụ thể.',
    details: [
      '1. Depend on: Phụ thuộc vào',
      '2. Believe in: Tin tưởng vào',
      '3. Suffer from: Chịu đựng từ',
      '4. Object to: Phản đối việc gì',
      '5. Recover from: Hồi phục từ',
      '6. Specialize in: Chuyên về'
    ],
    examples: [
      { en: 'The success of the project depends on your hard work.', vi: 'Sự thành công của dự án phụ thuộc vào sự chăm chỉ của bạn.' },
      { en: 'Many people object to the new media regulations.', vi: 'Nhiều người phản đối các quy định mới về truyền thông.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u5',
    title: 'Unit 5: Bản sắc văn hóa (Cultural Identity)',
    category: 'Vocabulary',
    content: 'Từ vựng về bản sắc văn hóa.',
    details: [
      '1. Identity: Bản sắc',
      '2. Assimilate: Đồng hóa',
      '3. Maintain: Duy trì',
      '4. Custom: Phong tục',
      '5. Diversity: Sự đa dạng',
      '6. Uniqueness: Sự độc đáo'
    ],
    examples: [
      { en: 'We should maintain our cultural identity in a globalized world.', vi: 'Chúng ta nên duy trì bản sắc văn hóa của mình trong một thế giới toàn cầu hóa.' },
      { en: 'The festival celebrates the diversity of local customs.', vi: 'Lễ hội tôn vinh sự đa dạng của các phong tục địa phương.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u5-grammar',
    title: 'So sánh lũy tiến (Repeated Comparatives)',
    category: 'Grammar',
    content: 'Cấu trúc diễn tả sự thay đổi ngày càng tăng hoặc giảm.',
    details: [
      '1. Tính từ ngắn: adj-er and adj-er (bigger and bigger).',
      '2. Tính từ dài: more and more + adj (more and more beautiful).',
      '3. Trạng từ: tương tự như tính từ.',
      '4. Ý nghĩa: Nhấn mạnh sự thay đổi liên tục theo thời gian.',
      '5. Ví dụ: It is getting colder and colder.'
    ],
    examples: [
      { en: 'The weather is getting hotter and hotter.', vi: 'Thời tiết đang ngày càng nóng hơn.' },
      { en: 'Life is becoming more and more expensive.', vi: 'Cuộc sống đang ngày càng trở nên đắt đỏ hơn.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u6',
    title: 'Unit 6: Các loài có nguy cơ tuyệt chủng (Endangered Species)',
    category: 'Vocabulary',
    content: 'Từ vựng về các loài động vật có nguy cơ tuyệt chủng.',
    details: [
      '1. Endangered: Có nguy cơ tuyệt chủng',
      '2. Extinction: Sự tuyệt chủng',
      '3. Habitat: Môi trường sống',
      '4. Poaching: Việc săn bắn trộm',
      '5. Biodiversity: Sự đa dạng sinh học',
      '6. Preserve: Bảo tồn'
    ],
    examples: [
      { en: 'Many species are in danger of extinction.', vi: 'Nhiều loài đang có nguy cơ tuyệt chủng.' },
      { en: 'Loss of habitat is the main threat to biodiversity.', vi: 'Mất môi trường sống là mối đe dọa chính đối với đa dạng sinh học.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-u6-grammar',
    title: 'So sánh kép (Double Comparatives)',
    category: 'Grammar',
    content: 'Cấu trúc diễn tả mối quan hệ nguyên nhân - kết quả (càng... càng...).',
    details: [
      '1. Cấu trúc: The + comparative + S + V, the + comparative + S + V.',
      '2. Tính từ ngắn: The older I get, the wiser I become.',
      '3. Tính từ dài: The more expensive it is, the better it is.',
      '4. Danh từ: The more books you read, the more knowledge you have.',
      '5. Ý nghĩa: Hai sự việc thay đổi song song với nhau.'
    ],
    examples: [
      { en: 'The more you study, the more you learn.', vi: 'Bạn càng học nhiều, bạn càng biết nhiều.' },
      { en: 'The harder you work, the better results you get.', vi: 'Bạn càng làm việc chăm chỉ, bạn càng nhận được kết quả tốt.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
  {
    id: 'g12-s1',
    title: 'Kỹ năng Viết: Viết tiểu sử (Writing: Writing a Biography)',
    category: 'Skills',
    content: 'Cách viết về cuộc đời và sự nghiệp của một người nổi tiếng.',
    details: [
      '1. Mở bài: Giới thiệu tên, ngày sinh, nơi sinh và lý do họ nổi tiếng.',
      '2. Thân bài 1: Quá trình học tập và những năm đầu đời.',
      '3. Thân bài 2: Các thành tựu chính và đóng góp quan trọng.',
      '4. Kết bài: Tóm tắt tầm ảnh hưởng và di sản họ để lại.',
      '5. Sử dụng thì Quá khứ đơn cho các sự kiện đã kết thúc.'
    ],
    examples: [
      { en: 'He was born in a small village in 1950.', vi: 'Ông ấy sinh ra ở một ngôi làng nhỏ vào năm 1950.' },
      { en: 'His achievements have inspired many young scientists.', vi: 'Những thành tựu của ông đã truyền cảm hứng cho nhiều nhà khoa học trẻ.' }
    ],
    difficulty: 'Hard',
    level: 'Tiến sĩ',
    grade: 12,
  },
];
